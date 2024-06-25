import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/data.sqlite3'
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config;
