import * as express from 'express';
import { InterfacePeopleController, PeopleInput } from '../people.interface';
import PeopleService from '../service/peopleService';

class PeopleController implements InterfacePeopleController {
  public async createPeopple(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { name, cpf, birthDate } = req.body as PeopleInput;

      if (!name || !cpf || !birthDate) throw new Error('Invalid Input');
      if (typeof name !== 'string' || typeof cpf !== 'string' || typeof birthDate !== 'string') throw new Error('Invalid Input');

      const people = await PeopleService.createPeople({ name, cpf, birthDate });
      res.status(200).json(people);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }

  public async getPeople(req: express.Request, res: express.Response): Promise<void> {
    const { idPeople } = req.params;

    try {
      if (!idPeople) throw new Error('Invalid Input');
      const people = await PeopleService.findOnePeople(Number(idPeople));
      res.status(200).json(people);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
}

export default new PeopleController();
