import mongoose from "mongoose";

export const notificationSchema = new mongoose.Schema({
    // userId: { type: String, required: true, trim: true },
    // message: { type: String, required: true, trim: true },
    requestId: { type: String, required: true, trim: true },
    status: { type: String, default: 'unread' }, // unread, read
    }
    , 
    { timestamps: true });

// const Notification = mongoose.model('Notification', notificationSchema);
// export default Notification;