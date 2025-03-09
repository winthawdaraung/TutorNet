import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    studentId: { type: String, required: true, trim: true },
    tutorId: { type: String, required: true, trim: true },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    bookingDuration: { type: Number, required: true },
    subject: { type: String, required: true, trim: true },
    comment: { type: String, trim: true },
    status: { type: String, default: 'pending' }, // pending, confirmed, completed, canceled
}
    , 
    {
        timestamps: true
    });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;