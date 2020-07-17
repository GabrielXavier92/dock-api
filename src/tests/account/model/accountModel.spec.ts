import * as Knex from 'knex';

import AccountModel from '../../../app/entities/account/model/accountModel';

import connecetion from '../../../database/connection';

import { InterfaceAccountModel } from "../../../app/entities/account/account.interface.d";

jest.mock('../../../database/connection');

type maker = {
  conn: Knex<any, unknown[]>;
  accountModel: InterfaceAccountModel;
};
const maker = (): maker => {
  const conn = connecetion;
  const accountModel = AccountModel;
  return { accountModel, conn };
};

describe('accountModel', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('create', () => {
    test('Should return created account', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
      };

      const createdAccount = {
        idAccount: 1,
        ...account,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...createdAccount }] });
      const createdPeople = await accountModel.create(account);
      expect(raw).toBeCalledTimes(1);
      expect(createdPeople).toEqual({ ...createdAccount });
    });
  });
});
