import { motion } from "framer-motion";
import PropTypes from "prop-types";

const NotificationCard = ({ notification, onLeaveReview, onViewResponse }) => {
  console.log("In notification card: ", notification);
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center 
                 shadow-md hover:shadow-lg transition-shadow duration-300 min-h-44"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ รูปภาพ - อยู่ตรงกลางในแนวแกน Y */}
      <img
        src={notification.tutorImage || "https://via.placeholder.com/128"}
        alt="Tutor"
        className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
      />

      {/* ✅ ข้อความ - จัดให้อยู่ตรงกลางกับรูปภาพ */}
      <div className="flex flex-col flex-grow ml-6 h-full justify-center">
        <div>
          <p className="mb-1">
            <strong className="text-gray-800">Tutor Name:</strong> {notification.tutorName}
          </p>
          <p className="mb-1">
            <strong className="text-gray-800">Subject:</strong> {notification.subject}
          </p>
          <p className="mb-1">
            <strong className="text-gray-800">Date:</strong> {notification.date}
          </p>
          <p className="mb-4">
            <strong className="text-gray-800">Time:</strong> {notification.time}
          </p>
        </div>
      </div>

      {/* ✅ ปุ่มอยู่ขวาสุดของการ์ดและอยู่ล่างสุดเสมอ (ไม่เปลี่ยนแปลง) */}
      <div className="flex justify-end gap-4 mt-auto">
        <button
          onClick={() => onLeaveReview(notification)}
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-sm transition hover:bg-yellow-600 hover:shadow-md"
        >
          Leave a Review
        </button>
        <button
          onClick={() => onViewResponse(notification)}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg shadow-sm transition hover:bg-teal-600 hover:shadow-md"
        >
          View Tutor&apos;s Response
        </button>
      </div>
    </motion.div>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    tutorImage: PropTypes.string,
    tutorName: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  onLeaveReview: PropTypes.func.isRequired,
  onViewResponse: PropTypes.func.isRequired,
};

export default NotificationCard;