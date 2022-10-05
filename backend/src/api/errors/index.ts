import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('in error handler');
  console.error('[error]', err);
  if (err instanceof HttpException) {
    return res.status(err.status).json({ error: err.message });
  }

  next(err);
  return res.sendStatus(500);
};

export class HttpException extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default errorHandler;
