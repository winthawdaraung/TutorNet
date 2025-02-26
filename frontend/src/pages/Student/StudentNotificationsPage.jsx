import { useState } from "react";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import NotificationCard from "../../Components/Student/StudentNotifications/NotificationCard";
import NotificationPopup from "../../Components/Student/StudentNotifications/NotificationPopup";
import ReviewForm from "../../Components/Student/StudentNotifications/ReviewForm"; // ✅ Import Review Modal
import studentNotifications from "../../mockData/Student/StudentNotifications";

const StudentNotificationsPage = () => {
  const [notifications, setNotifications] = useState(studentNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [reviewNotification, setReviewNotification] = useState(null);

  const handleViewResponse = (notification) => {
    setSelectedNotification(notification);
  };

  const handleLeaveReview = (notification) => {
    setReviewNotification(notification);
  };

  const closePopup = () => {
    setSelectedNotification(null);
  };

  const closeReview = () => {
    setReviewNotification(null);
  };

  const submitReview = (review) => {
    console.log("✅ Review Submitted:", review);
    setNotifications((prev) => prev.filter((notif) => notif.tutorName !== review.tutorName));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <StudentNavbar />
  
      <main className="flex-grow flex justify-center pt-24 pb-10">
        <div className="w-full max-w-5xl px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Study Notifications</h2>
  
          <div className="max-h-[550px] overflow-y-auto px-2">
            {notifications.length === 0 ? (
              <p className="text-gray-500 italic text-center">No notifications.</p>
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onLeaveReview={handleLeaveReview} // ✅ Update
                  onViewResponse={handleViewResponse}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {selectedNotification && <NotificationPopup notification={selectedNotification} onClose={closePopup} />}
      {reviewNotification && <ReviewForm notification={reviewNotification} onClose={closeReview} onSubmit={submitReview} />}
  
      <Footer />
    </div>
  );
};

export default StudentNotificationsPage;