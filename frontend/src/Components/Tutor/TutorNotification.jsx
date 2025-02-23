import React, { useState } from "react";
import TutorstudentreqData from "../../mockData/TutorstudentreqData";

const TutorNotification = () => {
  const [requests, setRequests] = useState(TutorstudentreqData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reply, setReply] = useState("");
  const [studyLink, setStudyLink] = useState("");

  // Open Accept Popup
  const handleAcceptClick = (request) => {
    setSelectedRequest(request);
  };

  // Close Popup
  const closePopup = () => {
    setSelectedRequest(null);
    setReply("");
    setStudyLink("");
  };

  // Handle Send Reply (Only if fields are filled)
  const handleSend = () => {
    if (!reply.trim() || !studyLink.trim()) return;
    alert(`Reply: ${reply}\nStudy Link: ${studyLink}`);
    closePopup();
  };

  // Handle Decline (Remove Notification)
  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Main Container */}
      <div className="w-full max-w-5xl px-6 md:px-12 lg:px-20 py-10">
        {/* Page Title */}
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Study Requests
        </h2>

        {/* If No Requests Remain */}
        {requests.length === 0 && (
          <p className="text-gray-600 text-center">No pending requests</p>
        )}

        {/* Request Cards */}
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-300 rounded-lg p-6 mb-6 flex flex-col md:flex-row items-start w-full shadow-md relative"
          >
            {/* Student Profile Image */}
            <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <img
                src={request.profileImageUrl}
                alt="Student profile"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>

            {/* Request Details */}
            <div className="flex flex-col justify-center flex-grow text-center md:text-left">
              <p className="mb-2">
                <strong>Student Name:</strong> {request.studentName}
              </p>
              <p className="mb-2">
                <strong>Message:</strong> {request.studentText}
              </p>
              <p className="mb-2">
                <strong>Subject:</strong> {request.subject}
              </p>
              <p className="mb-4">
                <strong>Time:</strong> {request.time}
              </p>
            </div>

            {/* Buttons Positioned at Bottom-Right */}
            <div className="absolute bottom-6 right-6 flex gap-4">
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

        {/* Accept Request Popup */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Accept Student Request
              </h2>

              {/* Reply Input */}
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="Reply back..."
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              {/* Contact Link Input */}
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="Link to contact or study platform"
                value={studyLink}
                onChange={(e) => setStudyLink(e.target.value)}
              />

              {/* Popup Buttons */}
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
