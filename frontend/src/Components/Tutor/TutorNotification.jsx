import { useState, useEffect } from "react";
// import TutorstudentreqData from "../../mockData/TutorstudentreqData";
import { getTutorProfile, declineStudentRequest, acceptStudentRequest } from "../../handle/tutor"; 

const TutorNotification = () => {

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reply, setReply] = useState("");
  const [studyLink, setStudyLink] = useState("");
  const [formData, setFormData] = useState({});
  const [tutorData, setTutorData] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getTutorProfile();
      setTutorData(response.data);
      if (response.success) {
        
        if (response.data?.requests && response.data.requests.length > 0) {
          // First sort by status (pending first), then by date (newest first)
          const sortedRequests = [...response.data.requests].sort((a, b) => {
            // If status is different, prioritize pending requests
            if (a.status === "accepted" && b.status !== "accepted") return 1;
            if (a.status !== "accepted" && b.status === "accepted") return -1;
            // If status is the same, sort by date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setRequests(sortedRequests);
        }
      } else {
        console.error("Failed to fetch tutor profile:", response.error);
      }
    } catch (error) {
      console.error("Error fetching tutor profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptClick = async (request) => {
    setSelectedRequest(request);
    console.log("Selected Request: ", request);
    setFormData({
      id: request.id,
      tutorName: tutorData.fullName,
      tutorImage: tutorData.profileImageUrl,
      subject: request.subject,
      date: request.date,
      time: request.time,
      studentId: request.studentId,
      reply: "",
      studyLink: ""
    });
  };

  const closePopup = () => {
    setSelectedRequest(null);
    setFormData(null);
    setReply("");
    setStudyLink("");
  };

  const handleSend = async() => {
    if (!reply.trim() || !studyLink.trim()) return;
    
    try {
      const updatedFormData = {
        ...formData,
        reply: reply,
        studyLink: studyLink
      };
      
      const response = await acceptStudentRequest(selectedRequest.id, updatedFormData);
      if (response && response.success) {
        console.log("Request accepted successfully");
        alert(`Request accepted successfully`);
        // Update the local state after successful acceptance
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req.id === selectedRequest.id ? {...req, status: "accepted"} : req
          )
        );
        closePopup();
      } else {
        console.error("Failed to accept request:", response?.error || "Unknown error");
        alert("Failed to accept request. Please try again.");
        closePopup();
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("An error occurred while accepting the request. Please try again.");
      closePopup();
    }
  };

  const handleDecline = async (id) => {
    setIsDeclining(true);
    try {
      const response = await declineStudentRequest(id);
      
      if (response && response.success) {
        setRequests((prev) => prev.filter((req) => req.id !== id));
        console.log("Request declined successfully");
      } else {
        console.error("Failed to decline request:", response?.error || "Unknown error");
        alert("Failed to decline request. Please try again.");
      }
    } catch (error) {
      console.error("Error declining request:", error);
      alert("An error occurred while declining the request. Please try again.");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } finally {
      setIsDeclining(false);
    }
  };

  // Optionally, add a visual separator between pending and accepted requests
  const renderRequestGroups = () => {
    const pendingRequests = requests.filter(req => req.status !== "accepted");
    const acceptedRequests = requests.filter(req => req.status === "accepted");
    
    return (
      <>
        {pendingRequests.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-6">Pending Requests</h3>
            {pendingRequests.map(renderRequestCard)}
          </>
        )}
        
        {acceptedRequests.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-6">Accepted Requests</h3>
            {acceptedRequests.map(renderRequestCard)}
          </>
        )}
      </>
    );
  };
  
  const renderRequestCard = (request) => (
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

      {request.status !== "accepted" && (
        <div className="flex justify-center md:absolute md:bottom-6 md:right-6 gap-4 mt-4 md:mt-0">
          <button
            onClick={() => handleDecline(request.id)}
            disabled={isDeclining}
            className={`bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-red-600 ${
              isDeclining ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isDeclining ? "Declining..." : "Decline"}
          </button>
          <button
            onClick={() => handleAcceptClick(request)}
            className="bg-teal-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-teal-600"
            disabled={isDeclining}
          >
            Accept
          </button>
        </div>
      )}
      {request.status === "accepted" && (
        <div className="flex justify-center md:absolute md:bottom-6 md:right-6 gap-4 mt-4 md:mt-0">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded transition-transform transform "
            disabled={true}
          >
            Accepted
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl px-4 md:px-8 py-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Study Requests
        </h2>

        {isLoading && (
          <p className="text-gray-600 text-center">Loading requests...</p>
        )}

        {!isLoading && requests.length === 0 && (
          <p className="text-gray-600 text-center">No pending requests</p>
        )}

        {!isLoading && requests.length > 0 && renderRequestGroups()}

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