import AccountService from '../../../app/entities/account/service/accountService';
import AccountModel from '../../../app/entities/account/model/accountModel';

import { InterfaceAccountService } from '../../../app/entities/account/account.interface.d';

jest.mock('../../../app/entities/account/model/accountModel');
type maker = {
  accountService: InterfaceAccountService;
};
const maker = (): maker => {
  const accountService = AccountService;
  return { accountService };
};

describe('accountService', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('createAccount', () => {
    test('Shoud throw error if balance has more than 2 decimal cases', async () => {
      const { accountService } = maker();
      const account = {
        idPeople: 123,
        balance: 50.1209,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
      };

      await expect(accountService.createAccount(account)).rejects.toThrow();
      await expect(accountService.createAccount(account)).rejects.toThrowError('Invalid balance value');
    });

    test('Should create account', async () => {
      const { accountService } = maker();
      const account = {
        idPeople: 123,
        balance: 50.12,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
      };

      const createdAccount = {
        idAccount: 1,
        ...account,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      jest.spyOn(AccountModel, 'create').mockResolvedValue(createdAccount);

      const service = await accountService.createAccount(account);

      expect(AccountModel.create).toBeCalledTimes(1);
      expect(service).toBe(createdAccount);
    });
  });

  describe('blockAccount', () => {
    test('Should throw error case not found idAccount', async () => {
      const { accountService } = maker();
      jest.spyOn(AccountModel, 'findById').mockResolvedValue(undefined);

      await expect(accountService.blockAccount(1)).rejects.toThrow();
      await expect(accountService.blockAccount(1)).rejects.toThrowError('Not Found');
    });

    test('Should block an account', async () => {
      const { accountService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };
      jest.spyOn(AccountModel, 'findById').mockResolvedValue(account);
      jest.spyOn(AccountModel, 'updateById').mockResolvedValue({ ...account, active: false });

      const blockAccount = await accountService.blockAccount(1);

      expect(AccountModel.findById).toBeCalledTimes(1);
      expect(AccountModel.updateById).toBeCalledTimes(1);
      expect(blockAccount).toMatchObject({ ...account, active: false });
    });
  });

  describe('getAccount', () => {
    test('Should throw error case not found idAccount', async () => {
      const { accountService } = maker();
      jest.spyOn(AccountModel, 'findById').mockResolvedValue(undefined);

      await expect(accountService.getAccount(1)).rejects.toThrow();
      await expect(accountService.getAccount(1)).rejects.toThrowError('Not Found');
    });

    test('Should get an account', async () => {
      const { accountService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };
      jest.spyOn(AccountModel, 'findById').mockResolvedValue(account);

      const getAccount = await accountService.getAccount(1);

      expect(AccountModel.findById).toBeCalledTimes(1);
      expect(getAccount).toMatchObject({ ...account });
    });
  });

  describe('updateAccountById', () => {
    test('Should throw error case not find account', async () => {
      const { accountService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };

      jest.spyOn(accountService, 'getAccount').mockRejectedValue(new Error('Not Found'));

      await expect(accountService.updateAccountById(1, account)).rejects.toThrow();
      await expect(accountService.updateAccountById(1, account)).rejects.toThrowError('Not Found');
    });

    test('Should throw error case not update account', async () => {
      const { accountService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };
      jest.spyOn(AccountModel, 'updateById').mockRejectedValue('Internal Error');

      await expect(accountService.updateAccountById(1, account)).rejects.toThrow();
      await expect(accountService.updateAccountById(1, account)).rejects.toThrowError('Not Found');
    });

    test('Should return updated account', async () => {
      const { accountService } = maker();
      const account = {
        idAccount: 1,
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
        createdAt: '1992-04-12',
      };
      jest.spyOn(accountService, 'getAccount').mockResolvedValue({ ...account, balance: 10 });
      jest.spyOn(AccountModel, 'updateById').mockResolvedValue({ ...account });

      const updateAccount = await accountService.updateAccountById(1, account);

      expect(accountService.getAccount).toBeCalledTimes(1);
      expect(AccountModel.updateById).toBeCalledTimes(1);
      expect(updateAccount).toMatchObject({ ...account });
    });
  });
});
