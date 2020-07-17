const createAccount = {
  tags: ['Account'],
  description: 'Create an account',
  parameters: [
    {
      name: 'body',
      type: 'string',
      required: true,
      in: 'body',
      schema: {
        $ref: '#/paths/accountDefinitions/AccountInput',
      },
    },
  ],
  responses: {
    200: {
      description: 'Success',
      schema: {
        $ref: '#/paths/accountDefinitions/Account',
      },
    },
    400: {
      description: 'Success',
      schema: {
        properties: {
          msg: {
            type: 'string',
            example: 'Invalid user input',
          },
        },
      },
    },
  },
};

export default createAccount;
