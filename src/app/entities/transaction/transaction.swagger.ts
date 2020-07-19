import { deposit, withdraw } from './controller/swagger';

const transaction = {
  '/payment/{idAccount}/deposit': {
    post: deposit,
  },
  '/payment/{idAccount}/withdraw': {
    post: withdraw,
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
  },
};

export default transaction;
