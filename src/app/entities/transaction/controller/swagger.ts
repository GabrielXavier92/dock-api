export const deposit = {
  tags: ['Account'],
  description: 'Deposit value in account',
  parameters: [
    {
      in: 'path',
      name: 'idAccount',
      type: 'number',
      required: true,
    },
    {
      name: 'body',
      type: 'string',
      required: true,
      in: 'body',
      schema: {
        $ref: '#/paths/transactionDefinitions/TransactionInput',
      },
    },
  ],
  responses: {
    200: {
      description: 'Success',
      schema: {
        $ref: '#/paths/transactionDefinitions/Transaction',
      },
    },
    400: {
      description: 'Failed',
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

export const withdraw = {
  tags: ['Account'],
};
