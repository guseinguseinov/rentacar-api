import mongoose from "mongoose";

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

const UserModel = mongoose.model('users', userSchema);

export default UserModel;