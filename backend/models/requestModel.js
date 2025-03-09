import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    studentId: { type: String, required: true, trim: true },
    tutorId: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    studentmessage: { type: String, trim: true },
    tutormessgae: {type: String, trim: true},
    status: { type: String, default: 'pending' }, // pending, confirmed, completed, canceled
}
    , 
    {
        timestamps: true
    }
);

const Requests = mongoose.model('Requests', requestSchema);
export default Requests;