import express from "express";
import generateResponse from "../global/index.js";
import { authenticateTokenSalons, authenticateToken } from "../middleware/auth.js";
import CarModel from "../models/cars.js";

const carRoute = express.Router();

carRoute.get('/', (req, res) => {

    res.status(200).json( generateResponse(200, null, data));
});

carRoute.get('/add', authenticateTokenSalons ,(req, res) => {
    res.status(200).json( generateResponse(200, 'User can add car', null));
});

carRoute.post('/add', authenticateToken , async(req, res) => {
    console.log(req.body);
    const newCar = new CarModel(req.body);

    const { carNumber } = newCar;
    const numberOfCar = await CarModel.findOne({ carNumber });
    if (numberOfCar) {
        return res.status(409).json( generateResponse(409, "car number is in use", null));
    }

    await newCar.save();
    res.status(201).json( generateResponse(201, 'new car has been added to the salon', null));
});

carRoute.get('/all', async (req, res) => {
    const allCars = await CarModel.find().populate('salon').exec();
    res.status(200).json( generateResponse(200, null, allCars));
});

carRoute.get('/:carId', async (req, res) => {
    const car = await CarModel.findById(req.params.carId).populate('salon').exec();
    res.status(200).json( generateResponse(200, null, car));
});

carRoute.get('/all/:salonId', async (req, res) => {
    const salonCars = await CarModel.find( { salon: { _id: req.params.salonId } } ).populate('salon').exec();
    res.status(200).json( generateResponse(200, null, salonCars));
});

export default carRoute;