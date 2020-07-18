import AccountModel from '../model/accountModel';
import {
  InterfaceAccountService, AccountInput, Account, AccountModelInput,
} from '../account.interface.d';
import checkDecimal from '../../../../utils/checkDecimal';

class AccountService implements InterfaceAccountService {
  public async createAccount({
    idPeople, balance, dailyWithdrawalLimit, active, accountType,
  }: AccountInput): Promise<Account> {
    if (!checkDecimal(balance)) throw new Error('Invalid balance value');
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

  public async updateAccountById(idAccount: number, account: AccountModelInput): Promise<Account> {
    await this.getAccount(idAccount);
    return AccountModel.updateById(idAccount, account);
  }
}

export default new AccountService();
