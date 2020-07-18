import { Router } from 'express';

import AccountController from './controller/accountController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/account';

  // TODO GET /account busca conta  RETORNA CONTA

  routes.post(base, AccountController.createAccount);
  routes.post(`${base}/:idAccount/block`, AccountController.blockAccount);
  routes.get(`${base}/:idAccount`, AccountController.getAccount);

  return routes;
};

export default accountRoutes;
