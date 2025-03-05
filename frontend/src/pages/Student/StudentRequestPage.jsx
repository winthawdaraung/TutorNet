import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import studentProfileData from "../../mockData/Student/StudentProfileData";
import ThemedButton from "../../Components/Student/StudentRequest/ThemedButton";
import CustomDropdown from "../../Components/Student/StudentRequest/CustomDropdown";

const StudentRequestPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    tutorName: studentProfileData.fullName, 
    subject: studentProfileData.subjectsOffered.length ? studentProfileData.subjectsOffered[0].subject : "",
    message: "",
    time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message || !formData.time) {
      alert("⚠️ Please fill in all fields.");
      return;
    }
    console.log("✅ Request Sent:", formData);
    setIsSubmitting(true);

    setTimeout(() => {
      navigate("/student-view-tutor-profile", { replace: true });
    }, 1500);
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
              options={studentProfileData.subjectsOffered.map(subject => ({
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
              <label className="text-gray-700 font-medium">Preferred Time</label>
              <input 
                type="datetime-local" 
                name="time"
                value={formData.time} 
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5]"
                required
              />
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