import express from 'express';
import UserModel from '../models/user.js';
import { authenticateToken, generateAccessToken } from '../auth/index.js';


const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
    const { email } = req.body;
    const usser = await UserModel.findOne({ email });
    if (user) {
        res.status(409).send({
            message: "User email exists",
        });
        return;
    }
    
    const newUser = UserModel(req.body);
    await newUser.save();

    res.status(201).send('ok');
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || password !== user.password) {
        return res.status(401).send('girmedi');
    }
    console.log(user);
    const token = generateAccessToken(user);
    return res.send(token);
});



userRoute.get('/test', authenticateToken , (req, res) => {
    res.send('halaldi girdin bura');
    // return generateResponse(200, true);
});

export default userRoute;