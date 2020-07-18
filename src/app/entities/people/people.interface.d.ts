import { Request, Response } from 'express';

export interface People {
  idPeople: number;
  name: string;
  cpf: string;
  birthDate: string;
}

export interface PeopleInput {
  name: string;
  cpf: string;
  birthDate: string;
}

export interface InterfacePeopleController {
  createPeopple: (req: Request, res: Response) => Promise<void>;
  getPeople: (req: Request, res: Response) => Promise<void>;
}

export interface InterfacePeopleService {
  createPeople: (people: PeopleInput) => Promise<People>;
  findOnePeople: (id: number) => Promise<People>;
}

export interface InterfacePeopleModel {
  create: (people: PeopleInput) => Promise<People>;
  findById: (id: number) => Promise<People>;
}
