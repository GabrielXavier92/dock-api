import AccountModel from '../model/accountModel';
import {
  InterfaceAccountService, AccountInput, Account,
} from '../account.interface.d';
import checkDecimal from '../../../../utils/checkDecimal';

class AccountService implements InterfaceAccountService {
  public async createAccount({
    idPeople, balance, dailyWithdrawalLimit, active, accountType,
  }: AccountInput): Promise<Account> {
    if (balance < 0) throw new Error('Balance should be greater than 0');
    if (!checkDecimal(balance)) throw new Error('Invalid balance value');
    if (!checkDecimal(dailyWithdrawalLimit)) throw new Error('Invalid daily withdraw limit value');
    return AccountModel.create({
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    });
  }

  public async blockAccount(idAccount: number): Promise<Account> {
    const account = await AccountModel.findById(idAccount);
    if (!account) throw new Error('Not Found');

    const block: AccountInput = {
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

  public async updateAccountById(idAccount: number, account: AccountInput): Promise<Account> {
    await this.getAccount(idAccount);
    return AccountModel.updateById(idAccount, account);
  }
}

export default new AccountService();
