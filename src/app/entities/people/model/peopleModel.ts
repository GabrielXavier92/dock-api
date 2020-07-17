import connection from '../../../../database/connection';

import { People, PeopleInput, InterfacePeopleModel } from '../people.interface';

class PeopleModel implements InterfacePeopleModel {
  public async create({ name, birthDate, cpf }: PeopleInput): Promise<People> {
    const db = await connection.raw(`
      INSERT INTO people (name, cpf, birthDate)
      VALUES(?, ?, ?)
      RETURNING *;
    `, [`${name}`, `${cpf}`, `${birthDate}`]);
    return db.rows[0] as People;
  }
}

export default new PeopleModel();
