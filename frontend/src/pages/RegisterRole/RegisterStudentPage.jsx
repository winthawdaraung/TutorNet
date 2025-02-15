import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaIdCard, FaChevronDown } from "react-icons/fa";
import { registerStudent } from "../../handle/student";

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
    year: "",
    institution: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectYear = (year) => {
    setFormData({ ...formData, year });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setShowAlert(true); // ✅ เปิด Alert Modal ถ้าไม่ได้ติ๊ก Terms & Conditions
      return;
    }
    
    // alert(`Student Registered: ${JSON.stringify(formData)}`);
    
    const response = await registerStudent(formData);
    if (response.success) {   
        alert("Student Registered Successfully");
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
            Join as a <span className="text-[#00BFA5]">Student</span>
          </h2>
          <p className="text-gray-500 mt-2">Find the best tutors for your learning journey.</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5 mt-6 relative" onSubmit={handleSubmit}>
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

          {/* Institution */}
          <div className="relative">
            <FaGraduationCap className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="institution"
              placeholder="Institution / University"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>

          {/* Select Year */}
          <div className="relative z-50">
            <div
              className="w-full px-4 py-3 border rounded-full bg-gray-100 flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-[#00BFA5]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {formData.year ? `Year ${formData.year}` : "Select Year"}
              <FaChevronDown className="text-gray-500" />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg overflow-y-auto max-h-36 z-50"
                >
                  {["1", "2", "3", "4", "5", "6"].map((year) => (
                    <div
                      key={year}
                      className="px-4 py-3 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSelectYear(year)}
                    >
                      Year {year}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
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
          onClick={() => setShowTerms(false)} // ❌ กด Close -> checkbox ไม่ถูกเปลี่ยน
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300"
          onClick={() => {
            setAcceptTerms(true); // ✅ กด Accept & Close → checkbox ถูกติ๊ก
            setShowTerms(false);
          }}
        >
          Accept & Close
        </button>
      </div>
    </motion.div>
  </div>
)}

{/* ✅ Terms & Conditions Checkbox ✅ */}
<div className="flex items-start text-left">
  <input
    type="checkbox"
    id="terms"
    className="mt-1 mr-2 accent-[#00BFA5]"
    checked={acceptTerms}
    onChange={() => setAcceptTerms(!acceptTerms)} // ✅ กด checkbox -> เปลี่ยนค่า
  />
  <label htmlFor="terms" className="text-gray-600 text-sm">
    I agree to the{" "}
    <span
      className="text-[#00BFA5] cursor-pointer hover:underline"
      onClick={(e) => {
        e.preventDefault(); // ❌ ป้องกันค่า checkbox เปลี่ยนโดยอัตโนมัติ
        setShowTerms(true); // ✅ เปิด Terms & Conditions Modal
      }}
    >
      Terms & Conditions
    </span>
  </label>
</div>


<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-full py-3 bg-[#00BFA5] text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
  type="submit"
>
  Register as Student
</motion.button>
</form>

{/* ✅ Back to Role Selection (อยู่ตรงกลางแล้ว!) ✅ */}
<div className="text-center mt-6 flex justify-center items-center">
  <button
    className="text-[#00BFA5] font-semibold hover:underline flex items-center"
    onClick={() => navigate("/register")}
  >
    ← Back to Role Selection
  </button>
</div>
</motion.div>

 


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

export default RegisterStudentPage;
