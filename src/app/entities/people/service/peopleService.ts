import { People, PeopleInput, InterfacePeopleService } from '../people.interface';
import PeopleModel from '../model/peopleModel';

class PeopleService implements InterfacePeopleService {
  public async createPeople({ name, cpf, birthDate }: PeopleInput): Promise<People> {
    // Poderia ser adicionado mais regras de negocio nessa camada como verificacao de documento
    // verificacao da idade, entre outros
    const birthDateRegex = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

    if (!birthDateRegex.test(birthDate)) {
      throw new Error('Invalid Input');
    }

    const createdPeople = await PeopleModel.create({ name, cpf, birthDate });
    return createdPeople;
  }

  public async findOnePeople(id: number): Promise<People> {
    return PeopleModel.findById(id);
  }
}

export default new PeopleService();
