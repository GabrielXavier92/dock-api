import * as express from 'express';

const defaultErrorsMiddleware = (err: express.ErrorRequestHandler, _: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: 'Invalid JSON' });
};

export default defaultErrorsMiddleware;
