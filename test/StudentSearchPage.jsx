import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaCalculator,
  FaLanguage,
  FaCode,
  FaBriefcase,
} from "react-icons/fa"; // ✅ ใช้ไอคอนที่เข้ากับแต่ละวิชา
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import aboutusIMG from "../../assets/StudentSearchHero.png"; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};


// const StudentSearchPage = () => {
//   const [subject, setSubject] = useState("");
//   // const [institution, setInstitution] = useState("");
//   //const [fullName, setfullName] =useState("")
//   const[tutors, setTutors] = useState([]);
//   const navigate = useNavigate();

// //hande Searching
//   //const [tutors, setTutors] = useState([]);
//   const handleSearch = async () => {
//     //search subject
//     if (subject.trim()) {
//       try {
//         const response = await axios.get("http://localhost:5000/api/tutors/search", { 
//           params: { query: subject}
//             //params: {query: fullName}
//         });
//         // Set the tutors from the response
//         setTutors(response.data);
//         navigate(`/student-search-results?query=${subject}`);
//         //navigate(`/student-search-results?query=${fullName}`);
//       } catch (error) {
//           console.error("Search error:", error);
//       //   if (tutors.length === 0) {
//       //     return res.status(404).json({
//       //         success: false,
//       //         message: "No tutors found matching the search criteria"
//       //     });
//       // }
//       }
//     }

//     // //search institution
//     // if (institution.trim()) {
//     //   try {
//     //     const response = await axios.get("http://localhost:5000/api/tutors", { 
//     //       params: { query: instituion}
//     //     });
//     //     // Set the tutors from the response
//     //     setTutors(response.data);
//     //     navigate(`/student-search-results?query=${institution}`);
//     //   } catch (error) {
//     //     console.error("Search error:", error);
//     //   }
//     // }
//   };

  return (
    <motion.div className="min-h-screen flex flex-col bg-white">
      {/* ✅ Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <StudentNavbar />
      </div>

      {/* ✅ Hero Section */}
      <div className="flex justify-center mt-28 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-teal-400 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-7xl px-16 lg:px-28 py-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12"
        >
          {/* ✅ Left: Text + Search Box */}
          <div className="flex-1">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl font-bold text-white leading-tight">
                Find Your <span className="text-gray-900">Perfect Tutor</span>
              </h1>
              <p className="text-gray-200 mt-3 text-xl">
                Search for top-rated tutors and start learning today.
              </p>
            </motion.div>

            {/* ✅ Search Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-lg mt-6"
            >
              <div className="bg-white shadow-lg rounded-full px-6 py-4 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="What subject do you want to learn?"
                  className="flex-1 bg-transparent focus:outline-none text-gray-900 text-lg"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  //onChange={(e) => setfullName(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition flex items-center justify-center"
                  onClick={handleSearch}
                >
                  <FaSearch className="text-2xl" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ✅ Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <img src={aboutusIMG} alt="Students Learning" className="w-80 sm:w-96 lg:w-[30rem] object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ Popular Subjects Section */}
      <motion.div className="bg-gray-50 text-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-12">Popular Subjects</h2>

          {/* ✅ Subjects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {[
              { name: "Mathematics", icon: <FaCalculator size={32} className="text-[#00BFA5]" />, description: "Master equations with expert guidance." },
              { name: "English", icon: <FaLanguage size={32} className="text-[#00BFA5]" />, description: "Improve your writing and speaking fluency." },
              { name: "Programming", icon: <FaCode size={32} className="text-[#00BFA5]" />, description: "Learn coding with real-world projects." },
              { name: "Business", icon: <FaBriefcase size={32} className="text-[#00BFA5]" />, description: "Understand market trends and strategies." },
            ].map((subjectItem) => (
              <motion.button
                key={subjectItem.name}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="p-8 bg-white rounded-2xl shadow-md border border-gray-200 transition-transform duration-300 ease-in-out flex flex-col items-center gap-4"
                onClick={() => {
                  setSubject(subjectItem.name);
                  //setfullName(fullName.name);
                  navigate(`/student-search-results?query=${subjectItem.name}`);
                  //navigate(`/student-search-results?query=${fullName.name}`);
                }}
              >
                {/* ✅ Subject Icon */}
                <motion.div className="p-4 rounded-xl flex items-center justify-center" variants={iconVariants}>
                  {subjectItem.icon}
                </motion.div>

                {/* ✅ Subject Name */}
                <p className="text-gray-900 font-semibold text-lg">{subjectItem.name}</p>
                
                {/* ✅ Subject Description */}
                <p className="text-gray-600 text-sm text-center">{subjectItem.description}</p>
              </motion.button>
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