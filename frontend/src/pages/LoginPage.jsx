import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { handleLogin } from "../handle/common";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle login errors
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const { success, data } = await handleLogin(email, password);
      if (!success) {
        setError(data);
      } else {
        const response = data;
          if (response.role === "student") {
            navigate("/studentafterlogin");
          } else if (response.role === "tutor") {
            navigate("/tutorafterlogin");
          } else {
            setError("Invalid role.");
          }
      }
    } catch (error) { 
      console.error("Error logging in", error);
      setError("An error occurred during login. Please try again.");
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
          <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue your learning journey</p>
        </motion.div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <form className="space-y-5 mt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Your Password"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-[#00BFA5] text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
            onClick={handleSubmit}
          >
            Sign In
          </motion.button>

          {/* Google Login */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 py-3 border mt-3 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-sm"
          >
            <FaGoogle className="text-red-500" /> Sign in with Google
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <button
              className="text-[#00BFA5] font-semibold hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;