import FAQSection from "../Components/homeComponents/FAQS/FAQSection";
import Hero from "../Components/homeComponents/Hero/Hero";
import Navbar from "../Components/homeComponents/Navbar/Navbar";
import NavbarBanner from "../Components/homeComponents/Navbar/NavbarBanner";
import Numbercounter from "../Components/homeComponents/Numbercounter/Numbercounter";
import TestimonialsSection from "../Components/homeComponents/TestimonialsSection/TestimonialsSection";
import Footer from "../Components/homeComponents/footer/Footer";

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

export default MainPage;
