import { useNavigate, useParams } from "react-router-dom";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { getTutorProfile, } from "../../handle/student";
import { getTutorReviews } from "../../handle/tutor";
import { useState, useEffect } from "react";

function StudentViewTutorPage() {  
  const navigate = useNavigate();
  const { id } = useParams();
  const [tutorData, setTutorData] = useState({
    fullName: '',
    institution: '',
    qualification: '',
    rating: 0,
    reviewsCount: 0,
    aboutMe: '',
    aboutMySession: '',
    cvDownload: '',
    availability: {},
    contactEmail: '',
    contactNumber: '',
    profileImageUrl: '',
    subjectsOffered: [],
    reviews: []
  });
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const result = await getTutorProfile(id);
        if (result.success) {
          setTutorData(result.tutor);
        } else {
          setError(result.error || 'Failed to fetch tutor data');
        }

        // Fetch reviews separately
        const reviewsResult = await getTutorReviews(id);
        if (reviewsResult.success) {
          setReviews(reviewsResult.data.reviews);
          setAverageRating(reviewsResult.data.averageRating);
          setReviewCount(reviewsResult.data.reviewCount);
        } else {
          console.error('Failed to fetch reviews:', reviewsResult.error);
        }
      } catch (err) {
        setError('Error fetching tutor data');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorData();
  }, [id]);

  const handleSendRequest = () => {
    navigate(`/student-request/${id}`, { replace: false });
    // StudentRequestPage(tutorData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <StudentNavbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <StudentNavbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">{error}</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 text-teal-500 hover:underline"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Star rating renderer with animation
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
            transition={{ duration: 0.3, delay: i * 0.1 }} // ✅ Each star appears sequentially
          >
            <FaStar className="text-yellow-500" />
          </motion.span>
        ))}
        
        {halfStar && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: fullStars * 0.1 }} // ✅ Half star fades in after full stars
          >
            <FaStarHalfAlt className="text-yellow-500" />
          </motion.span>
        )}

        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <motion.span 
            key={i + fullStars + 1} 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: (fullStars + (halfStar ? 1 : 0)) * 0.1 + i * 0.1 }} // ✅ Empty stars animate in sequence
          >
            <FaRegStar className="text-yellow-500" />
          </motion.span>
        ))}
      </div>
    );
  };

  // ✅ Function to render reviews
  const renderReviews = () => {
    return (
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} // ✅ Animates when scrolled into view
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }} // ✅ Triggers when 30% is visible
      >
        <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible" // ✅ Triggers children animations on scroll
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {reviews
            // .sort((a, b) => new Date(b.date) - new Date(a.date)) //Sort reviews by date, the latest first reviews
            // .slice(0,3) //only 3 first reviews
            .map((review) => (
              <motion.div
                key={review.id}
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
                whileHover={{ scale: 1.02, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }} // ✅ Slight hover effect
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {/* ✅ Review Header: Avatar + Name + Date */}
                <div className="flex items-center">
                  <img
                    src={review.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
  
                {/* ✅ Rating Stars */}
                <div className="flex items-center mt-2">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-gray-600 text-sm">{review.rating}/5</span>
                </div>
  
                {/* ✅ Review Comment */}
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </motion.div>
    );
  };

  // Function to render the availability table
  const renderAvailabilityTable = () => {
    console.log("Availability Data:", tutorData.availability); // ✅ Debugging Data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const timeSlots = [
      { key: "morning", label: "9-12 PM" },
      { key: "afternoon", label: "12-5 PM" },
      { key: "evening", label: "After 5 PM" },
    ];
  
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, amount: 0.3 }} // ✅ Animation triggers only once when 30% is visible
      >
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300"> {/* ✅ Added bottom border */}
            <motion.tr 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }} // ✅ Trigger when 30% is visible
            >
              <th className="p-2 border-r border-gray-300"></th>
              {timeSlots.map((slot) => (
                <th key={slot.key} className="p-2 border-r border-gray-300">{slot.label}</th>
              ))}
            </motion.tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <motion.tr 
                key={day} 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }} // ✅ Trigger per row
              >
                <td className="p-2 border-b border-gray-300 border-r capitalize">{day}</td>
                {timeSlots.map((slot) => (
                  <td key={slot.key} className="p-2 border-b border-gray-300 border-r">
                    {tutorData.availability?.[day.toLowerCase()]?.[slot.key] ? 
                      <motion.span 
                        className="text-teal-500 font-bold"
                        initial={{ scale: 0 }} 
                        whileInView={{ scale: 1 }} 
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        viewport={{ once: true, amount: 0.3 }} // ✅ Trigger per checkmark
                      >
                        ✓
                      </motion.span> 
                      : "-"}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  };

  // If profileImageUrl is empty, use a placeholder image
  const displayProfileImage = tutorData.profileImageUrl && tutorData.profileImageUrl.trim() ? tutorData.profileImageUrl : "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <StudentNavbar />

      {/* Content */}
      <div className="flex-grow flex justify-center pt-24 mb-16">
        <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-lg">
          {/* Profile Information */}
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <img src={displayProfileImage} alt="Student profile" className="w-32 h-32 object-cover rounded-full border border-gray-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{tutorData.fullName}</h1>
              <p className="text-gray-600">{tutorData.qualification}, {tutorData.institution}</p>
              <div className="flex items-center mt-2">
                <div className="mr-2">{renderStars(averageRating)}</div>
                <span className="text-gray-600 text-sm">({reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* About Me */}
          <motion.div 
            className="mb-6" // 🔹 Increased bottom margin for better spacing
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }} // ✅ Animation triggers when 30% is visible
          >
            <h2 className="text-xl font-semibold mb-2">About Me</h2> {/* 🔹 Added more bottom spacing */}
            <p className="text-gray-700 leading-relaxed">{tutorData.aboutMe}</p> {/* 🔹 Removed border & improved readability */}
          </motion.div>

          {/* About My Session */}
          <motion.div 
            className="mb-6" // 🔹 Increased bottom margin for better spacing
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }} // ✅ Animation triggers when 30% is visible
          >
            <h2 className="text-xl font-semibold mb-2">About My Session</h2> {/* 🔹 Added more bottom spacing */}
            <p className="text-gray-700 leading-relaxed">{tutorData.aboutMySession}</p> {/* 🔹 Removed border & improved readability */}
          </motion.div>

          {/* CV Section */}
          <motion.div 
            className="mb-6" // 🔹 Added more spacing for a cleaner layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }} // 🔹 Slight delay for a staggered effect
            viewport={{ once: true, amount: 0.3 }} // ✅ Animation triggers when 30% is visible
          >
            <h2 className="text-xl font-semibold mb-2">Curriculum Vitae</h2> {/* 🔹 Same styling as other sections */}
            {tutorData.cvDownload ? (
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }} // 🔹 Same fade-in as text
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* ✅ PDF Preview */}
                <iframe
                  src={tutorData.cvDownload}
                  className="w-full h-96 rounded-lg shadow-md" // 🔹 Removed border, added shadow for a sleek look
                  title="CV Preview"
                />
                
                {/* ✅ Download Button */}
                <motion.div 
                  className="mt-3 text-left" 
                  initial={{ opacity: 0, y: 10 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.4, delay: 0.6 }} 
                  viewport={{ once: true, amount: 0.3 }} // ✅ Button animation triggers when visible
                >
                  <a
                    href={tutorData.cvDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:underline font-semibold text-lg"
                  >
                    {/* Download Full CV (PDF) */}
                    View Full CV
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              <p className="text-gray-500">No CV uploaded</p>
            )}
          </motion.div> 

          {/* ✅ Ratings & Reviews Section */}
          {renderReviews()}
          
          {/* Subjects Offered */}
          <motion.div 
            className="mb-6" // 🔹 More spacing for better layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }} // ✅ Trigger animation when 30% is visible
          >
            <h2 className="text-xl font-semibold mb-2">Subjects Offered</h2> 

            <motion.table 
              className="table-auto w-full border border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <thead className="bg-gray-100"> {/* ✅ Removed unnecessary border class */}
                <motion.tr 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <th className="px-4 py-2 border-x border-gray-300"> Subject</th> {/* ✅ No bottom border */}
                  <th className="px-4 py-2 border-x border-gray-300">Topic</th>   {/* ✅ No bottom border */}
                </motion.tr>
              </thead>
              <tbody className="border-t border-gray-300"> {/* ✅ Added top border to keep table structure */}
                {tutorData.subjectsOffered.map((item, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }} // ✅ Rows animate one-by-one
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center"
                  >
                    <td className="border border-gray-300 px-4 py-2">{item.subject}</td> {/* ✅ Borders remain */}
                    <td className="border border-gray-300 px-4 py-2">{item.topic}</td> {/* ✅ Borders remain */}
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>

          {/* Availability Table */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }} // ✅ Triggers when 30% is visible
          >
            <h2 className="text-xl font-semibold mb-1">General Availability</h2>
            {renderAvailabilityTable()}
          </motion.div>
         

          {/* Contact Information */}
          <motion.div 
            className="mt-6 text-left"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true, amount: 0.3 }} // ✅ Triggers when 30% is visible
          >
            <p className="text-gray-800 font-semibold">
              Contact: <a href={`mailto:${tutorData.contactEmail}`} className="text-teal-500 hover:underline font-normal">{tutorData.contactEmail}</a>
            </p>
            <p className="text-gray-800 font-semibold mt-1">
              Phone: <span className="font-normal">{tutorData.contactNumber}</span>
            </p>
          </motion.div>

          {/* ✅ Send Request Button - Themed & Navigates */}
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true, amount: 0.3 }} 
          >
            <motion.button
              onClick={handleSendRequest} // ✅ Call the function properly
              className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition-all hover:bg-teal-600 hover:shadow-xl"
              whileHover={{ scale: 1.05 }} // ✅ Slight hover effect
              whileTap={{ scale: 0.95 }} // ✅ Slight shrink on click
              transition={{ type: "spring", stiffness: 200, damping: 10 }} 
            >
              Send request to study
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
export default StudentViewTutorPage;