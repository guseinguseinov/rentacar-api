import mongoose, { mongo } from 'mongoose';

const autoSalonSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    password: String,
    cars: {
        type: "ObjectId",
        ref: "cars",
    }
});

const AutoSalonModel = mongoose.model('salons', autoSalonSchema);

export default AutoSalonModel;