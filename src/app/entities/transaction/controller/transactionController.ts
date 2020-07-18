import * as express from 'express';
import { InterfaceTransactionController, TransactionInput } from '../transaction.interface';
import transactionService from '../service/transactionService';

class TransactionController implements InterfaceTransactionController {
  public async deposit(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { idAccount, value } = this.validate(req);

      const transaction = await transactionService.deposit({ idAccount: Number(idAccount), value });

      res.status(200).json(transaction);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async withdraw(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { idAccount, value } = this.validate(req);
      const transaction = await transactionService.withdraw({ idAccount, value });

      res.status(200).json(transaction);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  private validate(req: express.Request): TransactionInput {
    const { value } = req.body;
    const { idAccount } = req.params;
    if (!idAccount || !value || typeof value !== 'number') throw new Error('Invalid Input');
    const id = Number(idAccount);

    return { idAccount: id, value };
  }
}

export default new TransactionController();
