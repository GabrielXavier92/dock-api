import * as express from 'express';
import AccountService from '../service/accountService';
import { AccountInput, InterfaceAccountController } from '../account.interface.d';

class AccountController implements InterfaceAccountController {
  public async createAccount(req: express.Request, res: express.Response): Promise<void> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    } = req.body as AccountInput;

    try {
      if (!idPeople || !balance || !dailyWithdrawalLimit || !active || !accountType) throw new Error('Invalid Input');

      const account = await AccountService.createAccount({
        idPeople, balance, dailyWithdrawalLimit, active, accountType,
      });
      res.status(200).json(account);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async blockAccount(req: express.Request, res: express.Response): Promise<void> {
    const { idAccount } = req.params;

    try {
      if (!idAccount) throw new Error('Invalid Input');

      const block = await AccountService.blockAccount(Number(idAccount));
      res.status(200).json(block);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
}

export default new AccountController();
