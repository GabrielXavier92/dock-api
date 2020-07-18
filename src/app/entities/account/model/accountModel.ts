import connection from '../../../../database/connection';

import { InterfaceAccountModel, AccountInput, Account } from '../account.interface';

class AccountModel implements InterfaceAccountModel {
  public async create(account: AccountInput): Promise<Account> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    } = account;

    try {
      const db = await connection.raw(`
        INSERT INTO account("idPeople", balance, "dailyWithdrawalLimit", active, "accountType")
        VALUES(?, ?, ?, ?, ?)
        RETURNING *;
      `, [`${idPeople}`, `${balance}`, `${dailyWithdrawalLimit}`, `${active}`, `${accountType}`]);

      return db.rows[0] as Account;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async updateById(id: number, account: AccountInput): Promise<Account> {
    const {
      idPeople, balance, dailyWithdrawalLimit, active, accountType,
    } = account;

    try {
      const db = await connection.raw(`
        UPDATE "account"
        SET "idPeople"=?, 
            balance=?,
            "dailyWithdrawalLimit"=?,
            active=?,
            "accountType"=?
        WHERE "idAccount"=?
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
