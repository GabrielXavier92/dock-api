import { Request, Response } from 'express';

export interface People {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
}

export interface PeopleInput {
  name: string;
  cpf: string;
  birthDate: string;
}

export interface PeopleService {
  create: (people: PeopleInput) => People;
}

export interface InterfacePeopleController {
  createPeopple: (req: Request, res: Response) => void;
}

export interface InterfacePeopleService {
  createPeople: (people: PeopleInput) => Promise<People>;
}

export interface InterfacePeopleModel {
  create: (people: PeopleInput) => People;
}
