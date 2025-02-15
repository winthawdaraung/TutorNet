import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaChalkboardTeacher } from "react-icons/fa";
import { registerTutor } from "../../handle/tutor";

const RegisterTutorPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    experience: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setShowAlert(true); // ❌ ถ้าไม่ได้ติ๊ก checkbox ให้แสดง Alert
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
        {/* Header */}
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-900">
            Become a <span className="text-[#00BFA5]">Tutor</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Join our platform and start teaching today!
          </p>
        </motion.div>

        {/* Form */}
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

          {/* Experience */}
          <div className="relative">
            <FaChalkboardTeacher className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="experience"
              placeholder="Years of Experience"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Terms & Conditions Checkbox ✅ */}
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
                  setShowTerms(true); // ✅ เปิด Modal โดยไม่ติ๊ก checkbox
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

        {/* ✅ Back to Role Selection ✅ */}
        <div className="text-center mt-6 flex justify-center">
          <button
            className="text-[#00BFA5] font-semibold hover:underline flex items-center"
            onClick={() => navigate("/register")}
          >
            ← Back to Role Selection
          </button>
        </div>
      </motion.div>

      {/* ✅ Terms & Conditions Modal ✅ */}
      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-left"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Terms & Conditions</h3>

            <div className="text-gray-700 text-sm space-y-4">
              <p><span className="font-semibold text-[#007F6E]">Platform Use:</span> This platform connects students and tutors but does not verify tutor qualifications.</p>
              <p><span className="font-semibold text-[#007F6E]">Payments:</span> All transactions are managed directly between students and tutors. We are not responsible for any payment issues, refunds, or disputes.</p>
            <p><span className="font-semibold text-[#007F6E]">User Conduct:</span> Users must interact professionally and respectfully. Any inappropriate behavior may result in account suspension.</p>
              <p><span className="font-semibold text-[#007F6E]">Privacy:</span> We collect only essential information for account creation and matching purposes. No financial data is stored or processed.</p>
            </div>

            <div className="mt-5 flex justify-end gap-4">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300"
                onClick={() => {
                  setAcceptTerms(true);
                  setShowTerms(false);
                }}
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✅ Alert Modal ✅ */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-900">Accept Terms & Conditions</h3>
            <p className="text-gray-600 text-sm mt-2">You need to accept the Terms & Conditions before proceeding.</p>
            <div className="mt-5 flex justify-center gap-4">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAlert(false)}>Close</button>
              <button className="px-4 py-2 bg-[#00BFA5] text-white rounded-full hover:bg-teal-600" onClick={() => { setShowTerms(true); setShowAlert(false); }}>View Terms</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RegisterTutorPage;
