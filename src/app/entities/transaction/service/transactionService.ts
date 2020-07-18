import { InterfaceTransactionService, TransactionInput, Transaction } from '../transaction.interface';
import accountService from '../../account/service/accountService';
import transactionModel from '../model/transactionModel';
import { AccountModelInput } from '../../account/account.interface';
import checkDecimal from '../../../../utils/checkDecimal';

class TransactionService implements InterfaceTransactionService {
  public async deposit(transaction: TransactionInput): Promise<Transaction> {
    const { idAccount, value } = transaction;

    if (value < 0) throw new Error('Value most be bigger than 0');
    if (!checkDecimal(value)) throw new Error('Invalid value');

    const account = await accountService.getAccount(idAccount);

    const updatedTransaction = {
      idAccount,
      value,
      createdAt: new Date().toISOString(),
    };
    const newTransaction = await transactionModel.create(updatedTransaction);

    const newAccount: AccountModelInput = {
      ...account,
      balance: Number(account.balance) + Number(newTransaction.value),
    };

    await accountService.updateAccountById(idAccount, newAccount);

    return newTransaction;
  }

  public async withdraw(transaction: TransactionInput): Promise<Transaction> {
    const { idAccount, value } = transaction;

    if (value < 0) throw new Error('Value most be bigger than 0');
    if (!checkDecimal(value)) throw new Error('Invalid value');

    const account = await accountService.getAccount(idAccount);
    if (account.balance < value) throw new Error('Insufficient funds');

    const updatedTransaction = {
      idAccount,
      value,
      createdAt: new Date().toISOString(),
    };

    const newTransaction = await transactionModel.create(updatedTransaction);

    const newAccount: AccountModelInput = {
      ...account,
      balance: Number(account.balance) + Number(newTransaction.value),
    };

    await accountService.updateAccountById(idAccount, newAccount);

    return newTransaction;
  }
}

export default new TransactionService();
