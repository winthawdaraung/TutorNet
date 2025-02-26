import { Link, Routes, Route, useLocation } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";
import TutormyProfilePage from "../../pages/Tutor/Tutormyprofilepage";
import TutorEditProfile from "../../pages/Tutor/Tutoreditmyprofilepage";
import TutorNotificationPage from "../../pages/Tutor/Tutornotificationpage";

const TutorNavbar = () => {
  const location = useLocation();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-1 font-extrabold">
            <SiStudyverse className="text-3xl text-teal-500" />
            <p>EDUbridge Tutor</p>
          </div>

          {/* Menu Items */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <li>
              <Link
                to="/tutor/profile"
                className={`transition-all duration-300 ${
                  location.pathname === "/tutor/profile"
                    ? "text-blue-600 font-bold"
                    : "hover:text-[#00BFA5]"
                }`}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/tutor/notifications"
                className={`transition-all duration-300 ${
                  location.pathname === "/tutor/notifications"
                    ? "text-blue-600 font-bold"
                    : "hover:text-[#00BFA5]"
                }`}
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/tutor/logout"
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes inside Navbar */}
      <Routes>
        <Route path="/tutor/profile" element={<TutormyProfilePage />} />
        <Route path="/tutor/edit-profile" element={<TutorEditProfile />} />
        <Route
          path="/tutor/notifications"
          element={<TutorNotificationPage />}
        />
      </Routes>
    </>
  );
};

export default TutorNavbar;
