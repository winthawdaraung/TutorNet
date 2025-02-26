import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi"; 
import { motion, AnimatePresence } from "framer-motion";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-3 md:py-4 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center px-3 md:px-6 lg:px-12">
        
        {/* ✅ Logo - Shifted Left & Modern Separator for "Student" */}
        <div className="text-2xl flex items-center gap-1 font-extrabold">
          <SiStudyverse className="text-3xl text-teal-500" />
          <p>
            EDUbridge
            <span className="text-gray-400 font-normal text-lg tracking-wide ml-2">| Student</span>
          </p>
        </div>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/student-search"
              className={`transition-all duration-300 ${
                location.pathname.startsWith("/student-search") || location.pathname.startsWith("/student-search-results")
                  ? "text-[#00BFA5] font-sm"
                  : "hover:text-[#00BFA5]"
              }`}
            >
              Search for Tutor
            </Link>
          </li>

          {/* 🔹 My Profile (Now Clickable, But No Path Yet) */}
          <li>
            <Link className="transition-all duration-300 hover:text-[#00BFA5]">
              My Profile
            </Link>
          </li>

          {/* 🔔 Notifications (Desktop) */}
          <li>
            <Link
              to="/student-notifications"
              className={`transition-all duration-300 ${
                location.pathname === "/student-notifications"
                  ? "text-[#00BFA5] font-bold"
                  : "hover:text-[#00BFA5]"
              }`}
            >
              <IoNotificationsOutline
                className="text-2xl"
                strokeWidth={location.pathname === "/student-notifications" ? "2.5" : "2"}
              />
            </Link>
          </li>

          <li>
            <button
              className="bg-[#00BFA5] text-white px-4 py-2 rounded-full hover:bg-[#009e88] transition duration-300 font-semibold"
              onClick={() => navigate("/student-logout")}
            >
              Log out
            </button>
          </li>
        </ul>

        {/* ✅ Mobile Menu Button 🍔 */}
        <button
          className="md:hidden text-gray-700 text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ Mobile Menu (Slide Down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
              <li>
                <Link
                  to="/student-search"
                  onClick={() => setIsOpen(false)}
                  className={`transition-all duration-300 ${
                    location.pathname.startsWith("/student-search") || location.pathname.startsWith("/student-search-results")
                      ? "text-[#00BFA5] font-sm"
                      : "hover:text-[#00BFA5]"
                  }`}
                >
                  Search for Tutor
                </Link>
              </li>

              {/* 🔹 My Profile (Now Clickable, But No Path Yet) */}
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="transition-all duration-300 hover:text-[#00BFA5]"
                >
                  My Profile
                </Link>
              </li>

              {/* 🔔 Notifications */}
              <li>
                <Link
                  to="/student-notifications"
                  onClick={() => setIsOpen(false)}
                  className={`transition-all duration-300 ${
                    location.pathname === "/student-notifications"
                      ? "text-[#00BFA5] font-bold"
                      : "hover:text-[#00BFA5]"
                  }`}
                >
                  {isOpen ? "Notification" : <IoNotificationsOutline className="text-2xl" />}
                </Link>
              </li>

              <li>
                <button
                  className="bg-[#00BFA5] text-white px-6 py-2 rounded-full hover:bg-[#009e88] transition duration-300 font-semibold"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/student-logout");
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default StudentNavbar;