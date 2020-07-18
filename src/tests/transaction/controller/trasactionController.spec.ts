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
});
