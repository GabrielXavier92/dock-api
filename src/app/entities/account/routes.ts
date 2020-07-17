import { Router } from 'express';

import AccountController from './controller/AccountController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/account';

  // TODO GET /account busca conta  RETORNA CONTA

  // TODO POST /account/idAccont/block bloqueia conta  RETORNA CONTA

  routes.post(base, AccountController.createAccount);

  return routes;
};

export default accountRoutes;
