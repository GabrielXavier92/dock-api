import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

const production = process.env.NODE_ENV;

module.exports = {
  client: 'pg',
  connection: production
    ? {
      host: 'db',
      user: 'postgres',
      password: 'postgres',
      database: 'dock',
    } : process.env.DATABASE_FULL_URL,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  ...knexSnakeCaseMappers(),
};
