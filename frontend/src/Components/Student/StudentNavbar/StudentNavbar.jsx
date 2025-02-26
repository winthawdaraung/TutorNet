import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";
import { IoNotificationsOutline } from "react-icons/io5";
import { handleLogout } from "../../../handle/common";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 📌 ดึง URL ปัจจุบัน

  const handleSubmit = async () => {
    const response = await handleLogout();
    if (response.success) {
      navigate("/login");
    } else {
      alert(response.error);
    }
  }

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <div className="text-2xl flex items-center gap-1 font-extrabold">
          <SiStudyverse className="text-3xl text-teal-500" />
          <p>EDUbridge</p>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/student-search"
              className={`transition-all duration-300 ${
                location.pathname.startsWith("/student-search") || location.pathname.startsWith("/student-search-results")
                  ? "text-blue-600 font-bold"
                  : "hover:text-[#00BFA5]"
              }`}
            >
              Search for Tutor
            </Link>
          </li>
          <li>
            <button className="hover:text-[#00BFA5] transition-all duration-300">
              <IoNotificationsOutline className="text-2xl" />
            </button>
          </li>
          <li>
            <Link
              to="/profile"
              className={`transition-all duration-300 ${
                location.pathname === "/student-profile" ? "text-blue-600 font-bold" : "hover:text-[#00BFA5]"
              }`}
            >
              My Profile
            </Link>
          </li>
          <li>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              // onClick={() => navigate("/student-logout")}
              onClick={handleSubmit}
            > 
              Log out
            </button>
          </li>
        </ul>

        {/* Mobile Menu (ถ้าต้องการเพิ่มในอนาคต) */}
      </div>
    </nav>
  );
};

export default StudentNavbar;