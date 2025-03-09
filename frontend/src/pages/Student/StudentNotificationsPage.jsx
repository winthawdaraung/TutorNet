import { useState, useEffect } from "react";
import StudentNavbar from "../../Components/Student/StudentNavbar/StudentNavbar";
import Footer from "../../Components/homeComponents/footer/Footer";
import NotificationCard from "../../Components/Student/StudentNotifications/NotificationCard";
import NotificationPopup from "../../Components/Student/StudentNotifications/NotificationPopup";
import ReviewForm from "../../Components/Student/StudentNotifications/ReviewForm";
// import studentNotifications from "../../mockData/Student/StudentNotifications";
import { getStudentProfile } from "../../handle/student"; // Assuming this import was missing

const StudentNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [reviewNotification, setReviewNotification] = useState(null);

  useEffect(() => {
    // // Sort mock data initially if needed
    // const sortedMockNotifications = [...studentNotifications].sort((a, b) => {
    //   return new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt);
    // });
    // setNotifications(sortedMockNotifications);
    
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getStudentProfile();
      if (response.success) {
        
        // Sort notifications by timestamp (newest first)
        if (response.data.notification && response.data.notification.length > 0) {
          const sortedNotifications = [...response.data.notification].sort((a, b) => {
            return new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt);
          });
          setNotifications(sortedNotifications);
        }
      } else {
        console.error("Failed to fetch student profile:", response.error);
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

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
                  onLeaveReview={handleLeaveReview}
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