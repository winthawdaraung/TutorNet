import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaIdCard,
  FaLayerGroup,
} from "react-icons/fa";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import userProfileDataMock from "../../mockData/Student/StudentProfileData2";
import defaultProfile from "../../assets/tutor/defaultProfile.png";

import { getStudentProfile } from "../../handle/student";
import { Placeholder } from "react-select/animated";

function StudentProfile() {
  const navigate = useNavigate();

  const [userProfileData, setUserProfileData] = useState(userProfileDataMock);

  const fetchProfile = async () => {
    try {
      const response = await getStudentProfile();
      if (response.success) {
        setUserProfileData(response.data);
      } else {
        console.error("Failed to fetch student profile:", response.error);
        setUserProfileData(userProfileDataMock);
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
      setUserProfileData(userProfileDataMock);
    }
  };

  useEffect(() => { fetchProfile(); }, []);
  if (!setUserProfileData) {
    return <div>Loading...</div>;
  }

  const displayProfileImage =
    userProfileData.profileImageUrl && userProfileData.profileImageUrl.trim()
      ? userProfileData.profileImageUrl
      : defaultProfile;
  
  

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col min-h-screen bg-gray-100 py-10 md:py-20"
      >
        <StudentNavbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-xl p-6 md:p-16 w-full max-w-3xl"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
              Student Profile
            </h2>
            <div className="flex justify-center mb-6 md:mb-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={displayProfileImage}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: userProfileData.fullName, icon: <FaUser /> },
                { label: userProfileData.email, icon: <FaEnvelope /> },
                { label: userProfileData.institution, icon: <FaUniversity /> },
                { label: userProfileData.studentId, icon: <FaIdCard /> },
                { label: `Year ${userProfileData.year}`, icon: <FaLayerGroup /> },
                { label: userProfileData.department, icon: <FaLayerGroup /> , Placeholder: "Department" },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-100 p-3 md:p-4 rounded-lg flex items-center"
                >
                  {field.icon && <span className="mr-2">{field.icon}</span>}
                  {field.label}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/student-edit-profile")}
                className="bg-teal-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-teal-600"
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default StudentProfile;
