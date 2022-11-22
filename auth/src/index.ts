import express, { Request, Response } from 'express';

const app = express();
const { PORT } = process.env;

app.get('*', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to auth Servcie'
  });
});

app.listen(PORT || 3000, () => {
  console.log(`Server running on Port ${PORT}`);
});
