import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "tutor" },
    experience: { type: Number, required: true },
    subjects: { type: [String] },
    rating: { type: Number, default: 0 },
    reviews: { type: [String], default: [] },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    aboutSession: { type: String, default: "" },
    sessionsAvailable: { type: [String], default: [] },
    notification : { type: [String], default: [] },
    role: { type: String, default: "tutor" },
    booking: { type: [String], default: [] },
});

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;