const createAccount = {
  tags: ['Account'],
  description: 'Create an account',
  operationId: 'pathAccount',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              id: {
                type: 'number',
                description: 'id of account',
              },
              idPeople: {
                type: 'number',
                description: 'id of owner',
              },
            },
          },
        },
      },
    },
  },
};

export default createAccount;
