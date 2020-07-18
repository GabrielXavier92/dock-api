import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE "transaction" (
    "idTransaction" SERIAL PRIMARY KEY,
    "idAccount" INT NOT NULL,
    value NUMERIC NOT NULL,
    "createdAt" NOT NULL DEFAULT CURRENT_DATE,
    
    FOREIGN KEY ("idAccount") REFERENCES account("idAccount")
    );
`);
}

export async function down(): Promise<void> {
}
