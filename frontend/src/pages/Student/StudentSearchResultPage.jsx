import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import { FaSearch } from "react-icons/fa";
//import tutors from "../../mockData/Student/ResultTutors"; 
//import StudentSearchPage from "./StudentSearchPage";
import TutorCard from "../../Components/Student/StudentSearchResult/TutorCard";
import Pagination from "../../Components/Student/StudentSearchResult/Pagination";

const tutorsPerPage = 3; // ✅ Number of tutors per page

const StudentSearchResultPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);

    if (query) {
      fetchTutors(query, 1);
    }
  },[location.search]);

  // //Search for tutors
  const fetchTutors = async (query, page = 1) => {
    console.log("Fetching tutors for:", query, "Page:", page);
    try{
      const response = await axios.get('http://localhost:5000/api/tutors/search', {
      params: {
        query, 
        page, 
        limit: tutorsPerPage,
        sort: "ratingAndReviews"
      },
    });

    setResults(response.data.tutors);
    setTotalPages(response.data.totalPages);
    setCurrentPage(page);
  }catch (error) {
      console.error("Error fetching tutors:", error);
      setResults([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`); // Updates URL triggers useEffect
      fetchTutors(searchQuery, 1);
    }
  };

  const handlePageChange = (newPage) => {
    fetchTutors(searchQuery, newPage);
  };

  // // ✅ Pagination Logic
  // const indexOfLastTutor = currentPage * tutorsPerPage;
  // const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  // const currentTutors = results.slice(indexOfFirstTutor, indexOfLastTutor);
  // const totalPages = Math.ceil(results.length / tutorsPerPage);
  

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }} 
      className="flex flex-col min-h-screen bg-gray-50"
    >
      <StudentNavbar />

      {/* White Container */}
      <div className="flex-grow flex justify-center px-4 pb-10">
        <motion.div 
          className="bg-white shadow-xl rounded-3xl border border-gray-200 px-8 py-12 w-full max-w-7xl mt-28 min-h-[900px] flex flex-col flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Search Box */}
          <div className="mb-6">
            <label className="text-lg font-semibold text-gray-900">Subject</label>
            <div className="relative w-full mt-2 flex">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search a subject" 
                className="w-full pl-5 pr-12 py-3 border rounded-l-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100 text-gray-700 text-lg"
              />
              <button 
                onClick={handleSearch} // fix trigger API call
                className="px-5 bg-[#00BFA5] text-white text-lg rounded-r-full shadow-md hover:bg-[#009e88] transition">
                  <FaSearch />
              </button>
            </div>
          </div>

          {/* Tutor List */}
          <div className="space-y-6 flex-grow">
            {results.length > 0 ? (
              results.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
            ) : (
              <p className="text-center text-gray-500 text-lg">No tutors found.</p>
            )}
          </div>

          {/* ✅ Pagination (Always at the Bottom) */}
          <div className="mt-auto flex justify-center pt-10">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StudentSearchResultPage;