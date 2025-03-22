import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";  

const ReviewForm = ({ notification, onClose, onSubmit }) => {
  const MAX_WORD_COUNT = 100; //maximum word count for review
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [wordCountError, setWordCountError] = useState(false);

  // Calculate word count whenever comment changes
  useEffect(() => {
    const count = calculateWordCount(comment);
    setWordCount(count);
    setWordCountError(count > MAX_WORD_COUNT);
  }, [comment]);

  const calculateWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleCommentChange = (e) => {
    const newText = e.target.value;
    const newWordCount = calculateWordCount(newText);

    if (newWordCount > MAX_WORD_COUNT) {
      // Show alert when word limit is exceeded
      if (!wordCountError) {
          alert(`⚠️ Your review exceeds the ${MAX_WORD_COUNT} word limit. Please shorten your text.`);
      }
      setWordCountError(true); // Set error state to true
      return; // Prevent updating comment
    }

    // Update comment if within the limit
    setWordCountError(false); // Reset error state
    setComment(newText);
  };

  const getWordCountColor = () => {
    const ratio = wordCount / MAX_WORD_COUNT;
    if (ratio < 0.8) return "text-green-600";
    if (ratio < 1) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentWordCount = calculateWordCount(comment);

    if (currentWordCount > MAX_WORD_COUNT) {
      setWordCountError(true); // Set error state
      alert(`⚠️ Your review exceeds the ${MAX_WORD_COUNT} word limit. Please shorten it.`);
      return;
    }

    if (!rating) {
      alert("⚠️ Please provide a rating.");
      return;
    }

    if(!comment.trim()) {
      alert("⚠️ Please write a review.");
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

        {/* Review Text with wordscount */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700 font-medium">Your Review</label>
          </div>
        <textarea
          placeholder="Write your review here..."
          className={`w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5] ${
            wordCountError 
            ? "border-red-500 focus:ring-red-500" 
            : "focus:ring-[#00BFA5]"
          }`}
          rows="4"
          value={comment}
          onChange={handleCommentChange}
        />

        {/* <span className={`text-sm ${getWordCountColor()}`}>
          {wordCount}/{MAX_WORD_COUNT} words
        </span> */}
        {wordCountError && (
          <p className="text-red-500 text-sm mt-1">
            Review exceeds the {MAX_WORD_COUNT} word limit.
          </p>
        )}
        </div>

        {/* ✅ Display Submission Date and wordscount */}
        <div className="flex justify-between text-sm mt-2">
          <p className="text-gray-500 text-sm mt-2">
            Review Date: {new Date().toLocaleDateString()} {/* e.g., "26/02/2024" */}
          </p>
          <span className={`text-sm ${getWordCountColor()}`}>
            {wordCount}/{MAX_WORD_COUNT} words
          </span>
        </div>

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
            className={`px-5 py-2 rounded-lg transition hover:bg-teal-600 shadow-md ${
              wordCountError || !rating || !comment.trim() 
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600 text-white"
            }`}
            disabled={wordCountError || !rating || !comment.trim()}
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