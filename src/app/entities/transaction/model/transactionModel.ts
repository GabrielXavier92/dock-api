import connection from '../../../../database/connection';

import { InterfaceTransactionModel, Transaction, TransactionInput } from '../transaction.interface.d';

class TransactionModel implements InterfaceTransactionModel {
  public async create(transaction: TransactionInput): Promise<Transaction> {
    const { idAccount, value } = transaction;

    try {
      const db = await connection.raw(`
      INSERT INTO transaction("idAccount", value)
        VALUES(?, ?)
        RETURNING *;
      `, [`${idAccount}`, `${value}`]);

      return db.rows[0] as Transaction;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }

  public async findByIdAccount(idAccount: number, start?: string, end?: string): Promise<Array<Transaction> | undefined> {
    try {
      if (start && end) {
        const db = await connection.raw(`
        SELECT * FROM "transaction" where "idAccount"=? AND "createdAt" BETWEEN ? AND ?
      `, [`${idAccount}`, `${start}`, `${end}`]);

        return db.rows as Array<Transaction>;
      }
      const db = await connection.raw(`
        SELECT * FROM "transaction" where "idAccount"=?
      `, [`${idAccount}`]);

      return db.rows as Array<Transaction>;
    } catch (e) {
      throw new Error('Internal Error');
    }
  }
}

export default new TransactionModel();
