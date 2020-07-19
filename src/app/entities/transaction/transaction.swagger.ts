import { deposit, withdraw, extract } from './controller/swagger';

const transaction = {
  '/payment/{idAccount}/deposit': {
    post: deposit,
  },
  '/payment/{idAccount}/withdraw': {
    post: withdraw,
  },
  '/payment/{idAccount}': {
    get: extract,
  },
  transactionDefinitions: {
    Transaction: {
      properties: {
        idAccount: { type: 'number', example: 12345 },
        idTransaction: { type: 'number', example: 5678 },
        value: { type: 'number', example: 15.0 },
        createdAt: { type: 'string', example: '1992-04-12' },
      },
    },
    TransactionInput: {
      properties: {
        value: { type: 'number', example: 15.0 },
      },
    },
    ExtractInput: {
      properties: {
        start: { type: 'string', example: '2020-05-01' },
        end: { type: 'string', example: '2020-12-01' },
      },
    },
  },
};

export default transaction;
