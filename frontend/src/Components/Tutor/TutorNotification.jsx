import React, { useState, useEffect } from "react";
import TutorstudentreqData from "../../mockData/TutorstudentreqData";
import { getTutorProfile } from "../../handle/tutor";

const TutorNotification = () => {
  
  const [tutorProfileData, setTutorProfileData] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getTutorProfile();
        if (response.success) {
          setTutorProfileData(response.data);
        } else {
          console.error("Failed to fetch tutor profile:", response.error);
          setTutorProfileData(null);
        }
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        setTutorProfileData(null);
      }
    };

    fetchProfile();
  }, []);

  const [requests, setRequests] = useState(TutorstudentreqData);
  const [isLoading, setIsLoading] = useState(false);


  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reply, setReply] = useState("");
  const [studyLink, setStudyLink] = useState("");

  useEffect(() => {
    setRequests(tutorProfileData?.requests || []);
  }, [tutorProfileData]);

  const handleAcceptClick = (request) => {
    setSelectedRequest(request);
  };

  const closePopup = () => {
    setSelectedRequest(null);
    setReply("");
    setStudyLink("");
  };

  const handleSend = () => {
    if (!reply.trim() || !studyLink.trim()) return;
    alert(`Reply: ${reply}\nStudy Link: ${studyLink}`);
    closePopup();
  };

  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl px-4 md:px-8 py-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Study Requests
        </h2>

        {requests.length === 0 && (
          <p className="text-gray-600 text-center">No pending requests</p>
        )}

        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-md flex flex-col md:flex-row md:items-start w-full relative"
          >
            <div className="w-full flex flex-col items-center md:items-start md:flex-row">
              <img
                src={request.profileImageUrl}
                alt="Student profile"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-300 mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex flex-col flex-grow text-center md:text-left w-full">
                <p className="mb-2 font-medium">
                  <strong>Student Name:</strong> {request.studentName}
                </p>
                <p className="mb-2 font-medium">
                  <strong>Message:</strong> {request.studentText}
                </p>
                <p className="mb-2 font-medium">
                  <strong>Subject:</strong> {request.subject}
                </p>
                <p className="mb-2 font-medium">
                  <strong>Time:</strong> {request.time}
                </p>
                <p className="mb-2 font-medium">
                  <strong>Date:</strong> {request.date}
                </p>
              </div>
            </div>

            <div className="flex justify-center md:absolute md:bottom-6 md:right-6 gap-4 mt-4 md:mt-0">
              <button
                onClick={() => handleDecline(request.id)}
                className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-red-600"
              >
                Decline
              </button>
              <button
                onClick={() => handleAcceptClick(request)}
                className="bg-teal-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-teal-600"
              >
                Accept
              </button>
            </div>
          </div>
        ))}

        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Accept Student Request
              </h2>

              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="Reply back..."
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="Link to contact or study platform"
                value={studyLink}
                onChange={(e) => setStudyLink(e.target.value)}
              />

              <div className="flex justify-between">
                <button
                  onClick={closePopup}
                  className="bg-gray-400 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className={`px-4 py-2 rounded transition-transform transform hover:scale-105 ${
                    reply.trim() && studyLink.trim()
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!reply.trim() || !studyLink.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorNotification;
