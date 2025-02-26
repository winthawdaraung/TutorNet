import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerTutor } from "../../handle/tutor";
import { FaEnvelope, FaLock, FaChalkboardTeacher, FaUniversity, FaBook, FaClock } from "react-icons/fa";

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
  const [setShowTerms] = useState(false);
  const [setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setShowAlert(true);
      return;
    }
    const response = await registerTutor(formData);
    if (response.success) {   
        alert("Tutor Registered Successfully");
        navigate("/login");
    } else {
        alert(response.error);
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
            Become a <span className="text-[#00BFA5]">Tutor</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Join our platform and start teaching today!
          </p>
        </motion.div>

        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <FaChalkboardTeacher className="absolute left-3 top-4 text-gray-400" />
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

          {/* University */}
          <div className="relative">
            <FaUniversity className="absolute left-3 top-4 text-gray-400" />
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

          {/* Subject - New Field ✅ */}
          <div className="relative">
            <FaBook className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="subject"
              placeholder="Teaching Subject"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Experience - New Field ✅ */}
          <div className="relative">
            <FaClock className="absolute left-3 top-4 text-gray-400" />
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
            <label htmlFor="terms" className="text-gray-600 text-sm">
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
        <div className="text-center mt-6 flex justify-center">
          <button
            className="text-[#00BFA5] font-semibold hover:underline flex items-center"
            onClick={() => navigate("/register")}
          >
            ← Back to Role Selection
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterTutorPage;