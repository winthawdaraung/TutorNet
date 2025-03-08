import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaUniversity, FaBriefcase, FaStar, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../../assets/tutor/defaultProfile.png";

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  // Get the first 3 subjects to display
  const displaySubjects = tutor.subjectsOffered
    ?.slice(0, 3)
    .map(s => s.subject)
    .join(", ");

  return (
    <motion.div
      className="flex items-center bg-white p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
      }}
    >
      {/* Profile Image */}
      <img 
        src={tutor.profileImageUrl || defaultProfile} 
        alt={tutor.fullName} 
        className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm mr-6"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = defaultProfile;
        }}
      />

      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900">{tutor.fullName}</h3>
        
        {/* Subjects */}
        <p className="text-gray-600 flex items-center gap-2">
          <FaBook className="text-gray-500" />
          {displaySubjects || "No subjects listed"}
          {tutor.subjectsOffered?.length > 3 && ` +${tutor.subjectsOffered.length - 3} more`}
        </p>

        {/* Institution */}
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <FaUniversity className="text-gray-500" /> {tutor.institution || "Institution not specified"}
        </p>

        {/* Experience */}
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <FaBriefcase className="text-gray-500" /> 
          Experience: {tutor.experience ? `${tutor.experience} years` : "Not specified"}
        </p>

        {/* Rating */}
        <p className="text-yellow-500 flex items-center gap-1 mt-1">
          <FaStar />
          <span className="font-semibold">{tutor.rating?.toFixed(1) || "New"}</span>
        </p>
      </div>

      {/* View Profile Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="border border-teal-500 text-teal-500 px-5 py-2.5 text-md font-medium 
        rounded-xl transition-all duration-300 hover:bg-teal-500 hover:text-white" 
        onClick={() => navigate(`/tutor-profile/${tutor.id}`)}
      >
        View Profile
      </motion.button>
    </motion.div>
  );
};

// Updated PropTypes to match backend data structure
TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    institution: PropTypes.string,
    profileImageUrl: PropTypes.string,
    subjectsOffered: PropTypes.arrayOf(
      PropTypes.shape({
        subject: PropTypes.string,
        topic: PropTypes.string
      })
    ),
    experience: PropTypes.number,
    rating: PropTypes.number,
    availability: PropTypes.array
  }).isRequired,
};

export default TutorCard;