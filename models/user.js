import mongoose from "mongoose";
import crypto from 'crypto';
import { config } from "dotenv";

config();

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: {
        type: Date, 
        trim: true,
        required:true,
    },  
    email: {
        type: String,
        unique: true,
        trim: true,
        required:true,
    },
    phone: String,
    password: {
        type: String,
        trim: true,
        required: true,
        // validate: [(val) => {}], bele yoxlamaq olur 
    },
    role: {
        type: String,
        enum: ["user", "salon"],
        default: "user"
    },
}, {
    timestamps: true,
});

userSchema.pre('save', function(next){
    this.password = crypto
        .pbkdf2Sync(this.password, process.env.SALT_SECRET, 100000, 64, 'sha512')
        .toString('hex');
    next();
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;