import { Router } from 'express';

import TransactionController from './controller/transactionController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/account';

  routes.post(`${base}/:idAccount/deposit`, TransactionController.deposit);

  return routes;
};

export default accountRoutes;
