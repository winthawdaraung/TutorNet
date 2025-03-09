import mongoose from "mongoose";
import { notificationSchema } from "./notificationModel.js";

const reviewSchema = new mongoose.Schema({
  tutorId: { type: String, required: true },
  studentId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true, default: ''}
});

const availabilitySchema = new mongoose.Schema({
  mon: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  tue: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  wed: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  thu: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  fri: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  sat: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  sun: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  }
});

const bookingSchema = new mongoose.Schema({
    studentId: { type: String, required: true, trim: true },
    tutorId: { type: String, required: true, trim: true },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    //bookingDuration: { type: Number, required: true },
    subject: { type: String, required: true, trim: true },
    comment: { type: String, trim: true },
    status: { type: String, default: 'pending' }, // pending, confirmed, completed, canceled
}, {timestamps: true});

const tutorSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "tutor" },
    institution: { type: String, required: true, trim: true },
    qualification: { type: String, default: "" },
    experience: { type: Number, required: true },
    subjectsOffered: [subjectSchema],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    profileImageUrl: { type: String },
    aboutMe: { type: String, default: "" },
    aboutMySession: { type: String, default: "" },
    cv: { type: String, default: "" },
    availability: { type: availabilitySchema, default: () => ({}) },
    priceRate: { type: Number, default: 0 },
    contactEmail: { type: String, default: function() { return this.email; } },
    contactNumber: { type: String, default: "" },
    notifications: [notificationSchema],
    reviews: [reviewSchema],
    requests: [bookingSchema],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, { timestamps: true });

// Add any pre-save hooks or methods here if needed
tutorSchema.pre('save', async function(next) {
    if (this.isModified('reviews')) {
        // Update rating when reviews change
        if (this.reviews.length > 0) {
            const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
            this.rating = totalRating / this.reviews.length;
            this.reviewsCount = this.reviews.length;
        }
    }
    next();
});

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;