import { People, PeopleInput, InterfacePeopleService } from '../people.interface';
import PeopleModel from '../model/peopleModel';
import checkDate from '../../../../utils/checkDate';

class PeopleService implements InterfacePeopleService {
  public async createPeople({ name, cpf, birthDate }: PeopleInput): Promise<People> {
    // Poderia ser adicionado mais regras de negocio nessa camada como verificacao de documento
    // verificacao da idade, entre outros

    if (!checkDate(birthDate)) throw new Error('Invalid Input');

    return PeopleModel.create({ name, cpf, birthDate });
  }

  public async findOnePeople(id: number): Promise<People> {
    const people = await PeopleModel.findById(id);
    if (!people) throw new Error('Not Found');
    return people;
  }
}

export default new PeopleService();
