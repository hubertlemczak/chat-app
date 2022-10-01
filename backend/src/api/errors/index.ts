import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('in error handler');
  console.error('[error]', err);
  next();
};

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default errorHandler;
