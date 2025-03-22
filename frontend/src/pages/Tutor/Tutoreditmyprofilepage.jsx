import React from "react";
import TutorNavbar from "../../components/Tutor/TutorNavbar";
import TutorEditProfile from "../../components/Tutor/TutorEditProfile";
import Footer from "../../components/homeComponents/footer/footer";

function TutormyProfilePage() {
  return (
    <>
      <TutorNavbar />
      <div className="pt-24 pb-24 bg-gray-100 min-h-screen flex flex-col items-center">
        <TutorEditProfile />
      </div>
      <Footer />
    </>
  );
}

export default TutormyProfilePage;
