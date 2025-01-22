import mongoose from 'mongoose';
import dotenv from 'dotenv';
import deleteOldAnonymous from './utils/deleteOldAnonymous.js';

dotenv.config();

const uri = `mongodb+srv://team:${process.env.MONGODB_PASSWORD}@cluster0.qfcqvtb.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase = (retryCount = 0) => {
  const maxRetries = 5;
  const retryDelay = Math.pow(2, retryCount) * 1000;
  if (retryCount > maxRetries) {
    console.error('Max connection retries exceeded.');
    return;
  }

  setTimeout(() => {
    mongoose.connect(uri, {})
      .then(() => {
        console.log('Connected to MongoDB Atlas');
      })
      .catch((error) => {
        console.error('Connection error:', error);
        connectToDatabase(retryCount + 1);
      });
  }, retryDelay);
};

connectToDatabase();

await deleteOldAnonymous();

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
  console.log(`Connection error ${err}`);
});

dbConnection.once('open', () => {
  console.log('Connected to DB!');
});

dbConnection.on('disconnected', () => {
  console.log('Disconnected from DB! Reconnecting...');
  connectToDatabase();
});

export default dbConnection;
