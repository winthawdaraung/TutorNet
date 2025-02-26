import { motion } from "framer-motion";
import PropTypes from "prop-types";

const NotificationPopup = ({ notification, onClose }) => {
  const isLink = (link) => /^(http|https):\/\//i.test(link);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Text as a header of the popup */}
        <h2 className="text-2xl font-semibold text-center">
          <span className="text-teal-500">Tutor&apos;s</span>{" "}
          <span className="text-teal-500">Response</span>
        </h2>

        {/* Tutor's Message */}
        <div className="mb-5 mt-4">
          <h3 className="text-gray-700 font-medium mb-1">Tutor&apos;s Message:</h3>
          <p className="text-gray-700 bg-gray-100 p-3 rounded-lg shadow-sm">
            {notification.reply || "No reply yet"}
          </p>
        </div>

        {/* Study Platform or Link */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium mb-1">Study Platform or Link:</h3>
          {notification.studyLink ? (
            isLink(notification.studyLink) ? (
              <a
                href={notification.studyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline break-all font-medium transition"
              >
                {notification.studyLink}
              </a>
            ) : (
              <p className="text-gray-700 bg-gray-100 p-3 rounded-lg shadow-sm whitespace-pre-line">
                {notification.studyLink}
              </p>
            )
          ) : (
            <p className="text-gray-500 italic">No link or platform provided</p>
          )}
        </div>

        {/* Styled Close Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-teal-500 text-white px-5 py-2 rounded-lg transition hover:bg-teal-600 shadow-md"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* Add PropTypes to fix ESLint warnings */
NotificationPopup.propTypes = {
  notification: PropTypes.shape({
    reply: PropTypes.string,
    studyLink: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationPopup;