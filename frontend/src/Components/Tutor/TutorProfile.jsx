import { useNavigate } from "react-router-dom";
import tutorProfileDataMock from "../../mockData/TutorProfileData";
import defaultProfile from "../../assets/tutor/defaultProfile.png";
import { getTutorProfile } from "../../handle/tutor"
import { useEffect, useState } from "react";

function TutorProfile() {
  const navigate = useNavigate();
  const [tutorProfileData, setTutorProfileData] = useState(tutorProfileDataMock);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getTutorProfile();
        if (response.success) {
          console.log('Profile data:', response.data); // Debug log
          setTutorProfileData(response.data);
        } else {
          console.error("Failed to fetch tutor profile:", response.error);
          setTutorProfileData(tutorProfileDataMock);
        }
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        setTutorProfileData(tutorProfileDataMock);
      }
    };

    fetchProfile();
  }, []);

  if (!tutorProfileData) {
    return <div>Loading...</div>;
  }
  

  const {
    fullName,
    institution,
    qualification,
    rating,
    reviewsCount,
    aboutMe,
    aboutMySession,
    cv,
    availability,
    contactEmail,
    contactNumber,
    profileImageUrl,
    subjectsOffered,
    priceRate, // New property
  } = tutorProfileData;

  // Navigate to edit profile page when clicking the button
  const handleEditProfile = () => {
    navigate("/tutor/edit-profile");
    window.scrollTo(0, 0); // เลื่อนขึ้นบนสุดของหน้า
  };

  // Star rating renderer
  const renderStars = (count) => {
    return [...Array(count)].map((_, i) => (
      <span key={i} className="text-yellow-500">
        ★
      </span>
    ));
  };

  // Function to render the availability table
  const renderAvailabilityTable = () => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const timeSlots = [
      { key: "morning", label: "9-12 PM" },
      { key: "afternoon", label: "12-5 PM" },
      { key: "evening", label: "After 5 PM" },
    ];

    return (
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-r border-gray-300"></th>
            {timeSlots.map((slot) => (
              <th key={slot.key} className="p-2 border-r border-gray-300">
                {slot.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="text-center">
              <td className="p-2 border-b border-gray-300 border-r capitalize">
                {day}
              </td>
              {timeSlots.map((slot) => (
                <td
                  key={slot.key}
                  className="p-2 border-b border-gray-300 border-r"
                >
                  {availability[day][slot.key] ? (
                    <span className="text-teal-500 font-bold">✓</span>
                  ) : (
                    "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Update the displayProfileImage logic to handle server URLs
  const displayProfileImage = profileImageUrl
    ? `${profileImageUrl}` // Use the full URL from the server
    : defaultProfile;
  console.log(`../../../..${profileImageUrl}`);
  // Add CV display logic
  const displayCV = cv 
    ? `${cv}` // Use the full URL from the server
    : null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body">
          {/* Top Section with Image and Basic Info */}
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <img
                src={displayProfileImage}
                alt="Tutor profile"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
                onError={(e) => {
                  console.log('Image load error:', e); // Debug log
                  e.target.onerror = null;
                  e.target.src = defaultProfile;
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <p className="text-gray-600">
                {qualification}, {institution}
              </p>
              <div className="flex items-center mt-2">
                <div className="mr-2">{renderStars(rating)}</div>
                <span className="text-gray-600 text-sm">
                  ({reviewsCount} reviews)
                </span>
              </div>
              <div className="mt-2">
                <p className="text-teal-500 font-bold text-xl">
                  {priceRate}฿ per hour
                </p>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">About me</h2>
            <p className="text-gray-700">{aboutMe}</p>
          </div>

          {/* About My Session */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">About my session</h2>
            <p className="text-gray-700">{aboutMySession}</p>
          </div>

          {/* CV Section - Updated */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">CV</h2>
            {displayCV ? (
              <div className="relative">
                <img
                  src={displayCV}
                  alt="Tutor CV"
                  className="max-w-full h-auto border border-gray-300"
                  onError={(e) => {
                    console.log('CV load error:', e); // Debug log
                    e.target.style.display = 'none';
                    console.error('Failed to load CV image');
                  }}
                />
              </div>
            ) : (
              <p className="text-gray-500 italic">No CV uploaded</p>
            )}
          </div>

          {/* Subjects Offered */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Subjects Offered</h2>
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Subject</th>
                  <th className="px-4 py-2 border border-gray-300">Topic</th>
                </tr>
              </thead>
              <tbody>
                {subjectsOffered.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.subject}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.topic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Availability Table */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">General Availability</h2>
            {renderAvailabilityTable()}
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <p>
              <strong>Contact:</strong> {contactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {contactNumber}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6">
            <button
              onClick={handleEditProfile}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
            >
              Edit my profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
