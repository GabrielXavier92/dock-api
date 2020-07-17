import { People, PeopleInput, InterfacePeopleModel } from '../people.interface';

class PeopleModel implements InterfacePeopleModel {
  public create({ name, birthDate, cpf }: PeopleInput): People {
    // insere no bacno
    const createdPeople: People = {
      idPeople: 1234, name, cpf, birthDate,
    };

    return createdPeople;
  }
}

export default new PeopleModel();
