import { createAccount, blockAccount } from './controller/swagger';

const account = {
  '/account': {
    post: createAccount,
  },
  '/account/{idAccount}/block': {
    post: blockAccount,
  },
  accountDefinitions: {
    Account: {
      properties: {
        idAccount: { type: 'number', example: 12345 },
        idPeople: { type: 'number', example: 5678 },
        balance: { type: 'number', example: 15.0 },
        dailyWithdrawalLimit: { type: 'number', example: 100.0 },
        active: { type: 'boolean', example: true },
        accountType: { type: 'number', example: 1 },
        createdAt: { type: 'string', example: '1992-04-12' },
      },
    },
    AccountInput: {
      properties: {
        idPeople: { type: 'number', example: 5678 },
        balance: { type: 'number', example: 15.0 },
        dailyWithdrawalLimit: { type: 'number', example: 100.0 },
        active: { type: 'boolean', example: true },
        accountType: { type: 'number', example: 1 },
        createdAt: { type: 'string', example: '1992-04-12' },
      },
    },
  },
};

export default account;
