import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import Community from "./pages/Community";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterStudentPage from "./pages/RegisterRole/RegisterStudentPage";
import RegisterTutorPage from "./pages/RegisterRole/RegisterTutorPage";
import ResetPassword from "./pages/ResetPassword";

//Student Pages
import StudentSearchPage from "./pages/Student/StudentSearchPage";
import StudentSearchResultPage from "./pages/Student/StudentSearchResultPage";
import StudentNotificationsPage from "./pages/Student/StudentNotificationsPage";
import StudentViewTutorPage from "./pages/Student/StudentViewTutorPage";
import StudentRequestPage from "./pages/Student/StudentRequestPage";
import StudentProfile from "./pages/Student/StudentProfile";
import EditStudentProfile from "./pages/Student/EditStudentProfile";
//Tutor Pages
import TutormyProfilePage from "./pages/Tutor/Tutormyprofilepage";
import TutorEditProfile from "./pages/Tutor/Tutoreditmyprofilepage";
import TutorNotificationPage from "./pages/Tutor/Tutornotificationpage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/community" element={<Community />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-student" element={<RegisterStudentPage />} />
        <Route path="/register-tutor" element={<RegisterTutorPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Student Pages */}
        <Route path="/student-search" element={<StudentSearchPage />} />
        <Route
          path="/student-search-results"
          element={<StudentSearchResultPage />}
        />
        <Route
         path="/search"
         element={<StudentSearchResultPage />}  //ensure the route exist for studentsearchpage
         />
        <Route
          path="/student-notifications"
          element={<StudentNotificationsPage />}
        />
        <Route path="/student-request/:id" element={<StudentRequestPage />} />
        {/* <Route
          path="/student-view-tutor-profile"
          element={<StudentViewTutorPage />}
        /> */}
        <Route path="/tutor-profile/:id" element={<StudentViewTutorPage/>} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/student-edit-profile" element={<EditStudentProfile />} />
        {/* 📌 Tutor Pages (Navbar will be handled inside the pages themselves) */}
        <Route path="/tutor/profile" element={<TutormyProfilePage />} />
        <Route path="/tutor/edit-profile" element={<TutorEditProfile />} />
        <Route
          path="/tutor/notifications"
          element={<TutorNotificationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;