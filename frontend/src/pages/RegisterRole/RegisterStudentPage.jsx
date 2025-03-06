import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaUniversity } from "react-icons/fa";
import { registerStudent } from "../../handle/student"

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
    institution: "",
    year: "",
  });

  const [error, setError] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // ✅ ใช้ state นี้เปิด/ปิด Modal
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      // alert("Please accept the Terms & Conditions.");
      setError("Please accept the Terms & Conditions.");
      return;
    }
    
    try {
      const response = await registerStudent(formData);
      if (response.success) {
        navigate("/login");
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("Error registering student:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center"
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-900">
            Join as a <span className="text-[#00BFA5]">Student</span>
          </h2>
          <p className="text-gray-500 mt-2">Find the best tutors for your learning journey.</p>
        </motion.div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Student ID */}
          <div className="relative">
            <FaIdCard className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Institution / University */}
          <div className="relative">
            <FaUniversity className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="institution"
              placeholder="University Name"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>

          {/* Year of Study */}
          <div className="relative">
            <FaUniversity className="absolute left-3 top-4 text-gray-400" />
            <input type="number" name="year" placeholder="Year of Study" className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100" value={formData.year} onChange={handleChange} required />
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start text-left">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2 accent-[#00BFA5]"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I agree to the{" "}
              <span
                className="text-[#00BFA5] cursor-pointer hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTerms(true); // ✅ เปิด Modal
                }}
              >
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
            type="submit"
          >
            Register as Student
          </motion.button>

          {/* Back to Role Selection - ✅ ปรับ underline ให้เชื่อมกัน */}
<div className="flex justify-center mt-6">
  <button
    className="text-[#00BFA5] font-semibold inline-flex items-center 
               hover:underline decoration-2 decoration-solid underline-offset-4 transition duration-200"
    onClick={() => navigate("/register")}
  >
    <span className="mr-2">← Back to Role Selection</span>
  </button>
</div> 
        </form>
      </motion.div>

      {/* ✅ Modal Terms & Conditions */}
      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg w-96 p-6 border border-gray-300"
          >
            {/* Header */}
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Terms & Conditions</h2>

            {/*Terms & Conditions */}
            <div className="text-left text-gray-700 space-y-3">
              <p><span className="font-bold text-[#00BFA5]">Platform Use:</span> This platform connects students and tutors but does not verify tutor qualifications.</p>
              <p><span className="font-bold text-[#00BFA5]">Payments:</span> All transactions are managed directly between students and tutors. We are not responsible for any payment issues, refunds, or disputes.</p>
              <p><span className="font-bold text-[#00BFA5]">User Conduct:</span> Users must interact professionally and respectfully. Any inappropriate behavior may result in account suspension.</p>
              <p><span className="font-bold text-[#00BFA5]">Privacy:</span> We collect only essential information for account creation and matching purposes. No financial data is stored or processed.</p>
            </div>

            {/* Close button */}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setShowTerms(false)} className="px-4 py-2 text-gray-600 font-semibold hover:text-gray-900">Close</button>
              <button onClick={() => { setAcceptTerms(true); setShowTerms(false); }} className="px-4 py-2 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300">Accept & Close</button>
            </div>
          </motion.div>
        </div>
      )}
      

    </div>
  );
};

export default RegisterStudentPage;