import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <motion.div className="flex justify-center mt-10 space-x-2">
      {/* Previous Button */}
      <motion.button 
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))} 
        className="px-4 py-2 border rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={currentPage === 1}
        whileHover={{ scale: 1.05 }}
      >
        «
      </motion.button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, num) => (
        <motion.button 
          key={num + 1} 
          onClick={() => onPageChange(num + 1)} 
          className={`px-5 py-2 border rounded-full transition text-sm font-semibold shadow-sm ${currentPage === num + 1 ? "bg-[#00BFA5] text-white shadow-md" : "bg-white hover:bg-gray-100 text-gray-700"}`}
          whileHover={{ scale: 1.05 }}
        >
          {num + 1}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button 
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} 
        className="px-4 py-2 border rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={currentPage === totalPages}
        whileHover={{ scale: 1.05 }}
      >
        »
      </motion.button>
    </motion.div>
  );
};

// ✅ เพิ่ม propTypes เพื่อลด ESLint warning
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;