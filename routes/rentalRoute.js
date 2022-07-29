import express from 'express';
import generateResponse from '../global/index.js';
import { authenticateToken } from '../middleware/auth.js';
import RentalModel from '../models/rental.js';

const rentRoute = express.Router();

rentRoute.post('/rentacar', authenticateToken, async(req, res) => {
    const newRent = new RentalModel({
        user: req.headers.user,
        car: req.headers.car
    });
    
    await newRent.save();
    res.status(201).json( generateResponse(201, 'new rent has been created', null));
}); 

export default rentRoute;
