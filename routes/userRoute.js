import express from 'express';
import UserModel from '../models/user.js';
import { authenticateToken, generateAccessToken } from '../middleware/auth.js';
import generateResponse from '../global/index.js';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        res.status(409).json( generateResponse(409, "User email already in use", null));
        return;
    }
    
    const newUser = UserModel(req.body);
    await newUser.save();

    res.status(201).json( generateResponse(201, 'Created new user', null) );
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = crypto
        .pbkdf2Sync(password, process.env.SALT_SECRET, 100000, 64, 'sha512')
        .toString('hex');

    const user = await UserModel.findOne({ email, password: hashedPassword });

    if(user) {
        const { password , ...restData} = user.toObject();
        const token = generateAccessToken(restData);
        return res.json( generateResponse(200, 'Access token generated', token));
    }

    return res.status(401).json( generateResponse(401, 'Atuhentication Error', null) ); 
});

userRoute.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
        res.status(404).json( generateResponse(404, "Couldn't find a user", null) );
        return;
    }
    const { password, ...restData} = user.toObject();
    res.status(200).json( generateResponse(200, null, restData) );
});




// userRoute.get('/test', authenticateToken , (req, res) => {
//     res.send('halaldi girdin bura');
//     // return generateResponse(200, true);
// });




export default userRoute;