import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../exceptions/CustomError';
// import Logger from "../../lib/logger";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Sorry! Something went wrong';

  // Logger.error(`${status}: ${message}`);
  return res.status(status).json({
    status,
    message
  });
  next();
};

export default errorHandler;
