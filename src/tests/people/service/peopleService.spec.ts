import { InterfacePeopleModel } from '../../../app/entities/people/people.interface.d';
import PeopleService from '../../../app/entities/people/service/peopleService';
import PeopleModel from '../../../app/entities/people/model/peopleModel';

import { InterfacePeopleService } from '../../../app/entities/people/people.interface';

jest.mock('../../../app/entities/people/model/peopleModel');

type maker = {
  peopleService: InterfacePeopleService;
  peopleModel: InterfacePeopleModel;
};
const maker = (): maker => {
  const peopleService = PeopleService;
  const peopleModel = PeopleModel;
  return { peopleService, peopleModel };
};

describe('createPeople', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should throw new error if date is invalid', async () => {
    const { peopleService } = maker();
    const people = {
      name: 'Gabriel Xavier',
      birthDate: '1992-04-1',
      cpf: '123213',
    };
    await expect(peopleService.createPeople(people)).rejects.toThrow();
    await expect(peopleService.createPeople(people)).rejects.toThrowError('Invalid Input');
  });

  test('Should return people if date is valid', async () => {
    const { peopleService, peopleModel } = maker();
    const people = {
      name: 'Gabriel Xavier',
      birthDate: '1992-04-12',
      cpf: '123213',
    };
    await peopleService.createPeople(people);

    expect(peopleModel.create).toBeCalledTimes(1);
  });
});
