import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaChalkboardTeacher, FaUniversity, FaClock } from "react-icons/fa";
// import {FaBook} from "react-icons/fa"; 

const RegisterTutorPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    university: "",
    subject: "",       // ✅ Added Subject
    experience: "",    // ✅ Added Experience (Years)
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setShowAlert(true);
      return;
    }
    alert(`Tutor Registered: ${JSON.stringify(formData)}`);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 text-center bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-900">
            Become a <span className="text-[#00BFA5]">Tutor</span>
          </h2>
          <p className="mt-2 text-gray-500">
            Join our platform and start teaching today!
          </p>
        </motion.div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <FaChalkboardTeacher className="absolute text-gray-400 left-3 top-4" />
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
            <FaEnvelope className="absolute text-gray-400 left-3 top-4" />
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
            <FaLock className="absolute text-gray-400 left-3 top-4" />
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

          {/* University */}
          <div className="relative">
            <FaUniversity className="absolute text-gray-400 left-3 top-4" />
            <input
              type="text"
              name="university"
              placeholder="University Name"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.university}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subject - New Field ✅
          <div className="relative">
            <FaBook className="absolute text-gray-400 left-3 top-4" />
            <input
              type="text"
              name="subject"
              placeholder="Teaching Subject"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* Experience - New Field ✅ */}
          <div className="relative">
            <FaClock className="absolute text-gray-400 left-3 top-4" />
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              required
            />
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
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <span
                className="text-[#00BFA5] cursor-pointer hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTerms(true);
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
            Register as Tutor
          </motion.button>
        </form>

        {/* Back to Role Selection */}
        <div className="flex justify-center mt-6 text-center">
          <button
            className="text-[#00BFA5] font-semibold hover:underline flex items-center"
            onClick={() => navigate("/register")}
          >
            ← Back to Role Selection
          </button>
        </div>
      </motion.div>
            {/* ✅ Modal Terms & Conditions */}
            {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-96"
          >
            {/* Header */}
            <h2 className="mb-4 text-xl font-bold text-center text-gray-900">Terms & Conditions</h2>

            {/*Terms & Conditions */}
            <div className="space-y-3 text-left text-gray-700">
              <p><span className="font-bold text-[#00BFA5]">Platform Use:</span> This platform connects students and tutors but does not verify tutor qualifications.</p>
              <p><span className="font-bold text-[#00BFA5]">Payments:</span> All transactions are managed directly between students and tutors. We are not responsible for any payment issues, refunds, or disputes.</p>
              <p><span className="font-bold text-[#00BFA5]">User Conduct:</span> Users must interact professionally and respectfully. Any inappropriate behavior may result in account suspension.</p>
              <p><span className="font-bold text-[#00BFA5]">Privacy:</span> We collect only essential information for account creation and matching purposes. No financial data is stored or processed.</p>
            </div>

            {/* Close button */}
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowTerms(false)} className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900">Close</button>
              <button onClick={() => { setAcceptTerms(true); setShowTerms(false); }} className="px-4 py-2 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300">Accept & Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RegisterTutorPage;