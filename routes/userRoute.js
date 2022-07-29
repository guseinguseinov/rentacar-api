import express from 'express';
import UserModel from '../models/user.js';
import { authenticateToken, generateAccessToken } from '../auth/index.js';
import generateResponse from '../global/index.js';

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

    const user = await UserModel.findOne({ email });
    if (!user || password !== user.password) {
        return res.status(401).json( generateResponse(401, 'Atuhentication Error', null) );
    }
    const token = generateAccessToken(user);
    return res.json( generateResponse(200, 'Access token generated', token));
});

userRoute.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        res.status(404).json( generateResponse(404, "Couldn't find a user", null) );
        return;
    }
    res.status(200).json( generateResponse(200, null, user) );
});




// userRoute.get('/test', authenticateToken , (req, res) => {
//     res.send('halaldi girdin bura');
//     // return generateResponse(200, true);
// });




export default userRoute;