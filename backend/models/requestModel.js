import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    studentId: { type: String, required: true, trim: true },
    tutorId: { type: String, required: true, trim: true },
    requestDate: { type: Date, required: true },
    requestTime: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: { type: String, default: 'pending' }, // pending, confirmed, completed, canceled
}
    , 
    {
        timestamps: true
    });

const Booking = mongoose.model('Booking', requestSchema);
export default Booking;