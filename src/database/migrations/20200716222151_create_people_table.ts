import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE "people" (
    "idPeople" SERIAL PRIMARY KEY,
    name text NOT NULL,
    cpf text NOT NULL,
    "birthDate" DATE NOT NULL
  );
`);
}

export async function down(): Promise<void> {
}
