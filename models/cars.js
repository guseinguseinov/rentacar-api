import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    carNumber: {
        type:String,
        unique: true,
        trim: true,
        required: true,
    }, // qeydiyyat nomresidi vobsem  90-AA-123
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
    },
    type: {
        type: String,
        trim: true,
        enum: ['sedan', 'boyuk', 'nese'],
        required:true,
    }, // sedan zad
    salon: {
        type: 'ObjectId',
        ref: "users",
        required: true,
    }
}, {
    timestamps: true,
}); 

const CarModel = mongoose.models('cars', carSchema);

export default CarModel;