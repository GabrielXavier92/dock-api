import connection from '../../../../database/connection';

import { People, PeopleInput, InterfacePeopleModel } from '../people.interface';

class PeopleModel implements InterfacePeopleModel {
  public async create({ name, birthDate, cpf }: PeopleInput): Promise<People> {
    try {
      const db = await connection.raw(`
        INSERT INTO people (name, cpf, "birthDate")
        VALUES(?, ?, ?)
        RETURNING *;
      `, [`${name}`, `${cpf}`, `${birthDate}`]);
      return db.rows[0] as People;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async findById(id: number): Promise<People> {
    try {
      const db = await connection.raw(`
      SELECT * FROM "people" where "idPeople"=?
    `, [id]);

      return db.rows[0] as People;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }
}

export default new PeopleModel();
