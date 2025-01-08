import { Routes, Route } from "react-router-dom";
import FAQSection from "../Components/homeComponents/FAQS/FAQSection";
import Hero from "../Components/homeComponents/Hero/Hero";
import Navbar from "../Components/homeComponents/Navbar/Navbar";
import NavbarBanner from "../Components/homeComponents/Navbar/NavbarBanner";
import Numbercounter from "../Components/homeComponents/Numbercounter/Numbercounter";
import TestimonialsSection from "../Components/homeComponents/TestimonialsSection/TestimonialsSection";
import Footer from "../Components/homeComponents/footer/Footer";
import HowItWorks from "./HowItWorks";
import AboutUs from "./AboutUs";

const MainPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <NavbarBanner />
      <Hero />
      <Numbercounter />
      <FAQSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
};

export default Home;
