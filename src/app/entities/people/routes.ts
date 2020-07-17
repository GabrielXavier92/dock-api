import { Router } from 'express';

import PeopleController from './controller/peopleController';

const routes = Router();

const peopleRoutes = (): Router => {
  const base = '/people';

  routes.post(base, PeopleController.createPeopple);

  return routes;
};

export default peopleRoutes;
