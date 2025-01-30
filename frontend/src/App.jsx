import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterStudentPage from "./pages/RegisterRole/RegisterStudentPage";
import RegisterTutorPage from "./pages/RegisterRole/RegisterTutorPage";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-student" element={<RegisterStudentPage />} />
        <Route path="/register-tutor" element={<RegisterTutorPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
