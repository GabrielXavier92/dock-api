import { mockRequest, mockResponse } from '../../utils/expressMock';

import AccountController from '../../../app/entities/account/controller/accountController';
import AccountService from '../../../app/entities/account/service/accountService';

import { InterfaceAccountController } from '../../../app/entities/account/account.interface';

// jest.mock('../../../app/entities/account/service/accountService');

type maker = {
  accountController: InterfaceAccountController;
};
const maker = (): maker => {
  const accountController = AccountController;
  return { accountController };
};

describe('AccountController', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const req = mockRequest();
  const res = mockResponse();

  describe('createAccount', () => {
    test('Should return 400 when idPeople is invalid', () => {
      const { accountController } = maker();
      req.body = { idPeople: undefined };
      accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when balance is invalid', () => {
      const { accountController } = maker();
      req.body = { balance: undefined };
      accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when dailyWithdrawalLimit is invalid', () => {
      const { accountController } = maker();
      req.body = { dailyWithdrawalLimit: undefined };
      accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when active is invalid', () => {
      const { accountController } = maker();
      req.body = { active: undefined };
      accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 400 when accountType is invalid', () => {
      const { accountController } = maker();
      req.body = { accountType: undefined };
      accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toBeCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return 200 when create account', async () => {
      const { accountController } = maker();
      const account = {
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
      };

      req.body = { ...account };

      const createdAccount = {
        idAccount: 1,
        createdAt: new Date().toDateString(),
        ...account,
      };

      jest.spyOn(AccountService, 'createAccount').mockResolvedValue(createdAccount);

      await accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith(createdAccount);
    });

    test('Should return 400 when throw some error', async () => {
      const { accountController } = maker();
      const account = {
        idPeople: 123,
        balance: 50,
        dailyWithdrawalLimit: 150,
        active: true,
        accountType: 1,
      };

      req.body = { ...account };

      jest.spyOn(AccountService, 'createAccount').mockRejectedValue({ message: 'Internal Error' });

      await accountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({ msg: 'Internal Error' });
    });
  });
});
