import {
  InterfaceTransactionService, TransactionInput, Transaction, TransactionValidate,
} from '../transaction.interface';
import accountService from '../../account/service/accountService';
import transactionModel from '../model/transactionModel';
import { AccountInput } from '../../account/account.interface';
import checkDecimal from '../../../../utils/checkDecimal';

class TransactionService implements InterfaceTransactionService {
  public async deposit(transaction: TransactionInput): Promise<Transaction> {
    const { account, newTransaction } = await this.validate(transaction);
    const newAccount: AccountInput = {
      ...account,
      balance: Number(account.balance) + Number(newTransaction.value),
    };
    await accountService.updateAccountById(transaction.idAccount, newAccount);
    return newTransaction;
  }

  public async withdraw(transaction: TransactionInput): Promise<Transaction> {
    const { account, newTransaction } = await this.validate(transaction);
    if (account.balance < transaction.value) throw new Error('Insufficient funds');

    const newAccount: AccountInput = {
      ...account,
      balance: Number(account.balance) - Number(newTransaction.value),
    };
    await accountService.updateAccountById(transaction.idAccount, newAccount);
    return newTransaction;
  }

  private async validate(transaction: TransactionInput): Promise<TransactionValidate> {
    const { idAccount, value } = transaction;

    if (value < 0) throw new Error('Value most be bigger than 0');
    if (!checkDecimal(value)) throw new Error('Invalid value');

    const account = await accountService.getAccount(idAccount);
    if (!account.active) throw new Error('Blocked Account');

    const newTransaction = await transactionModel.create(transaction);

    return { account, newTransaction };
  }
}

export default new TransactionService();
