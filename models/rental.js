import mongoose, { mongo } from 'mongoose';

const rentalSchema = new mongoose.Schema({
    user: {
        type: "ObjectId",
        ref: "users",
    },
    cars: {
        type: "ObjectId",
        ref: "cars",
    },
    expDate: {
        type: Date,
        default: Date.now() + 1000 * 60 * 60 * 24,
    },
    rentDate: {
        type: Date,
        default: Date.now(),
    }
});

const RentalModel = mongoose.model('rentals', rentalSchema);

export default RentalModel;