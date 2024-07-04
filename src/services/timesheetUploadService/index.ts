import { parse } from 'csv-parse'
import { Readable } from 'stream'

import { db } from 'db'
import { JobGroupMap } from 'models'
import { parseDate } from 'utils'

export const checkIfTimesheetUploadExists = async (timesheetId: string): Promise<boolean> => {
    const exists = await db('TimesheetUpload').where('timesheetId', timesheetId).first()

    return exists !== undefined
}

export const recordTimesheetUpload = async (timesheetId: string) => {
    try {
        const [record] = await db('TimesheetUpload')
            .insert({
                timesheetId: timesheetId,
                uploadedAt: Date.now(),
            })
            .returning('*') // To enable logging inserted values

        console.log('Successfully added TimesheetUpload record', record)
    } catch (err) {
        console.error('Failed to insert TimesheetUpload record', err)
        throw new Error()
    }
}

export const importTimesheetData = async (timesheetId: string, file: Express.Multer.File, jobGroups: JobGroupMap) => {
    const parser = parse()
    const stream = Readable.from(file.buffer)
    let header = null

    try {
        for await (const csvLine of stream.pipe(parser)) {
            // The first line read will be put into the header var:
            if (!header) {
                header = csvLine
            } else {
                // Header already exists, so we're processing the CSV data now:
                const hoursDecimal = parseFloat(csvLine[1])

                try {
                    const [row] = await db('Timesheet')
                        .insert({
                            date: parseDate(csvLine[0]),
                            hours: isNaN(hoursDecimal) ? 0.0 : hoursDecimal,
                            employeeId: csvLine[2],
                            jobGroupId: jobGroups[csvLine[3]],
                            timesheetId: timesheetId,
                        })
                        // If a row with that date/employeeId/jobGroupId combo already exists, update (merge) the existing
                        // values with the onest from this import:
                        .onConflict(['date', 'employeeId', 'jobGroupId'])
                        .merge()
                        .returning('*')

                    console.log(`Successfully added record ${JSON.stringify(csvLine)}`)
                } catch (error) {
                    console.error(error)
                    throw new Error('Error inserting row into the database.')
                }
            }
        }
    } catch (error) {
        console.error(`Error processing file ${file.originalname}`)
        throw new Error()
    }
}
