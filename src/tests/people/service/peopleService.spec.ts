import PeopleService from '../../../app/entities/people/service/peopleService';
import PeopleModel from '../../../app/entities/people/model/peopleModel';

import { InterfacePeopleService } from '../../../app/entities/people/people.interface';

type maker = {
  peopleService: InterfacePeopleService;
};
const maker = (): maker => {
  const peopleService = PeopleService;
  return { peopleService };
};

describe('peopleService', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('createPeople', () => {
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

    test('Should return people if data is valid', async () => {
      const { peopleService } = maker();
      const people = {
        name: 'Gabriel Xavier',
        birthDate: '1992-04-12',
        cpf: '123213',
      };

      const createdPeople = {
        idPeople: 123,
        ...people,
      };

      jest.spyOn(PeopleModel, 'create').mockResolvedValue(createdPeople);

      const service = await peopleService.createPeople(people);

      expect(PeopleModel.create).toBeCalledTimes(1);
      expect(service).toBe(createdPeople);
    });
  });

  describe('findeOnePeople', () => {
    test('Should return one people', async () => {
      const { peopleService } = maker();

      const people = {
        idPeople: 1,
        name: 'Gabriel Xavier',
        birthDate: '1992-04-12',
        cpf: '123213',
      };
      jest.spyOn(PeopleModel, 'findById').mockResolvedValue(people);

      const service = await peopleService.findOnePeople(1);

      expect(PeopleModel.findById).toBeCalledTimes(1);
      expect(service).toBe(people);
    });
  });
});
