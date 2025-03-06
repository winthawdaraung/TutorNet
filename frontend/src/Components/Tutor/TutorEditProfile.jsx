import { useState, useEffect } from "react";
import Select from "react-select";
import tutorProfileDataMock from "../../mockData/TutorProfileData";
import defaultProfile from "../../assets/tutor/defaultProfile.png";
import { updateTutorProfile, getTutorProfile } from "../../handle/tutor";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [tutorProfileData, setTutorProfileData] = useState(tutorProfileDataMock);
  
  // Destructure tutorProfileData after initializing it
  const {
    fullName = "",
    institution = "",
    qualification = "",
    aboutMe = "",
    aboutMySession = "",
    priceRate = 0,
    contactEmail = "",
    contactNumber = "",
    profileImageUrl = "",
    cv = "",
    availability = {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    subjectsOffered = [{ subject: "", topic: "" }]
  } = tutorProfileData;

  const [formData, setFormData] = useState({
    fullName,
    institution,
    qualification,
    aboutMe,
    aboutMySession,
    priceRate,
    contactEmail,
    contactNumber,
  });

  // State for handling profile image uploads and preview
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();

  // State for handling CV uploads and preview (accepts JPG only)
  const [cvFile, setCVFile] = useState(null);
  const [cvPreview, setCVPreview] = useState(null);

  // State for availability and subjects
  const [avail, setAvail] = useState({
    mon: { morning: false, afternoon: false, evening: false },
    tue: { morning: false, afternoon: false, evening: false },
    wed: { morning: false, afternoon: false, evening: false },
    thu: { morning: false, afternoon: false, evening: false },
    fri: { morning: false, afternoon: false, evening: false },
    sat: { morning: false, afternoon: false, evening: false },
    sun: { morning: false, afternoon: false, evening: false }
  });
  const [subjects, setSubjects] = useState(subjectsOffered);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getTutorProfile();
        if (response.success) {
          setTutorProfileData(response.data);
          
          // Update preview images with current URLs
          if (response.data.profileImageUrl) {
            setPreviewImage(response.data.profileImageUrl);
          } else {
            setPreviewImage(defaultProfile);
          }
          if (response.data.cv) {
            setCVPreview(response.data.cv);
          }
          
          // Update form data when tutor profile is fetched
          const {
            fullName = "",
            institution = "",
            qualification = "",
            aboutMe = "",
            aboutMySession = "",
            priceRate = 0,
            contactEmail = "",
            contactNumber = "",
            profileImageUrl = "",
            availability = {
              monday: { morning: false, afternoon: false, evening: false },
              tuesday: { morning: false, afternoon: false, evening: false },
              wednesday: { morning: false, afternoon: false, evening: false },
              thursday: { morning: false, afternoon: false, evening: false },
              friday: { morning: false, afternoon: false, evening: false },
              saturday: { morning: false, afternoon: false, evening: false },
              sunday: { morning: false, afternoon: false, evening: false }
            },
            subjectsOffered = [{ subject: "", topic: "" }]
          } = response.data;
          
          // Update all state variables with fetched data
          setFormData({
            fullName,
            institution,
            qualification,
            aboutMe,
            aboutMySession,
            priceRate,
            contactEmail,
            contactNumber,
          });
          
          setAvail(availability);
          setSubjects(subjectsOffered);
        } else {
          console.error("Failed to fetch tutor profile:", response.error);
          setTutorProfileData(tutorProfileDataMock); // Use mock data if fetching fails
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

  // Options for react-select (subjects dropdown)
  const availableSubjects = [
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    { value: "History", label: "History" },
    // Add more subjects here if needed
  ];

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image file selection and preview generation
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle CV file selection and preview generation (JPG only)
  const handleCVChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCVFile(file);
      setCVPreview(URL.createObjectURL(file));
      console.log("CV file selected:", file);
      console.log("CV preview URL:", URL.createObjectURL(file));
    }
  };

  // Toggle availability for a given day and time slot
  const handleAvailabilityChange = (day, slot) => {
    setAvail((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot],
      },
    }));
  };

  // Handle subject or topic changes in the subjects array
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setSubjects(updatedSubjects);
  };

  // Add a new subject entry (empty values will show placeholders)
  const addSubject = () => {
    setSubjects((prev) => [...prev, { subject: "", topic: "" }]);
  };

  // Remove a subject entry by index
  const removeSubject = (index) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission (front-end only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      availability: avail,
      subjectsOffered: subjects.map(subject => ({
        subject: subject.subject || '',
        topic: subject.topic || ''
      })),
      selectedImage: selectedImage,
      cvFile: cvFile
    };

    try {
      const response = await updateTutorProfile(updatedData);
      if (response.success) {
        alert("Profile updated successfully!");
        navigate("/tutor/profile");
      } else {
        alert(`Failed to update profile: ${response.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };

  // Update the availability table render function
  const renderAvailabilityTable = () => {
    // Define only the days we want to show
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const timeSlots = ['morning', 'afternoon', 'evening'];

    return (
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-r border-gray-300"></th>
            {timeSlots.map((slot) => (
              <th key={slot} className="p-2 border-r border-gray-300 capitalize">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="text-center">
              <td className="p-2 border border-gray-300 capitalize">
                {day}
              </td>
              {timeSlots.map((slot) => (
                <td key={slot} className="p-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={avail[day]?.[slot] || false}
                    onChange={() => handleAvailabilityChange(day, slot)}
                    className="w-5 h-5 text-teal-500"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body p-3 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="Type your full name..."
                />
              </div>

              {/* Institution */}
              <div>
                <label
                  htmlFor="institution"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="e.g. University Name"
                />
              </div>

              {/* Qualification */}
              <div>
                <label
                  htmlFor="qualification"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="e.g. Bachelor's, Master's"
                />
              </div>

              {/* Price Rate */}
              <div>
                <label
                  htmlFor="priceRate"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Price Rate (per hour)
                </label>
                <input
                  type="number"
                  id="priceRate"
                  name="priceRate"
                  value={formData.priceRate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="e.g. 50"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="you@example.com"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  placeholder="e.g. +1 555 1234"
                />
              </div>
            </div>

            {/* About Me */}
            <div className="mt-4">
              <label
                htmlFor="aboutMe"
                className="block mb-1 font-semibold text-sm sm:text-base"
              >
                About Me
              </label>
              <textarea
                id="aboutMe"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                rows="3"
                placeholder="Brief introduction about yourself..."
              ></textarea>
            </div>

            {/* About My Session */}
            <div className="mt-4">
              <label
                htmlFor="aboutMySession"
                className="block mb-1 font-semibold text-sm sm:text-base"
              >
                About My Session
              </label>
              <textarea
                id="aboutMySession"
                name="aboutMySession"
                value={formData.aboutMySession}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                rows="3"
                placeholder="What do you teach in your session?..."
              ></textarea>
            </div>

            {/* Profile Image and CV Upload in a row on larger screens */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Profile Image Upload */}
              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  Profile Image
                </label>
                <div className="flex items-center space-x-2">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border border-gray-300"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label
                  htmlFor="cvUpload"
                  className="block mb-1 font-semibold text-sm sm:text-base"
                >
                  CV (JPG only)
                </label>
                <div className="flex items-center space-x-2">
                  {cvPreview && (
                    <img
                      src={cvPreview}
                      alt="CV Preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-300"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="cvUpload"
                      accept="image/jpeg"
                      onChange={handleCVChange}
                      className="w-full text-sm"
                    />
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Please upload your CV as a .jpg file.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Table */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Availability</h2>
              {renderAvailabilityTable()}
            </div>

            {/* Subjects Offered */}
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Subjects Offered
              </h2>
              {subjects.map((subjectItem, index) => {
                // Convert the subject string into a matching option for react-select
                const selectedOption = availableSubjects.find(
                  (option) => option.value === subjectItem.subject
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-4"
                  >
                    <div className="w-full sm:w-60">
                      <Select
                        className="basic-single text-sm"
                        classNamePrefix="select"
                        options={availableSubjects}
                        value={selectedOption || null}
                        onChange={(option) =>
                          handleSubjectChange(index, "subject", option?.value)
                        }
                        placeholder="Select a subject..."
                        isSearchable
                      />
                    </div>

                    <input
                      type="text"
                      value={subjectItem.topic}
                      onChange={(e) =>
                        handleSubjectChange(index, "topic", e.target.value)
                      }
                      placeholder="Type the topic..."
                      className="p-2 border border-gray-300 rounded w-full sm:w-auto text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addSubject}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
              >
                Add Subject
              </button>
            </div>

            {/* Submit Button */}
            <div className="mt-6 sm:mt-8">
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 sm:px-6 py-2 rounded hover:bg-teal-600 transition text-sm sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;