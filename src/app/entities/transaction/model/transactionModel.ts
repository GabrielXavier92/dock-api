import connection from '../../../../database/connection';

import { InterfaceTransactionModel, Transaction, TransactionModelInput } from '../transaction.interface.d';

class TransactionModel implements InterfaceTransactionModel {
  public async create(transaction: TransactionModelInput): Promise<Transaction> {
    const { idAccount, value, createdAt } = transaction;

    try {
      const db = await connection.raw(`
      INSERT INTO transaction("idAccount", value, "createdAt")
        VALUES(?, ?, ?)
        RETURNING *;
      `, [`${idAccount}`, `${value}`, `${createdAt}`]);

      return db.rows[0] as Transaction;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async findByIdAccount(idAccount: number): Promise<Transaction | undefined> {
    try {
      const db = await connection.raw(`
      SELECT * FROM "transaction" where "idAccount"=?
    `, [idAccount]);

      return db.rows[0] as Transaction;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }
}

export default new TransactionModel();
