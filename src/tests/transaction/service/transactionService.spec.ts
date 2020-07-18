import TransactionService from '../../../app/entities/transaction/service/transactionService';
import TransactionModel from '../../../app/entities/transaction/model/transactionModel';

import AccountService from '../../../app/entities/account/service/accountService';

import { InterfaceTransactionService } from '../../../app/entities/transaction/transaction.interface';

jest.mock('../../../app/entities/transaction/model/transactionModel');
jest.mock('../../../app/entities/account/service/accountService');

type maker = {
  transactionService: InterfaceTransactionService;
};

const maker = (): maker => {
  const transactionService = TransactionService;
  return { transactionService };
};

describe('transactionServce', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test(' ', () => {
    expect(true).toBe(true);
  });
  describe('deposit', () => {
    test('Should throw error case value is under 0', async () => {
      const { transactionService } = maker();
      const transaction = {
        idAccount: 1,
        value: -20,
      };

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Value most be bigger than 0');
    });

    test('Should throw error case value has more then 2 decimal case', async () => {
      const { transactionService } = maker();
      const transaction = {
        idAccount: 1,
        value: 20.12321,
      };

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Invalid value');
    });

    test('Should throw error case not found idAccount', async () => {
      const { transactionService } = maker();
      jest.spyOn(AccountService, 'getAccount').mockRejectedValue(new Error('Not Found'));

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Not Found');
    });

    test('Should throw error case account is blocked', async () => {
      const { transactionService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: false,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Blocked Account');
    });

    test('Should throw error case not create transaction', async () => {
      const { transactionService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockRejectedValue(Error('Internal Error'));

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Internal Error');
    });

    test('Should throw error case not update account', async () => {
      const { transactionService } = maker();
      const transaction = {
        idTransaction: 1,
        idAccount: 1,
        value: 20,
        createdAt: '1992-04-12',
      };

      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockResolvedValue(transaction);
      jest.spyOn(AccountService, 'updateAccountById').mockRejectedValue(new Error('Internal Error'));

      await expect(transactionService.deposit(transaction)).rejects.toThrow();
      await expect(transactionService.deposit(transaction)).rejects.toThrowError('Internal Error');
    });

    test('Should create deposit transaction', async () => {
      const { transactionService } = maker();
      const transaction = {
        idTransaction: 1,
        idAccount: 1,
        value: 20,
      };

      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockResolvedValue({ ...transaction, createdAt: '1992-04-12' });
      jest.spyOn(AccountService, 'updateAccountById').mockResolvedValue({ ...account, balance: account.balance + transaction.value });

      const createTransaction = await transactionService.deposit(transaction);

      expect(AccountService.getAccount).toBeCalledTimes(1);
      expect(TransactionModel.create).toBeCalledTimes(1);
      expect(AccountService.updateAccountById).toBeCalledTimes(1);

      expect(createTransaction).toMatchObject(transaction);
    });
  });

  describe('withdraw', () => {
    test('Should throw error case value is under 0', async () => {
      const { transactionService } = maker();
      const transaction = {
        idAccount: 1,
        value: -20,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Value most be bigger than 0');
    });

    test('Should throw error case value has more then 2 decimal case', async () => {
      const { transactionService } = maker();
      const transaction = {
        idAccount: 1,
        value: 20.12321,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Invalid value');
    });

    test('Should throw error case not found idAccount', async () => {
      const { transactionService } = maker();
      jest.spyOn(AccountService, 'getAccount').mockRejectedValue(new Error('Not Found'));

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Not Found');
    });

    test('Should throw error case account doesnt have founds', async () => {
      const { transactionService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 19.99,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Insufficient funds');
    });

    test('Should throw error case account is blocked', async () => {
      const { transactionService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: false,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Blocked Account');
    });

    test('Should throw error case not create transaction', async () => {
      const { transactionService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockRejectedValue(Error('Internal Error'));

      const transaction = {
        idAccount: 1,
        value: 20,
      };

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Internal Error');
    });

    test('Should throw error case not update account', async () => {
      const { transactionService } = maker();
      const transaction = {
        idTransaction: 1,
        idAccount: 1,
        value: 20,
        createdAt: '1992-04-12',
      };

      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockResolvedValue(transaction);
      jest.spyOn(AccountService, 'updateAccountById').mockRejectedValue(new Error('Internal Error'));

      await expect(transactionService.withdraw(transaction)).rejects.toThrow();
      await expect(transactionService.withdraw(transaction)).rejects.toThrowError('Internal Error');
    });

    test('Should create withdraw transaction', async () => {
      const { transactionService } = maker();
      const transaction = {
        idTransaction: 1,
        idAccount: 1,
        value: 20,
      };

      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(AccountService, 'getAccount').mockResolvedValue(account);
      jest.spyOn(TransactionModel, 'create').mockResolvedValue({ ...transaction, createdAt: '1992-04-12' });
      jest.spyOn(AccountService, 'updateAccountById').mockResolvedValue({ ...account, balance: account.balance + transaction.value });

      const createTransaction = await transactionService.withdraw(transaction);

      expect(AccountService.getAccount).toBeCalledTimes(1);
      expect(TransactionModel.create).toBeCalledTimes(1);
      expect(AccountService.updateAccountById).toBeCalledTimes(1);

      expect(createTransaction).toMatchObject(transaction);
    });
  });
});
