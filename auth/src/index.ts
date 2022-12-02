import * as dotenv from 'dotenv';
import app from './app';
import Logger from '../lib/logger';
import { connectDB } from './database';

dotenv.config();
const { PORT } = process.env;

connectDB();

app.listen(PORT || 3000, () => {
  Logger.info(`Server running on Port ${PORT}`);
});
