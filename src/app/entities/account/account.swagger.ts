import {
  createAccount, blockAccount, unlockAccount, getAccount,
} from './controller/swagger';

const account = {
  '/account': {
    post: createAccount,
  },
  '/account/{idAccount}': {
    get: getAccount,
  },
  '/account/{idAccount}/block': {
    post: blockAccount,
  },
  '/account/{idAccount}/unlock': {
    post: unlockAccount,
  },
  accountDefinitions: {
    Account: {
      properties: {
        idAccount: { type: 'number', example: 1 },
        idPeople: { type: 'number', example: 1 },
        balance: { type: 'number', example: 15.0 },
        dailyWithdrawalLimit: { type: 'number', example: 100.0 },
        active: { type: 'boolean', example: true },
        accountType: { type: 'number', example: 1 },
        createdAt: { type: 'string', example: '1992-04-12' },
      },
    },
    AccountInput: {
      properties: {
        idPeople: { type: 'number', example: 1 },
        balance: { type: 'number', example: 15.0 },
        dailyWithdrawalLimit: { type: 'number', example: 100.0 },
        active: { type: 'boolean', example: true },
        accountType: { type: 'number', example: 1 },
      },
    },
  },
};

export default account;
