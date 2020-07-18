import { Router } from 'express';

import PeopleController from './controller/peopleController';

const routes = Router();

const peopleRoutes = (): Router => {
  const base = '/people';

  routes.post(base, PeopleController.createPeopple);
  routes.get(`${base}/:idPeople`, PeopleController.getPeople);

  return routes;
};

export default peopleRoutes;
