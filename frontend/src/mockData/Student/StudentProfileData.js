const studentProfileData = {
    fullName: "Jonathan LoveThailand",
    institution: "Nottingham University",
    qualification: "Cyber Security",
    profileImageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    aboutMe: "I am a passionate tutor who loves sharing knowledge with students. I have extensive experience in computer science and enjoy helping others achieve their learning goals.",
    aboutMySession: "My sessions focus on practical problem-solving and hands-on exercises. I encourage students to ask questions and explore various techniques to master each topic.",
    cvDownload: "https://www.orimi.com/pdf-test.pdf",
    contactEmail: "jonathan@example.com",
    contactNumber: "123-456-7890",
    subjectsOffered: [
      { subject: "Programming", topic: "Data Structure" },
      { subject: "Cyber Security", topic: "Ethical Hacking" },
      { subject: "Maths", topic: "A Level" },
    ],
    availability: {
      timezone: "GMT+1",
      mon: { morning: true, afternoon: false, evening: true },
      tue: { morning: false, afternoon: true, evening: true },
      wed: { morning: true, afternoon: false, evening: false },
      thu: { morning: true, afternoon: true, evening: false },
      fri: { morning: false, afternoon: false, evening: true },
      sat: { morning: true, afternoon: true, evening: false },
      sun: { morning: false, afternoon: false, evening: false },
    },
    reviews: [
      {
        id: "rev-001",
        studentId: "stu-123",
        reviewerName: "Emily R.",
        courseName: "Cyber Security Basics",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
        comment: "Jonathan is an excellent tutor! He made complex cybersecurity concepts easy to understand. Highly recommend!",
        date: "2024-02-10",
      },
      {
        id: "rev-002",
        studentId: "stu-456",
        reviewerName: "Michael B.",
        courseName: "Advanced Data Structures",
        avatar: "https://randomuser.me/api/portraits/men/27.jpg",
        rating: 4,
        comment: "Very knowledgeable and explains things well. Would love to have more hands-on exercises though.",
        date: "2024-02-08",
      },
      {
        id: "rev-003",
        studentId: "stu-789",
        reviewerName: "Sophia W.",
        courseName: "Ethical Hacking Fundamentals",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 4.5,
        comment: "Helped me gain confidence in ethical hacking. The sessions were interactive and fun!",
        date: "2024-01-28",
      },
    ],
  };
  
  // ✅ คำนวณค่าเฉลี่ยของ `rating` และจำนวน `reviewsCount`
  studentProfileData.reviewsCount = studentProfileData.reviews.length;
  studentProfileData.rating = studentProfileData.reviews.length
    ? studentProfileData.reviews.reduce((sum, review) => sum + review.rating, 0) / studentProfileData.reviews.length
    : 0;
  
  export default studentProfileData;