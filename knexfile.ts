import { Knex } from 'knex'

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: 'data.sqlite3',
    },
    migrations: {
        directory: 'src/db/migrations',
        extension: 'ts',
    },
    seeds: {
        directory: 'src/db/seeds',
        extension: 'ts',
    },
    useNullAsDefault: true,
}

export default config
