import * as express from 'express';
import * as cors from 'cors';
import * as swagger from 'swagger-ui-express';
import swaggerConfig from '../config/swagger';

const application = (): void => {
  const app = express();
  app.use(cors());

  app.get('/', (_, res) => res.send('hello world'));

  app.use('/swagger', swagger.serve, swagger.setup(swaggerConfig));

  app.listen(3001, (err) => {
    if (err) throw (err);
    console.log('app is running');
  });
};

export default application;
