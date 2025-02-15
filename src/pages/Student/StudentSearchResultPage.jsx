import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import framer-motion
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer"; // ✅ ใช้ Footer เดิม
import { FaSearch } from "react-icons/fa";

const tutors = [
  {
    id: 1,
    name: "Somchai Pipat",
    subject: "Computer Science",
    university: "Chulalongkorn University",
    experience: "10 years",
    price: 800,
    bio: "Expert in Computer Science, specializing in AI and Data Science.",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Supaporn Witthayakorn",
    subject: "Mathematics",
    university: "Thammasat University",
    experience: "7 years",
    price: 600,
    bio: "Mathematics tutor for high school and university levels, focusing on problem-solving techniques.",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Dr. Kittipong Srisuwan",
    subject: "Physics",
    university: "Chiang Mai University",
    experience: "12 years",
    price: 1000,
    bio: "University lecturer in Quantum Physics with extensive teaching experience.",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Maneerat Phanthong",
    subject: "English Language",
    university: "Silpakorn University",
    experience: "5 years",
    price: 500,
    bio: "English tutor specializing in TOEIC, IELTS, and business communication.",
    image: "https://via.placeholder.com/100",
  },
];

const StudentSearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // ✅ เพิ่ม Animation ตอนโหลดหน้า
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
    >
      {/* Navbar */}
      <StudentNavbar />

      {/* Main Content */}
      <div className="flex-grow px-4 py-8 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <label className="text-lg font-semibold text-gray-900">Subject</label>
            <div className="relative w-full mt-2 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a subject"
                className="w-full pl-5 pr-12 py-3 border rounded-l-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100 text-gray-700 text-lg"
              />
              <button className="px-5 bg-[#00BFA5] text-white text-lg rounded-r-full">
                <FaSearch />
              </button>
            </div>
          </motion.div>

          {/* Tutor List */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            }}
            className="space-y-6"
          >
            {tutors.map((tutor) => (
              <motion.div
                key={tutor.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="flex items-center bg-gray-50 p-4 rounded-lg border shadow-md"
              >
                {/* Profile Image */}
                <img src={tutor.image} alt={tutor.name} className="w-20 h-20 rounded-full object-cover border mr-4" />

                {/* Tutor Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
                  <p className="text-gray-600">{tutor.subject}</p>
                  <p className="text-gray-500 text-sm">🎓 {tutor.university}</p>
                  <p className="text-gray-500 text-sm">💼 Experience: {tutor.experience}</p>
                  <p className="text-gray-500 text-sm">{tutor.bio}</p>
                  <p className="text-green-600 font-semibold">฿{tutor.price} / hour</p>
                </div>

                {/* View Profile Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
                  onClick={() => navigate(`/tutor-profile/${tutor.id}`)}
                >
                  View Profile
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination (Mock) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-6"
          >
            <button className="px-4 py-2 border rounded-l-lg bg-gray-200">Previous</button>
            <button className="px-4 py-2 border bg-[#00BFA5] text-white">1</button>
            <button className="px-4 py-2 border bg-gray-200">2</button>
            <button className="px-4 py-2 border rounded-r-lg bg-gray-200">Next</button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default StudentSearchResultPage;