import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterStudentPage from "./pages/RegisterRole/RegisterStudentPage";
import RegisterTutorPage from "./pages/RegisterRole/RegisterTutorPage";
import ResetPassword from "./pages/ResetPassword";

// 📌 เพิ่มหน้าใหม่
import StudentSearchPage from "./pages/Student/StudentSearchPage";
import StudentSearchResultPage from "./pages/Student/StudentSearchResultPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้า Public */}
        <Route path="/" element={<Home />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-student" element={<RegisterStudentPage />} />
        <Route path="/register-tutor" element={<RegisterTutorPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 📌 หน้า Student */}
        <Route path="/student-search" element={<StudentSearchPage />} />
        <Route path="/student-search-results" element={<StudentSearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;