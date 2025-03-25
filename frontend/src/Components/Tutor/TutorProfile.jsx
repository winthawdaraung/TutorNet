import { useNavigate } from "react-router-dom";
// import tutorProfileDataMock from "../../mockData/TutorProfileData";
import defaultProfile from "../../assets/tutor/defaultProfile.png";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { getTutorProfile, getTutorReviews } from "../../handle/tutor";
import { useEffect, useState } from "react";

function TutorProfile() {
  const navigate = useNavigate();
  const [tutorProfileData, setTutorProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);  // State for reviews
  const [averageRating, setAverageRating] = useState(0); // State for average rating

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getTutorProfile();
        console.log("Profile response:", response);
        if (response.success) {
          setTutorProfileData(response.data);
          
          // Only try to fetch reviews if we have a valid tutorId
          const tutorId = response.data?._id;
          console.log("Tutor ID for reviews:", tutorId);
          if (tutorId) {
            try {
              const responseReviews = await getTutorReviews(tutorId);
              console.log("Reviews response:", responseReviews); // Debug log
              if (responseReviews.success && responseReviews.data) {
                console.log("Setting reviews:", responseReviews.data.reviews);
                setReviews(responseReviews.data.reviews || []);
                setAverageRating(responseReviews.data.averageRating || 0);
              } else {
                console.error("Failed to fetch reviews:", responseReviews.error);
              }
            } catch (reviewError) {
              console.error("Error fetching tutor reviews:", reviewError);
            }
          } else {
            console.error("Tutor ID is not available.");
          }
        } else {
          console.error("Failed to fetch tutor profile:", response.error);
          setTutorProfileData(null);
        }
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        setTutorProfileData(null);
      }
    };

    fetchProfile();
  }, []);

  if (!tutorProfileData) {
    // return <div>Loading...</div>;
    return <div>No Data Found</div>
  }
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const {
    fullName,
    institution,
    qualification,
    // rating,
    // reviewsCount,
    aboutMe,
    aboutMySession,
    cv,
    availability,
    contactEmail,
    contactNumber,
    profileImageUrl,
    subjectsOffered,
    priceRate, // New property
  } = tutorProfileData;

  // Navigate to edit profile page when clicking the button
  const handleEditProfile = () => {
    navigate("/tutor/edit-profile");
    window.scrollTo(0, 0); // เลื่อนขึ้นบนสุดของหน้า
  };

  // Star rating renderer with animation
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
      
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <motion.span 
            key={i} 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: i * 0.1 }} // Each star appears sequentially
          >
            <FaStar className="text-yellow-500" />
          </motion.span>
        ))}
          
        {halfStar && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: fullStars * 0.1 }} // Half star fades in after full stars
          >
            <FaStarHalfAlt className="text-yellow-500" />
          </motion.span>
        )}
  
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <motion.span 
            key={i + fullStars + 1} 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: (fullStars + (halfStar ? 1 : 0)) * 0.1 + i * 0.1 }} // Empty stars animate in sequence
          >
            <FaRegStar className="text-yellow-500" />
          </motion.span>
        ))}
      </div>
    );
  };

  // Function to render the availability table
  const renderAvailabilityTable = () => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const timeSlots = [
      { key: "morning", label: "9-12 AM" },
      { key: "afternoon", label: "1-5 PM" },
      { key: "evening", label: "After 5 PM" },
    ];

    return (
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-r border-gray-300"></th>
            {timeSlots.map((slot) => (
              <th key={slot.key} className="p-2 border-r border-gray-300">
                {slot.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="text-center">
              <td className="p-2 border-b border-gray-300 border-r capitalize">
                {day}
              </td>
              {timeSlots.map((slot) => (
                <td
                  key={slot.key}
                  className="p-2 border-b border-gray-300 border-r"
                >
                  {availability[day][slot.key] ? (
                    <span className="text-teal-500 font-bold">✓</span>
                  ) : (
                    "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // If profileImageUrl is empty, use the default profile image
  const displayProfileImage = profileImageUrl
    ? profileImageUrl
    : defaultProfile

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body">
          {/* Top Section with Image and Basic Info */}
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <img
                src={displayProfileImage}
                alt="Tutor profile"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <p className="text-gray-600">
                {qualification}, {institution}
              </p>
              <div className="flex items-center mt-2">
                <div className="mr-2">{renderStars(averageRating)}</div>
                <span className="text-gray-600 text-sm">
                  ({reviews.length} reviews)
                </span>
              </div>
              <div className="mt-2">
                <p className="text-teal-500 font-bold text-xl">
                  {priceRate}฿ per hour
                </p>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">About me</h2>
            <p className="text-gray-700">{aboutMe}</p>
          </div>
          {/* Reviews Section */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              <div>
                {reviews
                // .slice(-3)
                .map((review, index) => (
                  <div key={index} className="border-b py-2">
                    <div className="flex items-center">
                      <span className="font-bold">
                        {review.studentId && review.studentId.fullName ? review.studentId.fullName : "Anonymous"}
                      </span>
                      <div className="ml-2">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* About My Session */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">About my session</h2>
            <p className="text-gray-700">{aboutMySession}</p>
          </div>

          {/* CV Section */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">CV</h2>
            {cv ? (
              <img
                src={cv}
                alt="Tutor CV"
                className="max-w-full h-auto border border-gray-300"
              />
            ) : (
              <p>No CV uploaded</p>
            )}
          </div>

          {/* Subjects Offered */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Subjects Offered</h2>
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Subject</th>
                  <th className="px-4 py-2 border border-gray-300">Topic</th>
                </tr>
              </thead>
              <tbody>
                {subjectsOffered.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.subject}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.topic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Availability Table */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">General Availability</h2>
            {renderAvailabilityTable()}
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <p>
              <strong>Contact:</strong> {contactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {contactNumber}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6">
            <button
              onClick={handleEditProfile}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
            >
              Edit my profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;