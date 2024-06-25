import { Knex } from "knex";

const TABLE_NAME = 'JobGroup'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(TABLE_NAME).del();

    // Inserts seed entries
    await knex(TABLE_NAME).insert([
        { name: 'A', rate: 20.00 },
        { name: 'B', rate: 30.00 },
    ]);
};
