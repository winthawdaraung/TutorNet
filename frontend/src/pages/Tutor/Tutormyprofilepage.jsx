import React from "react";
import TutorNavbar from "../../components/Tutor/TutorNavbar";
import TutorProfile from "../../components/Tutor/TutorProfile";
import Footer from "../../components/homeComponents/footer/footer";
function TutormyProfilePage() {
  return (
    <>
      <TutorNavbar />
      <div className="pt-24 pb-24 bg-gray-100 min-h-screen flex flex-col items-center">
        <TutorProfile />
      </div>

      <Footer />
    </>
  );
}

export default TutormyProfilePage;
