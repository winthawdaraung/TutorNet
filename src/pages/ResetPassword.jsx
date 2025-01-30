import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [resendClicked, setResendClicked] = useState(false); // ✅ State สำหรับเปลี่ยนข้อความ Resend
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccess) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        navigate("/login");
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showSuccess, navigate]);

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setShowSuccess(true);
  };

  const handleResendPasswordReset = () => {
    setResendClicked(true);
    setTimeout(() => setResendClicked(false), 1250); // ✅ หลัง 5 วินาที ให้กลับมาเป็น "Resend Link"
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
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-500 mt-2">Enter a new password for your account</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5 mt-6" onSubmit={handleReset}>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

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

        {/* ✅ Resend Password Reset Link ✅ */}
<div className="text-center mt-4">
  <p className="text-gray-500 text-sm">
    {resendClicked ? (
      "The link has been sent!"
    ) : (
      <>
        Didn&apos;t receive the password reset link?{" "}
        <button
          className="text-[#00BFA5] font-semibold hover:underline"
          onClick={handleResendPasswordReset}
        >
          Resend Link
        </button>
      </>
    )}
  </p>
</div>


      </motion.div>

      {/* ✅ Success Modal ✅ */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900">Password Reset Successful!</h3>
            <p className="text-gray-600 text-sm mt-2">
              Your password has been updated. Redirecting to login<span>{loadingDots}</span>
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
