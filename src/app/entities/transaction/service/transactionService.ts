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
    const newTransaction = await transactionModel.create(updatedTransaction);

    const newAccount: AccountModelInput = {
      ...account,
      balance: account.balance + newTransaction.value,
    };

    await accountService.updateAccountById(idAccount, newAccount);

    return newTransaction;
  }
}

export default new TransactionService();
