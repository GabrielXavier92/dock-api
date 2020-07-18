import { Request, Response } from 'express';

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

export interface InterfaceTransactionController {
  deposit: (req: Request, res: Response) => Promise<void>;
}

export interface InterfaceTransactionService {
  deposit: (transaction: TransactionInput) => Promise<Transaction>;
  withdraw: (transaction: TransactionInput) => Promise<Transaction>;
}

export interface InterfaceTransactionModel {
  create: (transaction: TransactionInput) => Promise<Transaction>;
  findByIdAccount: (idAccount: number) => Promise<Transaction | undefined>;
}
