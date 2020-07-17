import createPeopleController from './controller/swagger';

const people = {
  '/people': {
    post: createPeopleController,
  },
  definitions: {
    People: {
      properties: {
        idPeople: { type: 'string', example: '12345' },
        name: { type: 'string', example: 'Gabriel Xavier' },
        cpf: { type: 'string', example: '1140123012310' },
        birthDate: { type: 'string', example: '1992-04-12' },
      },
    },
    PeopleInput: {
      properties: {
        name: { type: 'string', example: 'Gabriel Xavier' },
        cpf: { type: 'string', example: '1140123012310' },
        birthDate: { type: 'string', example: '1992-04-12' },
      },
    },
  },
};

export default people;
