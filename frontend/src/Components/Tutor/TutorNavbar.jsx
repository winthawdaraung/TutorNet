import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";

const TutorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
              to="/tutor-request"
              className={`transition-all duration-300 ${
                location.pathname.startsWith("/tutor-request")
                  ? "text-blue-600 font-bold"
                  : "hover:text-[#00BFA5]"
              }`}
            >
              Request
            </Link>
          </li>
          <li>
            <Link
              to="/tutor-profile"
              className={`transition-all duration-300 ${
                location.pathname === "/tutor-profile"
                  ? "text-blue-600 font-bold"
                  : "hover:text-[#00BFA5]"
              }`}
            >
              My Profile
            </Link>
          </li>
          <li>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              onClick={() => navigate("/tutor-logout")}
            >
              Log out
            </button>
          </li>
        </ul>

        {/* Mobile Menu (optional for future enhancements) */}
      </div>
    </nav>
  );
};

export default TutorNavbar;
