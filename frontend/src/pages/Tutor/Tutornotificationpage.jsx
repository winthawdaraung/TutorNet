import React from "react";
import TutorNavbar from "../../components/Tutor/TutorNavbar";
import TutorNotification from "../../components/Tutor/TutorNotification";
import Footer from "../../components/homeComponents/footer/footer";

function TutorNotificationPage() {
  return (
    <>
      <TutorNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div>
          <TutorNotification />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TutorNotificationPage;
