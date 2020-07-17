import { People, PeopleInput, InterfacePeopleService } from '../people.interface';
import PeopleModel from '../model/peopleModel';

class PeopleService implements InterfacePeopleService {
  public async createPeople({ name, cpf, birthDate }: PeopleInput): Promise<People> {
    const birthDateRegex = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

    if (!birthDateRegex.test(birthDate)) {
      throw new Error('Invalid Input');
    }

    const createdPeople = await PeopleModel.create({ name, cpf, birthDate });
    return createdPeople;
  }
}

export default new PeopleService();
