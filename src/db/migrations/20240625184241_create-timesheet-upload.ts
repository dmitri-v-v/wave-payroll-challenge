import type { Knex } from 'knex'

const TABLE_NAME = 'TimesheetUpload'

export async function up(knex: Knex): Promise<void> {
    const tableExists = await knex.schema.hasTable(TABLE_NAME)

    if (!tableExists) {
        console.log(`Creating ${TABLE_NAME} table.`)

        return knex.schema.createTable(TABLE_NAME, (table) => {
            table.string('timesheetId').notNullable().primary()
            table.timestamp('uploadedAt').notNullable().defaultTo(knex.fn.now())
        })
    }
}

export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable(TABLE_NAME)
