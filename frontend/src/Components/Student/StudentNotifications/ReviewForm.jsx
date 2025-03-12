import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ notification, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      alert("⚠️ Please provide a rating and a comment.");
      return;
    }

    // ✅ Get Current Date & Time
    const reviewDate = new Date().toISOString(); // e.g., "2024-02-26T14:30:00.000Z"

    onSubmit({ 
      tutorId: notification.tutorId, 
      rating, 
      comment,
      date: reviewDate // ✅ Send Date to Backend
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-center">
          Leave a Review for <span className="text-teal-500">{notification.tutorName}</span>
        </h2>

        {/* ⭐ Dynamic Star Rating - Hover & Click Effect */}
        <div className="flex justify-center my-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer text-2xl transition-colors duration-150 ${
                num <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(num)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(num)}
            />
          ))}
        </div>

        {/* Review Text */}
        <textarea
          placeholder="Write your review here..."
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* ✅ Display Submission Date */}
        <p className="text-gray-500 text-sm mt-2">
          Review Date: {new Date().toLocaleDateString()} {/* e.g., "26/02/2024" */}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg transition hover:bg-gray-500 shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-5 py-2 rounded-lg transition hover:bg-teal-600 shadow-md"
          >
            Submit Review
          </button>
        </div>
      </motion.div>
    </div>
  );
};

ReviewForm.propTypes = {
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;