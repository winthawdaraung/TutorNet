import React from "react";
import TutorNavbar from "../../components/Tutor/TutorNavbar";
import TutorNotification from "../../components/Tutor/TutorNotification";
import Footer from "../../components/homeComponents/footer/footer";
function TutorNotificationPage() {
  return (
    <>
      <TutorNavbar />
      <div className="pt-16 pb-16 bg-gray-100 min-h-screen flex flex-col items-center">
        <TutorNotification />
      </div>
      <Footer />
    </>
  );
}

export default TutorNotificationPage;
