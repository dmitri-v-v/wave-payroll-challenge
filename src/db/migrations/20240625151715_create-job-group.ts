import type { Knex } from 'knex'

const TABLE_NAME = 'JobGroup'

export async function up(knex: Knex): Promise<void> {
    const tableExists = await knex.schema.hasTable(TABLE_NAME);

    if (!tableExists) {
		console.log(`Creating ${TABLE_NAME} table.`)

        return knex.schema.createTable(TABLE_NAME, table => {
            table.increments('id').primary()
            table.string('name').notNullable().unique()
            table.decimal('rate', 19, 4)
        })
    }
}


export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable(TABLE_NAME);
