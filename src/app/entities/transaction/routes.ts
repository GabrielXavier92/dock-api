import { Router } from 'express';

import TransactionController from './controller/transactionController';

const routes = Router();

const accountRoutes = (): Router => {
  const base = '/payment';

  routes.post(`${base}/:idAccount/deposit`, TransactionController.deposit);
  routes.post(`${base}/:idAccount/withdraw`, TransactionController.withdraw);
  routes.get(`${base}/:idAccount`, TransactionController.extract);

  return routes;
};

export default accountRoutes;
