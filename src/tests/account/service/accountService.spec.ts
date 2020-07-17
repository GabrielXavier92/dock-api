import AccountService from '../../../app/entities/account/service/accountService';
import AccountModel from '../../../app/entities/account/model/accountModel';

import { InterfaceAccountService } from '../../../app/entities/account/account.interface.d';

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

  describe('createPeople', () => {
    test('Should throw new error if date is invalid', async () => {
      const { accountService } = maker();
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

      jest.spyOn(AccountModel, 'create').mockResolvedValue(createdAccount);

      const service = await accountService.createAccount(account);

      expect(AccountModel.create).toBeCalledTimes(1);
      expect(service).toBe(createdAccount);
    });
  });
});
