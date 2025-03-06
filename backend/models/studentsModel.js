import mongoose from 'mongoose';

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
    notification: { type: [String], default: [] },
    booking: { type: [String], default: [] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {    
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
