import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_FULL_URL,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  ...knexSnakeCaseMappers(),
};
