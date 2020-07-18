import connection from '../../../../database/connection';

import { InterfaceAccountModel, AccountModelInput, Account } from '../account.interface';

class AccountModel implements InterfaceAccountModel {
  public async create(account: AccountModelInput): Promise<Account> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType, createdAt,
    } = account;

    try {
      const db = await connection.raw(`
        INSERT INTO account("idPeople", balance, "dailyWithdrawalLimit", active, "accountType", "createdAt")
        VALUES(?, ?, ?, ?, ?, ?)
        RETURNING *;
      `, [`${idPeople}`, `${balance}`, `${dailyWithdrawalLimit}`, `${active}`, `${accountType}`, `${createdAt}`]);

      return db.rows[0] as Account;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async updateById(id: number, account: AccountModelInput): Promise<Account> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    } = account;

    try {
      const db = await connection.raw(`
        UPDATE account 
        SET "idPeople"=?, 
            balance=?,
            "dailyWithdrawalLimit"=?,
            active=?,
            "accountType"=?, 
        WHERE "idAccount"=?,
        RETURNING *;
      `, [`${idPeople}`, `${balance}`, `${dailyWithdrawalLimit}`, `${active}`, `${accountType}`, `${id}`]);

      return db.rows[0] as Account;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async findById(id: number): Promise<Account | undefined> {
    try {
      const db = await connection.raw(`
      SELECT * FROM "account" where "idAccount"=?
    `, [id]);

      return db.rows[0] as Account;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }
}

export default new AccountModel();
