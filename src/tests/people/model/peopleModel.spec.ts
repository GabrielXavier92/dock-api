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

describe('peopleModel', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('create', () => {
    test('Shoud throw an error case create people failed', async () => {
      const { conn, peopleModel } = maker();
      const people = {
        name: 'Gabriel Xavier',
        birthDate: '1992-04-12',
        cpf: '123213',
      };

      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(peopleModel.create(people)).rejects.toThrow();
      await expect(peopleModel.create(people)).rejects.toThrowError('Internal Error');
    });

    test('Should return created people', async () => {
      const { conn, peopleModel } = maker();
      const people = {
        name: 'Gabriel Xavier',
        birthDate: '1992-04-12',
        cpf: '123213',
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ idPeople: 1, ...people }] });
      const createdPeople = await peopleModel.create(people);
      expect(raw).toBeCalledTimes(1);
      expect(createdPeople).toEqual({ idPeople: 1, ...people });
    });
  });

  describe('findById', () => {
    test('Shoud throw an error case findById people failed', async () => {
      const { conn, peopleModel } = maker();
      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(peopleModel.findById(1)).rejects.toThrow();
      await expect(peopleModel.findById(1)).rejects.toThrowError('Internal Error');
    });

    test('Should return a people', async () => {
      const { conn, peopleModel } = maker();
      const people = {
        idPeople: 1,
        name: 'Gabriel Xavier',
        birthDate: '1992-04-12',
        cpf: '123213',
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...people }] });
      const createdPeople = await peopleModel.findById(1);
      expect(raw).toBeCalledTimes(1);
      expect(createdPeople).toEqual({ ...people });
    });
  });
});
