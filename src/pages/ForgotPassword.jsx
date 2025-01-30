import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loadingDots, setLoadingDots] = useState(""); // ✅ Animated dots
  const navigate = useNavigate();

  useEffect(() => {
    if (showAlert) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setShowAlert(false);
        navigate("/reset-password"); // ✅ ไปที่ Reset Password
      }, 1950);

      return () => clearInterval(interval);
    }
  }, [showAlert, navigate]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setShowAlert(true); // ✅ แสดง Alert Modal
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
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-500 mt-2">Enter your email to reset your password</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5 mt-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-[#00BFA5] text-white text-lg font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
            type="submit"
          >
            Reset Password
          </motion.button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Remember your password?{" "}
            <button
              className="text-[#00BFA5] font-semibold hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </p>
        </div>
      </motion.div>

      {/* ✅ Custom Alert Modal with Animated Dots ✅ */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900">Email Sent!</h3>
            <p className="text-gray-600 text-sm mt-2">
              A password reset link has been sent to <span className="font-semibold">{email}</span>.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Redirecting to reset password<span>{loadingDots}</span> {/* ✅ Animated Dots */}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
