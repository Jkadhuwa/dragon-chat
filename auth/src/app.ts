import express, { NextFunction, Request, Response } from 'express';
// import cors from 'cors';
import { signupRouter } from './routes';

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/welcome', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to auth Servcie'
  });
});

export const SIGNUP_ROUTE = '/api/v1/auth/signup';

app.use(SIGNUP_ROUTE, signupRouter);

export default app;
