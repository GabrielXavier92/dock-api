import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE "account" (
    "idAccount" SERIAL PRIMARY KEY,
    "idPeople" INT NOT NULL,
    balance NUMERIC NOT NULL,
    "dailyWithdrawalLimit"  NUMERIC NOT NULL,
    active BOOLEAN NOT NULL,
    "accountType" INTEGER NOT NULL,
    "createdAt" NOT NULL DEFAULT CURRENT_DATE,
    
    FOREIGN KEY ("idPeople") REFERENCES people("idPeople")
    );
`);
}

export async function down(): Promise<void> {
}
