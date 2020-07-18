import account from '../app/entities/account/account.swagger';
import people from '../app/entities/people/people.swagger';
import transaction from '../app/entities/transaction/transaction.swagger';

const swagger = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Dock api',
    description: 'Api for job test',
    termsOfService: '',
    contact: {
      name: 'Gabriel Xavier',
    },
  },
  servers: [
    {
      url: `${process.env.APP_URL}:${process.env.APP_PORT}/api`,
      description: 'Local server',
    },
  ],
  paths: {
    ...people,
    ...account,
    ...transaction,
  },
};

export default swagger;
