import { mockRequest, mockResponse } from '../../utils/expressMock';
import PeopleController from '../../../app/entities/people/controller/peopleController';
import PeopleService from '../../../app/entities/people/service/peopleService';

import { InterfacePeopleController } from '../../../app/entities/people/people.interface';

jest.mock('../../../app/entities/people/service/peopleService');

type maker = {
  peopleController: InterfacePeopleController;
};
const maker = (): maker => {
  const peopleController = PeopleController;
  return { peopleController };
};

describe('AccountController', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const req = mockRequest();
  const res = mockResponse();

  describe('createPeople', () => {
    test('Should throw new error when name is invalid', () => {
      const { peopleController } = maker();
      req.body = { name: '' };
      peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Input' });
    });

    test('Should throw new error when cpf is invalid', () => {
      const { peopleController } = maker();
      req.body = { cpf: '123' };
      peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Input' });
    });

    test('Should throw new error when birthDate is invalid', () => {
      const { peopleController } = maker();
      req.body = { birthDate: '' };
      peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Input' });
    });

    test('Should throw new error if type of variables is incorrect', () => {
      const { peopleController } = maker();
      const people = {
        name: 123,
        cpf: 1234,
        birthDate: new Date(),
      };
      req.body = people;
      peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Input' });
    });

    test('Should return success when create people', async () => {
      const { peopleController } = maker();
      const people = {
        name: 'Gabriel Xavier',
        cpf: '1140123012310',
        birthDate: '1992-04-12',
      };
      req.body = people;
      await peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('Should return 400 when throw some error', async () => {
      const { peopleController } = maker();
      const people = {
        name: 'Gabriel Xavier',
        cpf: '1140123012310',
        birthDate: '1992-04-12',
      };
      req.body = people;

      jest.spyOn(PeopleService, 'createPeople').mockRejectedValueOnce({ message: 'Internal Error' });

      await peopleController.createPeopple(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({ msg: 'Internal Error' });
    });
  });

  describe('getPeople', () => {
    test('Should return 400 if idPeople is invalid', async () => {
      const { peopleController } = maker();
      req.params = {};

      await peopleController.getPeople(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'idPeople is required' });
    });

    test('Should return an user', async () => {
      const { peopleController } = maker();
      req.params = { idPeople: '1' };

      const people = {
        idPeople: 1,
        name: 'Gabriel Xavier',
        cpf: '1140123012310',
        birthDate: '1992-04-12',
      };
      jest.spyOn(PeopleService, 'findOnePeople').mockResolvedValueOnce(people);

      await peopleController.getPeople(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(people);
    });
  });
});
