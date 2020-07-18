import { createPeople, getPeople } from './controller/swagger';

const people = {
  '/people': {
    post: createPeople,
  },
  '/people/{idPeople}': {
    get: getPeople,
  },
  peopleDefinitions: {
    People: {
      properties: {
        idPeople: { type: 'number', example: 1 },
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
    GetInput: {
      properties: {
        idPeople: { type: 'number', example: 1 },
      },
    },
  },
};

export default people;
