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
  unlockAccount: (req: Request, res: Response) => Promise<void>;
  getAccount: (req: Request, res: Response) => Promise<void>;
}

export interface InterfaceAccountService {
  createAccount: (account: AccountInput) => Promise<Account>;
  blockAccount: (idAccount: number) => Promise<Account>;
  unlockAccount: (idAccount: number) => Promise<Account>;
  getAccount: (idAccount: number) => Promise<Account>;
  updateAccountById: (idAccount: number, account: AccountInput) => Promise<Account>;
}

export interface InterfaceAccountModel {
  create: (account: AccountInput) => Promise<Account>;
  updateById: (id: number, account: AccountInput) => Promise<Account>;
  findById: (idAccount: number) => Promise<Account | undefined>;
}
