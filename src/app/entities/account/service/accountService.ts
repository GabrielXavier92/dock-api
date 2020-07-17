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

    const createdAccount = await AccountModel.create(account);
    return new Promise((resolve) => {
      resolve(createdAccount);
    });
  }
}

export default new AccountService();
