import { HashRouter, Routes, Route } from "react-router-dom";
import FAQSection from "../Components/homeComponents/FAQS/FAQSection";
import Hero from "../Components/homeComponents/Hero/Hero";
import Navbar from "../Components/homeComponents/Navbar/Navbar";
import NavbarBanner from "../Components/homeComponents/Navbar/NavbarBanner";
import Numbercounter from "../Components/homeComponents/Numbercounter/Numbercounter";
import TestimonialsSection from "../Components/homeComponents/TestimonialsSection/TestimonialsSection";
import Footer from "../Components/homeComponents/footer/Footer";
//Remember that React components must always start with a capital letter na
import HowItWorks from "./HowItWorks";
import AboutUs from "./AboutUs";

const Home = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="overflow-x-hidden">
              <Navbar />
              <NavbarBanner />
              <Hero />
              <Numbercounter />
              <FAQSection />
              <TestimonialsSection />
              <Footer />
            </main>
          }
        />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </HashRouter>
  );
};

export default Home;
