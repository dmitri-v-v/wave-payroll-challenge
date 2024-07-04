import { Knex } from 'knex'

const TABLE_NAME = 'JobGroup'

export async function seed(knex: Knex): Promise<void> {
    // Check if the table is empty
    const isEmpty = await knex(TABLE_NAME).first().then(row => !row)

    if (isEmpty) {
        // Inserts seed entries only if the table is empty
        await knex(TABLE_NAME).insert([
            { name: 'A', rate: 20.00 },
            { name: 'B', rate: 30.00 },
        ])
        console.log(`Seeded ${TABLE_NAME} table.`)
    } else {
        console.log(`${TABLE_NAME} table already contains data, skipping seed.`)
    }
};
