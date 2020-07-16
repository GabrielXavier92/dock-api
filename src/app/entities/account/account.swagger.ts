import createAccount from './controllers/createAccount/swagger';

const account = {
  '/account': {
    patch: createAccount,
  },
};

export default account;
