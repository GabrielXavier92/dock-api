import { Request, Response } from 'express';

import { Account } from '../../entities/account/account.interface';

export interface Transaction {
  idTransaction: number;
  idAccount: number;
  value: number;
  createdAt: string;
}

export interface TransactionInput {
  idAccount: number;
  value: number;
}

export interface TransactionValidate {
  account: Account;
  newTransaction: Transaction;
}

export interface InterfaceTransactionController {
  deposit: (req: Request, res: Response) => Promise<void>;
  withdraw: (req: Request, res: Response) => Promise<void>;
  extract: (req: Request, res: Response) => Promise<void>;
}

export interface InterfaceTransactionService {
  deposit: (transaction: TransactionInput) => Promise<Transaction>;
  withdraw: (transaction: TransactionInput) => Promise<Transaction>;
  extract: (idAccount: number, start?: string, end?: string) => Promise<Array<Transaction>>;
}

export interface InterfaceTransactionModel {
  create: (transaction: TransactionInput) => Promise<Transaction>;
  findByIdAccount: (idAccount: number, start?: string, end?: string) => Promise<Array<Transaction> | undefined>;
}
