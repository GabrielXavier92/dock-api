import connection from '../../../../database/connection';

import { InterfaceAccountModel, AccountModelInput, Account } from '../account.interface';

class AccountModel implements InterfaceAccountModel {
  public async create(account: AccountModelInput): Promise<Account> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType, createdAt,
    } = account;

    const db = await connection.raw(`
      INSERT INTO account(idPeople, balance, dailyWithdrawalLimit, active, accountType, createdAt)
      VALUES(?, ?, ?, ?, ?, ?)
      RETURNING *;
    `, [`${idPeople}`, `${balance}`, `${dailyWithdrawalLimit}`, `${active}`, `${accountType}`, `${createdAt}`]);

    console.log(db.rows);
    return db.rows[0] as Account;
  }
}

export default new AccountModel();