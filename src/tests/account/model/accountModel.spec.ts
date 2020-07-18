import * as Knex from 'knex';

import AccountModel from '../../../app/entities/account/model/accountModel';

import connecetion from '../../../database/connection';

import { InterfaceAccountModel } from '../../../app/entities/account/account.interface.d';

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
    test('Should throw an error case create account failed', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(accountModel.create(account)).rejects.toThrow();
      await expect(accountModel.create(account)).rejects.toThrowError('Internal Error');
    });

    test('Should return created account', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const createdAccount = {
        idAccount: 1,
        ...account,
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...createdAccount }] });
      const create = await accountModel.create(account);
      expect(raw).toBeCalledTimes(1);
      expect(create).toEqual({ ...createdAccount });
    });
  });

  describe('update', () => {
    test('Should throw an error case update account failed', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(accountModel.updateById(1, account)).rejects.toThrow();
      await expect(accountModel.updateById(1, account)).rejects.toThrowError('Internal Error');
    });

    test('Should return updated account', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const updatedAccount = {
        ...account,
        active: false,
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...updatedAccount }] });
      const update = await accountModel.updateById(1, account);
      expect(raw).toBeCalledTimes(1);
      expect(update).toEqual({ ...updatedAccount });
    });
  });

  describe('findById', () => {
    test('Should throw an error case findById account failed', async () => {
      const { conn, accountModel } = maker();
      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(accountModel.findById(1)).rejects.toThrow();
      await expect(accountModel.findById(1)).rejects.toThrowError('Internal Error');
    });

    test('Should return a people case findById success', async () => {
      const { conn, accountModel } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValue({ rows: [{ ...account }] });
      const createdPeople = await accountModel.findById(1);
      expect(raw).toBeCalledTimes(1);
      expect(createdPeople).toEqual({ ...account });
    });
  });
});
