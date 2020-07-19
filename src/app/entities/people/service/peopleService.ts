import { People, PeopleInput, InterfacePeopleService } from '../people.interface';
import PeopleModel from '../model/peopleModel';
import checkDate from '../../../../utils/checkDate';

class PeopleService implements InterfacePeopleService {
  public async createPeople({ name, cpf, birthDate }: PeopleInput): Promise<People> {
    // Poderia ser adicionado mais regras de negocio nessa camada como verificacao de documento
    // verificacao da idade, entre outros

    if (!checkDate(birthDate)) throw new Error('Invalid birth date');

    return PeopleModel.create({ name, cpf, birthDate });
  }

  public async findOnePeople(idPeople: number): Promise<People> {
    const people = await PeopleModel.findById(idPeople);
    if (!people) throw new Error(`Not found account with idAccount ${idPeople}`);
    return people;
  }
}

export default new PeopleService();
