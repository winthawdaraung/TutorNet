import { useState } from "react";
import { FaUser, FaEnvelope, FaUniversity, FaIdCard, FaLayerGroup } from "react-icons/fa";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    studentId: "",
    yearOfStudy: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <StudentNavbar />

      {/* ✅ Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Student Profile</h2>

          {/* ✅ Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200">
              <span className="text-3xl text-gray-500">+</span>
            </div>
          </div>

          {/* ✅ Form Fields */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* University */}
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3">
              <FaUniversity className="text-gray-500" />
              <input
                type="text"
                name="university"
                placeholder="Institution/University"
                value={formData.university}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* Student ID */}
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3">
              <FaIdCard className="text-gray-500" />
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* Year of Study */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg px-3">
              <input
                type="text"
                name="yearOfStudy"
                placeholder="Year of Study"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* Department */}
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3">
              <FaLayerGroup className="text-gray-500" />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>

            {/* ✅ Save Profile Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all hover:bg-yellow-600 hover:scale-105"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default StudentProfile;