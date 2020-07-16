import account from '../app/entities/account/account.swagger';

const swagger = {
  openapi: '3.0.1',
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
      url: 'http://localhost:3001/api/v1',
      description: 'Local server',
    },
  ],
  paths: {
    ...account,
  },
};

export default swagger;
