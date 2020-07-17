import * as Knex from 'knex';

import PeopleModel from '../../../app/entities/people/model/peopleModel';
import { InterfacePeopleModel } from '../../../app/entities/people/people.interface';
import connecetion from '../../../database/connection';

jest.mock('../../../database/connection');

type maker = {
  conn: Knex<any, unknown[]>;
  peopleModel: InterfacePeopleModel;
};
const maker = (): maker => {
  const conn = connecetion;
  const peopleModel = PeopleModel;
  return { peopleModel, conn };
};

describe('create', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should return create people', async () => {
    const { conn, peopleModel } = maker();
    const people = {
      name: 'Gabriel Xavier',
      birthDate: '1992-04-12',
      cpf: '123213',
    };

    const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...people }] });

    await peopleModel.create(people);

    expect(raw).toBeCalledTimes(1);
  });
});
