import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ThemedButton = ({ isSubmitting, text }) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      type="submit" 
      className="w-full bg-[#00BFA5] text-white py-3 rounded-lg shadow-md hover:bg-[#009e88] transition font-semibold"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex justify-center items-center">
          {text}
          <span className="dot-animation">.</span>
          <span className="dot-animation delay-200">.</span>
          <span className="dot-animation delay-400">.</span>
        </span>
      ) : (
        text
      )}
    </motion.button>
  );
};

ThemedButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default ThemedButton;