import mongoose from 'mongoose';
import Logger from '../../lib/logger';

let database: mongoose.Connection;

export const connectDB = () => {
  if (database) {
    return;
  }

  mongoose.connect(`${process.env.DATABASE_URI}`, {
    maxPoolSize: 10
  });

  database = mongoose.connection;
  database.on('connected', () => {
    Logger.info('Database Connected Successfully');
  });

  database.on('error', () => {
    Logger.error('Error Connecting to database');
  });
};

export const disconnectDB = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
