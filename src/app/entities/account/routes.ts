import { Router } from 'express';

import AccountController from './controller/AccountController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/account';

  // TODO GET /account busca conta  RETORNA CONTA

  routes.post(base, AccountController.createAccount);
  routes.post(`${base}/:idAccount/block`, AccountController.blockAccount);

  return routes;
};

export default accountRoutes;
