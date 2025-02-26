import React from "react";
import TutorNavbar from "../../components/Tutor/TutorNavbar";
import TutorProfile from "../../components/Tutor/TutorProfile";
import Footer from "../../components/homeComponents/footer/footer";
function TutormyProfilePage() {
  return (
    <>
      <TutorNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div>
          <TutorProfile />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TutormyProfilePage;
