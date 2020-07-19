import AccountModel from '../model/accountModel';
import {
  InterfaceAccountService, AccountInput, Account,
} from '../account.interface.d';
import checkDecimal from '../../../../utils/checkDecimal';
import peopleService from '../../people/service/peopleService';

class AccountService implements InterfaceAccountService {
  public async createAccount({
    idPeople, balance, dailyWithdrawalLimit, active, accountType,
  }: AccountInput): Promise<Account> {
    if (balance < 0) throw new Error('Balance should be greater than 0');
    if (!checkDecimal(balance)) throw new Error('Invalid balance value');
    if (!checkDecimal(dailyWithdrawalLimit)) throw new Error('Invalid daily withdraw limit value');

    await peopleService.findOnePeople(idPeople);

    return AccountModel.create({
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    });
  }

  public async getAccount(idAccount: number): Promise<Account> {
    const account = await AccountModel.findById(idAccount);
    if (!account) throw new Error(`Not found account with idAccount ${idAccount}`);
    return account;
  }

  public async blockAccount(idAccount: number): Promise<Account> {
    const account = await this.getAccount(idAccount);
    if (!account.active) return account;

    const block: AccountInput = {
      ...account,
      active: false,
    };

    return this.updateAccountById(idAccount, block);
  }

  public async unlockAccount(idAccount: number): Promise<Account> {
    const account = await this.getAccount(idAccount);
    if (account.active) return account;

    const unlock: Account = {
      ...account,
      active: true,
    };
    return this.updateAccountById(idAccount, unlock);
  }

  public async updateAccountById(idAccount: number, account: AccountInput): Promise<Account> {
    await this.getAccount(idAccount);
    return AccountModel.updateById(idAccount, account);
  }
}

export default new AccountService();
