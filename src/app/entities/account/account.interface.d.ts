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

export interface InterfaceAccountController {
  createAccount: (req: Request, res: Response) => Promise<void>;
  blockAccount: (req: Request, res: Response) => Promise<void>;
  getAccount: (req: Request, res: Response) => Promise<void>;
}

export interface InterfaceAccountService {
  createAccount: (account: AccountInput) => Promise<Account>;
  blockAccount: (idAccount: number) => Promise<Account>;
  getAccount: (idAccount: number) => Promise<Account>;
  updateAccountById: (idAccount: number, account: AccountModelInput) => Promise<Account>;
}

export interface InterfaceAccountModel {
  create: (account: AccountModelInput) => Promise<Account>;
  updateById: (id: number, account: AccountModelInput) => Promise<Account>;
  findById: (idAccount: number) => Promise<Account | undefined>;
}
