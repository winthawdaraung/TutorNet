import { useState } from "react";
import { FaSearch, FaBookOpen, FaGlobe, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaIdCard, FaChevronDown } from "react-icons/fa";
import { registerStudent } from "../../handle/student";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";

const StudentSearchPage = () => {
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectYear = (year) => {
    setFormData({ ...formData, year });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setShowAlert(true); // ✅ เปิด Alert Modal ถ้าไม่ได้ติ๊ก Terms & Conditions
      return;
    }
    
    // alert(`Student Registered: ${JSON.stringify(formData)}`);
    
    const response = await registerStudent(formData);
    if (response.success) {   
        alert("Student Registered Successfully");
        navigate("/login");
    } else {
        alert(response.error);
    }
  const handleSearch = () => {
    if (subject.trim()) {
      navigate("/student-search-results");
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-white"
    >
      {/* Navbar */}
      <StudentNavbar />

      {/* Hero Section */}
      <div className="w-full bg-[#00BFA5] text-white py-16 px-6 flex flex-col items-center text-center sm:text-left sm:px-12 lg:px-20 rounded-b-3xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Find Your <span className="text-white">Perfect Tutor</span>
          </h1>

          {/* ข้อความรอง */}
          <p className="text-lg text-[#F8F8F8] opacity-90 mt-4 tracking-wide">
            Learn from experienced professionals in subjects you love.
          </p>
          <p className="text-lg text-[#F8F8F8] opacity-90 mt-2 tracking-wide">
            Choose from expert tutors in various subjects and improve your skills today!
          </p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-sm sm:max-w-lg mx-auto sm:mx-0 mt-10"
          >
            <input
              type="text"
              placeholder="Search for a subject..."
              className="w-full pl-5 pr-20 py-4 rounded-full shadow-lg text-gray-700 focus:ring-4 focus:ring-white focus:outline-none bg-white"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#008F7A] text-white p-3 rounded-full shadow hover:bg-[#007566] transition"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Popular Subjects Section (แก้ปัญหาการ์ดซ้อนกัน) */}
      <div className="bg-white text-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium mb-8">Popular Subjects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:gap-8 lg:gap-10 flex-wrap">
            {[
              { name: "Mathematics", icon: <FaBookOpen />, description: "Master equations with expert guidance." },
              { name: "English", icon: <FaGlobe />, description: "Improve your writing and speaking fluency." },
              { name: "Programming", icon: <FaChalkboardTeacher />, description: "Learn coding with real-world projects." },
              { name: "Business", icon: <FaBookOpen />, description: "Understand market trends and strategies." },
            ].map((subjectItem) => (
              <motion.button
                key={subjectItem.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg border border-gray-300/50 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-auto"
                onClick={() => {
                  setSubject(subjectItem.name);
                  navigate("/student-search-results");
                }}
              >
                <div className="text-5xl text-[#00BFA5] mb-3">{subjectItem.icon}</div>
                <p className="text-gray-900 font-medium text-lg">{subjectItem.name}</p>
                <p className="text-gray-500 text-sm mt-2 text-center">{subjectItem.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default StudentSearchPage;