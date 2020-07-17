import { mockRequest, mockResponse } from '../../utils/expressMock';
import PeopleController from '../../../app/entities/people/controller/peopleController';
import { InterfacePeopleController } from '../../../app/entities/people/people.interface';

jest.mock('../../../app/entities/people/service/peopleService');

type maker = {
  peopleController: InterfacePeopleController;
};
const maker = (): maker => {
  const peopleController = PeopleController;
  return { peopleController };
};

describe('createPeople', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const req = mockRequest();
  const res = mockResponse();

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
});
