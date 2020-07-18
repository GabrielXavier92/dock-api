import AccountModel from '../model/accountModel';
import {
  InterfaceAccountService, AccountInput, Account, AccountModelInput,
} from '../account.interface.d';

class AccountService implements InterfaceAccountService {
  public async createAccount({
    idPeople, balance, dailyWithdrawalLimit, active, accountType,
  }: AccountInput): Promise<Account> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const account: AccountModelInput = {
      idPeople,
      balance,
      dailyWithdrawalLimit,
      active,
      accountType,
      createdAt,
    };

    return AccountModel.create(account);
  }

  public async blockAccount(idAccount: number): Promise<Account> {
    const account = await AccountModel.findById(idAccount);
    if (!account) throw new Error('Not Found');

    const block: AccountModelInput = {
      ...account,
      active: false,
    };

    return AccountModel.updateById(idAccount, block);
  }

  public async getAccount(idAccount: number): Promise<Account> {
    const account = await AccountModel.findById(idAccount);
    if (!account) throw new Error('Not Found');
    return account;
  }
}

export default new AccountService();
