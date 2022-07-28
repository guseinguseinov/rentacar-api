import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: String,
    carNumber: String, // qeydiyyat nomresidi vobsem  90-AA-123
    brand: String,
    type: String, // sedan zad
    salon: {
        type: 'ObjectId',
        ref: "salons"
    }
}); 

const CarModel = mongoose.models('cars', carSchema);

export default CarModel;