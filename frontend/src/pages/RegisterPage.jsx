import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200 text-center"
      >
        {/* Header */}
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Your Role</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Choose your role to proceed with registration</p>
        </motion.div>

        {/* Role Selection */}
        <div className="space-y-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register-student")}
            className="w-full flex items-center justify-center gap-4 px-4 sm:px-5 py-2 sm:py-3 bg-[#00BFA5] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
          >
            <div className="p-2 bg-white rounded-full shadow-md">
              <FaUserGraduate className="text-lg sm:text-xl text-[#005F50]" />
            </div>
            Register as Student
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register-tutor")}
            className="w-full flex items-center justify-center gap-4 px-4 sm:px-5 py-2 sm:py-3 bg-[#00BFA5] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
          >
            <div className="p-2 bg-white rounded-full shadow-md">
              <FaChalkboardTeacher className="text-lg sm:text-xl text-[#005F50]" />
            </div>
            Register as Tutor
          </motion.button>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-5">
          <p className="text-gray-500 text-sm sm:text-sm">
            Already have an account?{" "}
            <button
              className="text-[#00BFA5] font-semibold hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
