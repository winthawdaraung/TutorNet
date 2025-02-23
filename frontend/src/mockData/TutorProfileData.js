// src/mockData/tutorProfileData.js
const tutorProfileData = {
  // ข้อมูลจากการลงทะเบียน
  fullName: "Jonathan S.",
  institution: "Northwestern University",
  qualification: "PhD in Computer Science",
  rating: 5,
  reviewsCount: 3,

  // เนื้อหาเกี่ยวกับโปรไฟล์
  aboutMe:
    "I am a passionate tutor who loves sharing knowledge with students. I have extensive experience in computer science and enjoy helping others achieve their learning goals.",
  aboutMySession:
    "My sessions focus on practical problem-solving and hands-on exercises. I encourage students to ask questions and explore various techniques to master each topic.",

  // CV - จะเป็นข้อความย่อหรือลิงก์ไปไฟล์ PDF ก็ได้
  cv: "https://example.com/my-cv.jpg",

  // ตารางเวลา (availability) ตัวอย่าง
  availability: {
    mon: { morning: true, afternoon: true, evening: false },
    tue: { morning: false, afternoon: true, evening: true },
    wed: { morning: true, afternoon: false, evening: false },
    thu: { morning: true, afternoon: true, evening: true },
    fri: { morning: false, afternoon: false, evening: false },
    sat: { morning: true, afternoon: false, evening: true },
    sun: { morning: false, afternoon: false, evening: false },
  },

  // ช่องทางการติดต่อ
  contactEmail: "jonathan@example.com",
  contactNumber: "123-456-7890",

  // New property for profile picture
  profileImageUrl: "https://example.com/pfp.jpg",

  // Each item has a subject and a topic
  subjectsOffered: [
    { subject: "Programming", topic: "Data Structure" },
    { subject: "Programming", topic: "Web Programming" },
    { subject: "Programming", topic: "Python" },
    { subject: "Math", topic: "A Level" },
    { subject: "Math", topic: "GCSE" },
  ],

  priceRate: 350,
};

export default tutorProfileData;
