import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './data.sqlite3'
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config;
