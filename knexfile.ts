import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_FULL_URL || {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  ...knexSnakeCaseMappers(),
};
