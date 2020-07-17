const createPeople = {
  tags: ['People'],
  description: 'Create an user',
  parameters: [
    {
      name: 'body',
      type: 'string',
      required: true,
      in: 'body',
      schema: {
        $ref: '#/paths/peopleDefinitions/PeopleInput',
      },
    },
  ],
  responses: {
    200: {
      description: 'Success',
      schema: {
        $ref: '#/paths/peopleDefinitions/People',
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

export default createPeople;
