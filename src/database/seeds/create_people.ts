/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  return knex.raw(`
    INSERT INTO people (name, cpf, "birthDate")
    VALUES('Dock API', '12314322112', '1992-04-12')
  `);
}
