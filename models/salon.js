import mongoose from 'mongoose';

const salonSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
        unique: true,
    },
    createdBy: {
        type: "ObjectId",
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
});

const SalonModel = mongoose.model('salons', salonSchema);

export default SalonModel;