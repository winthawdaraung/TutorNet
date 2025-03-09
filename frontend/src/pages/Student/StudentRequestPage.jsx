import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
// import studentProfileData from "../../mockData/Student/StudentProfileData";
import ThemedButton from "../../Components/Student/StudentRequest/ThemedButton";
import CustomDropdown from "../../Components/Student/StudentRequest/CustomDropdown";
import { getTutorProfile, sendBookingRequest } from "../../handle/student";
import { useParams } from "react-router-dom";

const StudentRequestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const navigate = useNavigate();
  const { id } = useParams();
  //const[message, setMessage] = useState("");
  //const[selectedTime, setSelectedTime] = useState("");
  const[isSubmitting, setIsSubmitting] = useState(false);
  const[error, setError] = useState(null);
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

  //form data to handle all state
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
      const fetchTutorData = async () => {
          try {
              const result = await getTutorProfile(id);
              if (result.success) {
                  setTutorData(result.tutor);
                  setFormData({
                    tutorId: result.tutor.id,
                    tutorName: result.tutor.fullName,
                    subject: result.tutor.subjectsOffered.length ? result.tutor.subjectsOffered[0].subject : "",
                    message: "",
                    startDate: "",
                    fromTime: "",
                    toTime: ""
                  });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check form data before submission
    console.log(formData)

    if (!formData.subject || !formData.message || !formData.startDate || !formData.fromTime || !formData.toTime) {
        alert("⚠️ Please fill in all fields.");
        return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
        const result = await sendBookingRequest({
          tutorId: formData.tutorId,
          tutorName: formData.tutorName,
          subject: formData.subject,
          message: formData.message,
          startDate: formData.startDate,
          fromTime: formData.fromTime,
          toTime: formData.toTime
        });

        if (result.success) {
            alert("Booking request sent successfully!");
            navigate(`/tutor-profile/${id}`, { replace: true });
        } else {
            setError(result.error || "Failed to send request.");
        }
    } catch (err) {
        setError("Error sending request.");
        console.error("Error:", err);
    } finally {
        setIsSubmitting(false);
    }
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
              <label className="text-gray-700 font-medium">Message</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message} 
                onChange={handleChange}
                placeholder="Write a message..."
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
                required
              />
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
            <ThemedButton isSubmitting={isSubmitting} text="Send Request" />
          </form>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StudentRequestPage;