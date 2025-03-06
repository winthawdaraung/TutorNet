import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaUniversity, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex items-center bg-white p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
      }}
    >
      {/* ✅ Profile Image - Ensuring Rounded & Shadow Consistency */}
      <img 
        src={tutor.image} 
        alt={tutor.name} 
        className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm mr-6"
      />

      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
        <p className="text-gray-600">{tutor.subject}</p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <FaUniversity className="text-gray-500" /> {tutor.university}
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <FaBriefcase className="text-gray-500" /> Experience: {tutor.experience}
        </p>
        <p className="text-teal-500 font-semibold text-lg">฿{tutor.price} / hour</p>
      </div>

      {/* ✅ Updated Button for Theme Consistency */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="border border-teal-500 text-teal-500 px-5 py-2.5 text-md font-medium 
        rounded-xl transition-all duration-300 hover:bg-teal-500 hover:text-white" 
        onClick={() => navigate(`ResultTutors/${tutor.id}`)}
      >
        View Profile
      </motion.button>
    </motion.div>
  );
};

// ✅ PropTypes Validation
TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default TutorCard;