import { Request, Response } from 'express';

const handleMethodNotAllowed = (req: Request, res: Response) => {
  res.sendStatus(405);
};

export default handleMethodNotAllowed;
