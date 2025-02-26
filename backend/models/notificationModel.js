import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, default: 'unread' }, // unread, read
    }
    , 
    { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;