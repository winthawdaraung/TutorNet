import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
// import studentProfileData from "../../mockData/Student/StudentProfileData";
import ThemedButton from "../../Components/Student/StudentRequest/ThemedButton";
import CustomDropdown from "../../Components/Student/StudentRequest/CustomDropdown";
import { getTutorProfile, createRequest } from "../../handle/student";
import { useParams } from "react-router-dom";

const StudentRequestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const MAX_WORD_COUNT = 150;
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

  // Added for word count tracking
  const [wordCount, setWordCount] = useState(0);
  const [wordCountError, setWordCountError] = useState(false);

  useEffect(() => {
      const fetchTutorData = async () => {
          try {
              const result = await getTutorProfile(id);
              if (result.success) {
                  setTutorData(result.tutor);
              } else {
                console.error(result.error || 'Failed to fetch tutor data');
              }
          } 
          catch (err) {
              console.error('Error:', err);
          };
        }

      fetchTutorData();
  }, [id]);

  console.log("Tutor Data", tutorData);

  

  const [formData, setFormData] = useState({
      tutorId: id,
      tutorName: "",
      subject: "",
      message: "",
      startDate: "",
      fromTime: "",
      toTime: ""
  });

  useEffect(() => {
      setFormData({
          tutorId: tutorData.id,
          tutorName: tutorData.fullName,
          subject: tutorData.subjectsOffered.length ? tutorData.subjectsOffered[0].subject : "",
          message: "",
          startDate: "",
          fromTime: "",
          toTime: ""
      });
  }, [tutorData]);

  console.log("Form Data", formData);

  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const calculateWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "message") {
      const words = calculateWordCount(value);
      setWordCount(words);
      
      // Prevent input if word count exceeds the limit
      if (words > MAX_WORD_COUNT) {
        // Show alert when word limit is exceeded
        if (!wordCountError) {
          alert(`⚠️ Your message exceeds the ${MAX_WORD_COUNT} word limit. Please shorten your text.`);
        }
        setWordCountError(true); // Set the error state
        return; // Stop further updates to the field
      }

      setWordCountError(false); // Clear the error state if within the limit
    }

    setFormData({ ...formData, [name]: value }); // Update form data
  };

  const getWordCountColor = () => {
    const ratio = wordCount / MAX_WORD_COUNT;
    if (ratio < 0.8) return "text-green-600";
    if (ratio < 1) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentWordCount = calculateWordCount(formData.message);

    if (currentWordCount > MAX_WORD_COUNT) {
      setWordCountError(true); 
      alert(`⚠️ Your message exceeds the ${MAX_WORD_COUNT} word limit. Please shorten it.`);
      return;
    }

    if (!formData.subject || !formData.message.trim() || !formData.startDate || !formData.fromTime || !formData.toTime) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    console.log("✅ Request Sent:", formData);
    createRequest(formData);
    alert("Request Sent!");
    setIsSubmitting(true);

    setTimeout(() => {
      navigate(`/tutor-profile/${id}`, { replace: true });
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} 
      className="min-h-screen flex flex-col bg-gray-50"
    >
      <StudentNavbar />
      {/* Form Container */}
      <div className="flex-grow flex justify-center items-center px-6 py-12 mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4 }} 
          className="bg-white shadow-lg rounded-xl border border-gray-200 px-10 py-8 w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Send a Request to Your <span className="text-[#00BFA5]">Tutor</span>
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Fill in the details to request a session.
          </p>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Tutor Name */}
            <div>
              <label className="text-gray-700 font-medium">Tutor Name</label>
              <input 
                type="text" 
                name="tutorName"
                value={formData.tutorName} 
                readOnly
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* Subject Dropdown Component */}
            <CustomDropdown 
              label="Subject" 
              name="subject"
              value={formData.subject} 
              onChange={handleChange}
              options={tutorData.subjectsOffered.map(subject => ({
                value: subject.subject, 
                label: `${subject.subject} - ${subject.topic}`
              }))}
            />

            {/* Message */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">Message</label>
              </div>
              <textarea 
                name="message"
                rows="4"
                value={formData.message} 
                onChange={handleChange}
                placeholder="Write a message..."
                className={`w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5] ${
                  wordCountError 
                    ? "border-red-500 focus:ring-red-500" 
                    : "focus:ring-[#00BFA5]"
                }`}
                required
              />
              {/* Word count display */}
              <div className={`mt-2 text-sm ${getWordCountColor()}`}>
                {wordCount}/{MAX_WORD_COUNT} words
              </div>
              {wordCountError && (
                <p className="text-red-500 text-sm mt-1">
                  Message exceeds the {MAX_WORD_COUNT} word limit.
                </p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="text-gray-700 font-medium block mb-2">Appointment Period</label>
              <div className="flex flex-wrap gap-2 items-center">
                {/* Start Date */}
                <div className="flex-1 min-w-[150px]">
                  <label className="text-gray-600 text-sm block mb-1">Date</label>
                  <input 
                    type="date" 
                    name="startDate"
                    value={formData.startDate} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
                    required
                  />
                </div>
                
                {/* From Time */}
                <div className="flex-1 min-w-[120px]">
                  <label className="text-gray-600 text-sm block mb-1">From</label>
                  <input 
                    type="time" 
                    name="fromTime"
                    value={formData.fromTime} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
                    required
                  />
                </div>
                
                {/* To Time */}
                <div className="flex-1 min-w-[120px]">
                  <label className="text-gray-600 text-sm block mb-1">To</label>
                  <input 
                    type="time" 
                    name="toTime"
                    value={formData.toTime} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ✅ Submit Button Component */}
            <div className="flex justify-center mt-6">
              <button
                onClick={isSubmitting}
                className={`px-6 py-3 text-lg rounded-lg transition  hover:bg-teal-600 shadow-md ${
                  isSubmitting || wordCountError || !formData.subject || !formData.message.trim() || !formData.startDate || !formData.fromTime || !formData.toTime
                    ? "bg-gray-400 cursor-not-allowed text-gray-700" // Disabled state: gray
                    : "bg-teal-500 hover:bg-teal-600 text-white" // Enabled state: green
                }`}
                disabled={isSubmitting || wordCountError || !formData.subject || !formData.message.trim() || !formData.startDate || !formData.fromTime || !formData.toTime}  
              >
                Send Request
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StudentRequestPage;