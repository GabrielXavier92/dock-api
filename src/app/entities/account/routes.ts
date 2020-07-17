import { Router } from 'express';

import PeopleController from './controller/peopleController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/account';

  routes.post(base, PeopleController.createPeopple);

  return routes;
};

export default accountRoutes;
