import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isConnectedToMongo = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/haroons_interiors';
  
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick detection if Mongo isn't running locally
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Connected Successfully: ${uri}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[Database] MongoDB connection failed (${error.message}). Using Resilient Embedded JSON Storage Engine.`);
  }
};

export const isMongoActive = () => isConnectedToMongo;
