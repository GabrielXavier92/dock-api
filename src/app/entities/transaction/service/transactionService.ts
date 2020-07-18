import { InterfaceTransactionService, TransactionInput, Transaction } from '../transaction.interface';
import accountService from '../../account/service/accountService';
import transactionModel from '../model/transactionModel';
import { AccountModelInput } from '../../account/account.interface';

class TransactionService implements InterfaceTransactionService {
  public async deposit(transaction: TransactionInput): Promise<Transaction> {
    const { idAccount, value } = transaction;

    const account = await accountService.getAccount(idAccount);

    const updatedTransaction = {
      idAccount,
      value,
      createdAt: new Date().toISOString(),
    };
    if (value < 0) throw new Error('Value most be bigger than 0');
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
