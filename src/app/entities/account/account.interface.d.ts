import { Request, Response } from 'express';

export interface Account {
  idAccount: number;
  idPeople: number;
  balance: number;
  dailyWithdrawalLimit: number;
  active: boolean;
  accountType: number;
  createdAt: string;
}

export interface AccountInput {
  idPeople: number;
  balance: number;
  dailyWithdrawalLimit: number;
  active: boolean;
  accountType: number;
}

export interface AccountModelInput extends AccountInput {
  createdAt: string;
}
export interface InterfaceAccountController {
  createAccount: (req: Request, res: Response) => Promise<void>;
  blockAccount: (req: Request, res: Response) => Promise<void>;
  // balanceAccount: (req: Request, res: Response) => Promise<void>;
}

export interface InterfaceAccountService {
  createAccount: (account: AccountInput) => Promise<Account>;
  blockAccount: (idAccount: number) => Promise<Account>;
  // balanceAccount: (idAccount: number) => Promise<Account>;
}

export interface InterfaceAccountModel {
  create: (account: AccountModelInput) => Promise<Account>;
  updateById: (id: number, account: AccountModelInput) => Promise<Account>;
  findById: (idAccount: number) => Promise<Account | undefined>;
  // updateById: (idAccount: number, account: AccountInput) => Promise<Account>;
}
