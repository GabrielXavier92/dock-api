import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as swagger from 'swagger-ui-express';

import loggerMiddleware from '../utils/loggerMiddleware';

import swaggerConfig from '../config/swagger';

const application = (): void => {
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());

  // loggerMiddleware
  app.use(loggerMiddleware);

  app.use('/swagger', swagger.serve, swagger.setup(swaggerConfig));

  app.listen(3001, (err) => {
    if (err) throw (err);
    console.log('app is running');
  });
};

export default application;
