import type { Knex } from 'knex'

const TABLE_NAME = 'Timesheet'

export async function up(knex: Knex): Promise<void> {
    const tableExists = await knex.schema.hasTable(TABLE_NAME)

    if (!tableExists) {
        console.log(`Creating ${TABLE_NAME} table.`)

        return knex.schema.createTable(TABLE_NAME, (table) => {
            table.date('date').notNullable()
            table.string('employeeId').notNullable()
            table.decimal('hours', 4, 2)
            table.integer('jobGroupId').references('id').inTable('JobGroup').notNullable()
            // timesheetId represents the last timesheet upload that modified this row:
            table.string('timesheetId').references('timesheetId').inTable('TimesheetUpload')

            // date, employeeId, and jobGroup uniquely identify an entry to allow 'hours' amount to be updated/fixed
            // if needed in a later upload.
            table.primary(['date', 'employeeId', 'jobGroupId'])
        })
    }
}

export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable(TABLE_NAME)
