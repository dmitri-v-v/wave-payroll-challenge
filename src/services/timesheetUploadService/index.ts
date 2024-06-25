import { db } from 'db'

export const checkIfTimesheetUploadExists = async (timesheetId: number): Promise<boolean> => {
    const exists = await db('TimesheetUpload').where('timesheetId', timesheetId).first()

    return exists !== undefined
}

export const recordTimesheetUpload = async (timesheetId: number) => {
    try {
        const [record] = await db('TimesheetUpload').insert({
            timesheetId: timesheetId,
            uploadedAt: Date.now()
        }).returning("*")

        console.log('Successfully added TimesheetUpload record', record)
    } catch (err) {
        console.error("Failed to insert TimesheetUpload record", err)
        throw new Error('An error occurred while recording the timesheet upload.')
    }
}
