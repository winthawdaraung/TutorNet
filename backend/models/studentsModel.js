import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    tutorName: { type: String, required: true },
    tutorImage: { type: String, required: true },
    message: { type: String, default: "" },
    subject: { type: String, required: true },
    date: { type: String, required: true }, // Kept as String since it's in DD/MM/YYYY format
    time: { type: String, required: true },
    reply: { type: String, required: true },
    studyLink: { type: String, required: true },
    status: { type: String, default: 'unread' }
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
    fullName: { type: String,required: true,trim: true, },
    email: { type: String, required: true, unique: true, trim: true, },
    password: { type: String, required: true, trim: true, },
    studentId: { type: String, required: true, trim: true, },
    year: { type: Number, required: true, },
    institution: { type: String, required: true, trim: true, },
    department: { type: String, trim: true, default: null},
    role: { type: String, default: "student" },
    profileImageUrl: { type: String, default: "" },
    notification: { type: [notificationSchema], default: [] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {    
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
