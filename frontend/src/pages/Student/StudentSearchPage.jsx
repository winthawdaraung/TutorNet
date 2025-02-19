import { useState } from "react";
import { FaSearch, FaBookOpen, FaGlobe, FaChalkboardTeacher, FaBusinessTime } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import aboutusIMG from "../../assets/aboutusIMG.png"; // ✅ ใช้รูปจริง

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const StudentSearchPage = () => {
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (subject.trim()) {
      navigate("/student-search-results");
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" className="min-h-screen flex flex-col bg-white">
      {/* ✅ Navbar */}
      <StudentNavbar />

      {/* ✅ Hero Section */}
      <motion.div className="w-full bg-[#00BFA5] text-white py-16 px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left rounded-b-3xl shadow-md lg:gap-8">
        {/* ✅ Left: Text Section */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="max-w-md lg:max-w-lg flex flex-col gap-6">
          <h1 className="text-5xl font-bold leading-tight">
            Find Your <span className="text-gray-900">Perfect Tutor</span>
          </h1>
          <p className="text-lg text-gray-200">
            Learn from top-rated tutors in various subjects.  
            Get personalized learning experiences to achieve your goals.
          </p>

          {/* ✅ Search Box */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative w-full max-w-lg mx-auto lg:mx-0 mt-6">
            <input
              type="text"
              placeholder="Search for a subject..."
              className="w-full pl-6 pr-20 py-5 rounded-full shadow-lg text-gray-700 focus:ring-4 focus:ring-white focus:outline-none bg-white text-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#008F7A] text-white p-4 rounded-full shadow hover:bg-[#007566] transition" onClick={handleSearch}>
              <FaSearch />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ✅ Right: ใช้รูปแทนไอคอนเวกเตอร์ */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-sm lg:max-w-md flex justify-center">
          <img src={aboutusIMG} alt="Students Learning" className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-cover" />
        </motion.div>
      </motion.div>

      {/* ✅ Popular Subjects Section (เพิ่มแอนิเมชั่นแบบ `HowItWorks`) */}
      <motion.div className="bg-gray-50 text-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-12">Popular Subjects</h2>
          
          {/* ✅ ใช้ Stagger Animation ให้แต่ละการ์ดเด้งขึ้นมา */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Mathematics", icon: <FaBookOpen />, description: "Master equations with expert guidance." },
              { name: "English", icon: <FaGlobe />, description: "Improve your writing and speaking fluency." },
              { name: "Programming", icon: <FaChalkboardTeacher />, description: "Learn coding with real-world projects." },
              { name: "Business", icon: <FaBusinessTime />, description: "Understand market trends and strategies." },
            ].map((subjectItem, index) => (
              <motion.div key={subjectItem.name} variants={itemVariants} className="relative">
                <motion.div className="bg-[#00BFA5] p-4 rounded-xl mask mask-hexagon mb-6 flex items-center justify-center" variants={iconVariants}>
                  {subjectItem.icon}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-8 bg-white rounded-2xl shadow-md border border-gray-200 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center"
                  onClick={() => {
                    setSubject(subjectItem.name);
                    navigate("/student-search-results");
                  }}
                >
                  <p className="text-gray-900 font-semibold text-lg">{subjectItem.name}</p>
                  <p className="text-gray-600 text-sm mt-2">{subjectItem.description}</p>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ Footer */}
      <Footer />
    </motion.div>
  );
};

export default StudentSearchPage;