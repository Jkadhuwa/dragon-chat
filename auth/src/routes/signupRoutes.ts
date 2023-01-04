import { Router, Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import signupSchema from '../schemas/signup-validation.schema';
import handleMethodNotAllowed from '../utils';

import createUser from '../controllers/signup.controller';

const signupRouter = Router();

signupRouter.post(
  '/',
  checkSchema(signupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    return createUser(req.body, res, next);
  }
);

signupRouter.options('/', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.sendStatus(200);
});

signupRouter.get('/', handleMethodNotAllowed);
signupRouter.put('/', handleMethodNotAllowed);
signupRouter.patch('/', handleMethodNotAllowed);
signupRouter.delete('/', handleMethodNotAllowed);

// signupRouter.all('/', (req: Request, res: Response) =>
//   res.status(405).json({})
// );

export default signupRouter;
