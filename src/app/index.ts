import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as swagger from 'swagger-ui-express';

import peopleRoutes from './entities/people/routes'
import loggerMiddleware from '../utils/loggerMiddleware';
import swaggerConfig from '../config/swagger';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.applyMiddlewares();
    this.createRoutes()
  }

  private applyMiddlewares(): void {
    this.app.use(cors());
    this.app.use(bodyparser.json());

    this.app.use(loggerMiddleware);
  }

  private createRoutes(): void {
    this.app.use('/swagger', swagger.serve);
    this.app.get('/swagger', swagger.setup(swaggerConfig));

    this.app.use(peopleRoutes())
  }
}

export default new App()
