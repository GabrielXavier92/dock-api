import * as Knex from 'knex';
import connecetion from '../../../database/connection';

import TransactionModel from '../../../app/entities/transaction/model/transactionModel';
import { InterfaceTransactionModel } from '../../../app/entities/transaction/transaction.interface';

jest.mock('../../../database/connection');

type maker = {
  conn: Knex<any, unknown[]>;
  transactionModel: InterfaceTransactionModel;
};
const maker = (): maker => {
  const conn = connecetion;
  const transactionModel = TransactionModel;
  return { transactionModel, conn };
};

describe('transactionModel', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('create', () => {
    test('Should throw an error case create transaction failed', async () => {
      const { conn, transactionModel } = maker();
      const transaction = {
        idAccount: 1,
        value: 20,
        createdAt: '2019-02-20T00:00:00.000',
      };

      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');
      await expect(transactionModel.create(transaction)).rejects.toThrow();
      await expect(transactionModel.create(transaction)).rejects.toThrowError('Internal Error');
    });

    test('Should return created transaction', async () => {
      const { conn, transactionModel } = maker();
      const transaction = {
        idAccount: 1,
        value: 20,
        createdAt: '2019-02-20T00:00:00.000',
      };

      const createdTransaction = {
        idTransaction: 1,
        ...transaction,
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValueOnce({ rows: [{ ...createdTransaction }] });
      const create = await transactionModel.create(transaction);
      expect(raw).toBeCalledTimes(1);
      expect(create).toEqual({ ...createdTransaction });
    });
  });

  describe('findByIdAccount', () => {
    test('Should throw an error case findByIdAccount account failed', async () => {
      const { conn, transactionModel } = maker();
      jest.spyOn(conn, 'raw').mockRejectedValue('Internal Error');

      await expect(transactionModel.findByIdAccount(1)).rejects.toThrow();
      await expect(transactionModel.findByIdAccount(1)).rejects.toThrowError('Internal Error');
    });

    test('Should return a transaction case findByIdAccount success', async () => {
      const { conn, transactionModel } = maker();
      const transaction = {
        idTransaction: 1,
        idAccount: 1,
        value: 20,
        createdAt: '2019-02-20T00:00:00.000',
      };

      const raw = jest.spyOn(conn, 'raw').mockResolvedValueOnce({ rows: [{ ...transaction }] });
      const createdPeople = await transactionModel.findByIdAccount(1);
      expect(raw).toBeCalledTimes(1);
      expect(createdPeople).toEqual({ ...transaction });
    });
  });
});
