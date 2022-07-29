import express from 'express';
import generateResponse from '../global/index.js';
import { authenticateToken, authenticateTokenSalons } from '../middleware/auth.js';
import SalonModel from '../models/salon.js';

const salonRoute = express.Router();

salonRoute.get('/create', authenticateTokenSalons, async (req, res) => {
    res.status(200).json( generateResponse(200, 'User can add Salon', null));
});

salonRoute.post('/create', authenticateToken , async (req, res) => {
    const newSalon = new SalonModel({
        ...req.body,
        users: req.user._id,
    });
    const { name } = newSalon;
    const nameOfSalon = await SalonModel.findOne({ name });
    if (nameOfSalon) {
        return res.status(409).json( generateResponse(409, 'This name already exists', null) );
    }   

    await newSalon.save();
    res.status(201).json( generateResponse(201, 'new salon has been created', null));
});

salonRoute.get('/all', async (req, res) => {
    const allSalons = await SalonModel.find().populate('user').exec();
    res.status(200).json(generateResponse(200, null, allSalons));
});

salonRoute.get('/:salonId', async (req, res) => {
    const salon = await SalonModel.findById(req.params.salonId).populate('user').exec();
    res.status(200).json(generateResponse(200, null, salon));
});

salonRoute.get('/all/:userId', async (req, res) => {
    const usersSalons = await SalonModel.find( {"user": { _id: req.params.userId} }).populate('user').exec();
    res.status(200).json( generateResponse(200, null, usersSalons));
}); 



export default salonRoute;