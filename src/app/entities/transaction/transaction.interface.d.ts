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

export interface TransactionModelInput extends TransactionInput {
  createdAt: string;
}

export interface InterfaceTransactionService {
  deposit: (transaction: TransactionInput) => Promise<Transaction>;
}

export interface InterfaceTransactionModel {
  create: (transaction: TransactionModelInput) => Promise<Transaction>;
  findByIdAccount: (idAccount: number) => Promise<Transaction | undefined>;
}
