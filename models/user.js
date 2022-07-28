import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    phone: String,
    password: String,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;