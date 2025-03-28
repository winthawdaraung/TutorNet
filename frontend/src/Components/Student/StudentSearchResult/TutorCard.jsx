import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaUniversity, FaBriefcase, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TutorCard = ({ tutor }) => {
  console.log(tutor);
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

        {/*Display Rating and Review Count */}
        <p className="text-gray-700 flex items-center gap-1 mt-1">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{tutor.rating || "N/A"}</span>
          <span className="text-gray-500">({tutor.reviewsCount || 0} reviews)</span>
        </p>

        <p className="text-teal-500 font-semibold text-lg">฿{tutor.price} / hour</p>
      </div>

      {/* ✅ Updated Button for Theme Consistency */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="border border-teal-500 text-teal-500 px-5 py-2.5 text-md font-medium 
        rounded-xl transition-all duration-300 hover:bg-teal-500 hover:text-white" 
        onClick={() => tutor.id && navigate(`/tutor-profile/${tutor.id}`)}
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
    rating: PropTypes.number, //adding rating
    reviewsCount: PropTypes.number, //adding reviewscount
  }).isRequired,
};

export default TutorCard;