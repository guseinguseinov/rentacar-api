import express from 'express';
import userRoute from './routes/userRoute.js';
import salonRoute from './routes/salonRoute.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
await mongoose.connect(DB_CONNECTION_STRING);

const app = express();
app.use(express.json());

app.use('/users', userRoute);
app.use('/salons', salonRoute);
export default app;