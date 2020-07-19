export const createAccount = {
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

export const blockAccount = {
  tags: ['Account'],
  description: 'Block an account',
  parameters: [
    {
      in: 'path',
      name: 'idAccount',
      type: 'number',
      required: true,
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

export const unlockAccount = {
  tags: ['Account'],
  description: 'Unlock an account',
  parameters: [
    {
      in: 'path',
      name: 'idAccount',
      type: 'number',
      required: true,
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

export const getAccount = {
  tags: ['Account'],
  description: 'Get an account',
  parameters: [
    {
      in: 'path',
      name: 'idAccount',
      type: 'number',
      required: true,
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
