import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import { FaSearch } from "react-icons/fa";
//import tutors from "../../mockData/Student/ResultTutors"; 
import TutorCard from "../../Components/Student/StudentSearchResult/TutorCard";
import Pagination from "../../Components/Student/StudentSearchResult/Pagination";

const tutorsPerPage = 3; // ✅ Number of tutors per page


const StudentSearchResultPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
//for Search
// const [tutors,setTutors] = useState([]);
// const [totalPages, setTotalPages] = useState(1);
// const [error, setError] = useState([]);// state to manage error
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    //Fetch the data from the backend
    //setSearchQuery(query);// set search query if the URL contains a query parameter

  //   const fetchTutors = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/tutors/search", { 
  //         params: { 
  //           query,
  //           page: currentPage,
  //           limit: tutorsPerPage,
  //          }
  //       });
  //       //handle case if no tutors found
  //       if (response.data.success /*&& response.data.tutors.length > 0*/) {
  //         setTutors(response.data.data);
  //         setTotalPages(response.data.totalPages);
  //         setError("");
  //       }else{
  //         setTutors([]);
  //         setError("No Tutors found!!!");
  //       }
  //       // setTutors(response.data);
  //       // if (tutors.length === 0){
  //       //   setError("There is No Tutor Found!")
  //       // }
  //     } 
  //     catch (error) {
  //       // if (error.response.status === 404){
  //       //   setError("No Tutors Found!");
  //       // }
  //       console.error("Error fetching tutors:", error);
  //       setError("An error occured while fetching tutors.")
  //     }
  //   };
  //   fetchTutors();
  // }, [location.search,currentPage]); 

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // }

  // ✅ Pagination Logic
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(tutors.length / tutorsPerPage);

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
              <button className="px-5 bg-[#00BFA5] text-white text-lg rounded-r-full shadow-md hover:bg-[#009e88] transition">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Tutor List */}
          <div className="space-y-6 flex-grow">
            {currentTutors.length > 0 ? (
              currentTutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
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