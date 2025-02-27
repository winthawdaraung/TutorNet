import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaIdCard,
  FaLayerGroup,
  FaCamera,
} from "react-icons/fa";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import userProfileData from "../../mockData/Student/StudentProfileData2";
import defaultProfile from "../../assets/tutor/defaultProfile.png";

function EditStudentProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userProfileData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", formData);
    navigate("/student-profile");
  };

  const displayProfileImage =
    formData.profileImageUrl && formData.profileImageUrl.trim()
      ? formData.profileImageUrl
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
              Edit Profile
            </h2>
            <div className="flex justify-center mb-6 md:mb-8">
              <motion.label
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="cursor-pointer relative"
              >
                <img
                  src={displayProfileImage}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border border-gray-300"
                />
                <input type="file" className="hidden" />
                <FaCamera className="text-gray-500 absolute bottom-2 right-2 text-xl" />
              </motion.label>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {[
                {
                  name: "fullName",
                  icon: <FaUser />,
                  placeholder: "Full Name",
                },
                {
                  name: "email",
                  icon: <FaEnvelope />,
                  placeholder: "Email Address",
                },
                {
                  name: "university",
                  icon: <FaUniversity />,
                  placeholder: "Institution/University",
                },
                {
                  name: "studentId",
                  icon: <FaIdCard />,
                  placeholder: "Student ID",
                },
                {
                  name: "yearOfStudy",
                  icon: <FaLayerGroup />,
                  placeholder: "Year of Study",
                },
                {
                  name: "department",
                  icon: <FaLayerGroup />,
                  placeholder: "Department",
                },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3"
                >
                  <span className="text-gray-500 mr-2">{field.icon}</span>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none"
                  />
                </motion.div>
              ))}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600"
                >
                  Save Profile
                </motion.button>
              </div>
            </form>
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default EditStudentProfile;
