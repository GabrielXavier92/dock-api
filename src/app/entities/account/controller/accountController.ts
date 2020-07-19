import * as express from 'express';
import AccountService from '../service/accountService';
import { AccountInput, InterfaceAccountController } from '../account.interface';

class AccountController implements InterfaceAccountController {
  public async createAccount(req: express.Request, res: express.Response): Promise<void> {
    try {
      const {
        idPeople, balance, dailyWithdrawalLimit, active, accountType,
      } = req.body as AccountInput;
      if (!idPeople || !balance || !dailyWithdrawalLimit || !active || !accountType) throw new Error('Invalid Input');
      if (typeof idPeople !== 'number' || typeof balance !== 'number' || typeof dailyWithdrawalLimit !== 'number' || typeof active !== 'boolean' || typeof accountType !== 'number') throw new Error('Invalid Input');

      const account = await AccountService.createAccount({
        idPeople, balance, dailyWithdrawalLimit, active, accountType,
      });
      res.status(200).json(account);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async blockAccount(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { idAccount } = req.params;
      if (!idAccount) throw new Error('Invalid Input');

      const block = await AccountService.blockAccount(Number(idAccount));
      res.status(200).json(block);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async unlockAccount(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { idAccount } = req.params;
      if (!idAccount) throw new Error('Invalid Input');

      const block = await AccountService.unlockAccount(Number(idAccount));
      res.status(200).json(block);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async getAccount(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { idAccount } = req.params;
      if (!idAccount) throw new Error('Invalid Input');

      const account = await AccountService.getAccount(Number(idAccount));
      res.status(200).json(account);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
}

export default new AccountController();
