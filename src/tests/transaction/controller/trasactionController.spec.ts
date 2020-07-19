import { mockRequest, mockResponse } from '../../utils/expressMock';

import TransactionController from '../../../app/entities/transaction/controller/transactionController';

import { InterfaceTransactionController } from '../../../app/entities/transaction/transaction.interface.d';
import TransactionService from '../../../app/entities/transaction/service/transactionService';

jest.mock('../../../app/entities/transaction/service/transactionService');

type maker = {
  transactionController: InterfaceTransactionController;
};

const maker = (): maker => {
  const transactionController = TransactionController;
  return { transactionController };
};

describe('TransactionController', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const req = mockRequest();
  const res = mockResponse();

  describe('deposit', () => {
    test('Should return 400 when idAccount is invalid', () => {
      const { transactionController } = maker();

      req.params = { idAccount: '' };

      transactionController.deposit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when value is invalid', () => {
      const { transactionController } = maker();

      req.body = { value: undefined };

      transactionController.deposit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 if type of variables is incorrect', () => {
      const { transactionController } = maker();

      req.params = { idAccount: '2' };
      req.body = { value: '123' };

      transactionController.deposit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 200 when create account', async () => {
      const { transactionController } = maker();
      const transaction = {
        idAccount: 2,
        value: 20,
      };

      req.body = { ...transaction };
      req.params = { idAccount: '2' };

      const createdTransaction = {
        ...transaction,
        idTransaction: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(TransactionService, 'deposit').mockResolvedValue(createdTransaction);

      await transactionController.deposit(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith(createdTransaction);
    });
  });

  describe('withdraw', () => {
    test('Should return 400 when idAccount is invalid', () => {
      const { transactionController } = maker();

      req.params = { idAccount: '' };

      transactionController.withdraw(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when value is invalid', () => {
      const { transactionController } = maker();

      req.body = { value: undefined };

      transactionController.withdraw(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 if type of variables is incorrect', () => {
      const { transactionController } = maker();

      req.params = { idAccount: '2' };
      req.body = { value: '123' };

      transactionController.withdraw(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 200 when create account', async () => {
      const { transactionController } = maker();
      const transaction = {
        idAccount: 2,
        value: 20,
      };

      req.body = { ...transaction };
      req.params = { idAccount: '2' };

      const createdTransaction = {
        ...transaction,
        idTransaction: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(TransactionService, 'withdraw').mockResolvedValue(createdTransaction);

      await transactionController.withdraw(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith(createdTransaction);
    });
  });

  describe('extract', () => {
    test('Shoud return error case idAccount is not provided', () => {
      const { transactionController } = maker();

      req.query = { start: '', end: '' };
      req.params = { idAccount: '' };

      transactionController.extract(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Shoud return extract', async () => {
      const { transactionController } = maker();

      const extract = [
        {
          idTransaction: 1,
          idAccount: 1,
          value: 20,
          createdAt: '2009-04-09',
        },
        {
          idTransaction: 2,
          idAccount: 1,
          value: 50,
          createdAt: '2009-04-11',
        },
      ];
      req.params = { idAccount: '1' };

      jest.spyOn(TransactionService, 'extract').mockResolvedValue(extract);

      await transactionController.extract(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith(extract);
    });
  });
});
