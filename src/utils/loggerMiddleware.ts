import * as express from 'express';

const loggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction): void => {
  console.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();

  resp.on('finish', () => {
    const endrequest = new Date().getTime() - start;
    console.info(`method: ${req.method} path: ${req.originalUrl} statusCode: ${resp.statusCode} time: ${endrequest}ms`);
    next();
  });

  next();
};

export default loggerMiddleware;
