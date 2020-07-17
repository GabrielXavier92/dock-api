import * as express from 'express';
import AccountService from '../service/accountService';
import { AccountInput, InterfaceAccountController } from '../account.interface.d';

class AccountController implements InterfaceAccountController {
  public async createAccount(req: express.Request, res: express.Response): Promise<void> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    } = req.body as AccountInput;

    if (!idPeople || !balance || !dailyWithdrawalLimit || !active || !accountType) res.status(400).json({ msg: 'Invalid Input' });
    try {
      const account = await AccountService.createAccount({
        idPeople, balance, dailyWithdrawalLimit, active, accountType,
      });

      res.status(200).json(account);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
}

export default new AccountController();
