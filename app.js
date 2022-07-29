import express from 'express';
import userRoute from './routes/userRoute.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
await mongoose.connect(DB_CONNECTION_STRING);

const app = express();
app.use(express.json());

app.use('/users', userRoute);

export default app;