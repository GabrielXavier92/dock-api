export const deposit = {
  tags: ['Payment'],
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
  tags: ['Payment'],
  description: 'Withdraw value in account',
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

export const extract = {
  tags: ['Payment'],
  description: 'Extracts of account',
  parameters: [
    {
      in: 'path',
      name: 'idAccount',
      type: 'number',
      required: true,
    },
    {
      name: 'start',
      type: 'string',
      in: 'query',
    },
    {
      name: 'end',
      type: 'string',
      in: 'query',
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
