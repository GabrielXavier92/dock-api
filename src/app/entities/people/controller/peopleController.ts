import * as express from 'express';
import { InterfacePeopleController, PeopleInput } from '../people.interface';
import PeopleService from '../service/peopleService';

class PeopleController implements InterfacePeopleController {
  public async createPeopple(req: express.Request, res: express.Response): Promise<void> {
    const { name, cpf, birthDate } = req.body as PeopleInput;
    if (!name || !cpf || !birthDate) res.status(400).json({ msg: 'Invalid Input' });

    try {
      const people = await PeopleService.createPeople({ name, cpf, birthDate });
      res.status(200).json(people);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
}

export default new PeopleController();
