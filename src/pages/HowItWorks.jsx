import Navbar from "../Components/homeComponents/Navbar/Navbar";
import HIWhero from "../Components/HowItWorksComponents/HIWhero";
import Footer from "../Components/homeComponents/footer/Footer";
const HowItWorks = () => {
  // Also changed the component name from App to HowItWorks
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HIWhero />
      <Footer />
    </main>
  );
};
export default HowItWorks;
