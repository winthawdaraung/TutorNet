# Edubridge

## 📌 Project Overview
Edubridge is a web platform that connects students with tutors. Students can search for tutors, view their profiles, and send lesson requests. Tutors can manage their availability, accept or decline requests, and communicate with students through the platform.

## 🚀 Features
- **Student Registration & Profile Management**
- **Tutor Registration & Profile Management**
- **Tutor Search & Profile Viewing**
- **Lesson Request System** (Students send requests, tutors accept/decline)
- **Tutor Availability Management**
- **Notifications for Students & Tutors**
- **Meetup Link Sharing & Messaging**
- **Student Reviews for Tutors**

## 🛠️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Cloud Storage**: Cloudinary
- **Email Service**: Gmail SMTP

## ⚡ Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/winthawdaraung/Edubridge.git
cd Edubridge
```

### 2️⃣ Install dependencies
```sh
cd backend
npm install
cd ../frontend
npm install
```
### 3️⃣ Environment Variables
Create a `.env` file in the **backend** folder and configure the following:
```env
MONGO_URI=
NODE_ENV=development
PORT=5000
JWT_SECRET=EduBridge
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_SERVICE=gmail
EMAIL_USER=
EMAIL_PASSWORD=
JWT_RESET_SECRET=EduBridgeReset
FRONTEND_URL=http://localhost:5173
API_URL=http://localhost:5000
```
### 4️⃣ Run the development servers (Backend & Frontend)
Run the project:
```sh
cd backend
npm run dev
```


## 🖥️ Usage
1. **Students** can:
   - Register/Login
   - Search for tutors
   - View tutor profiles
   - Send lesson requests
   - Get notifications & respond to tutor messages
   - Review tutors after lessons

2. **Tutors** can:
   - Register/Login
   - Set up profiles & availability
   - Receive and manage student requests
   - Accept/decline requests with a custom message & meetup link
   - Get notified when students interact

## 👥 Contributors
- **66011642** May Thu Kyaw 
- **66011610** Win Thawdar Aung 
- **66010951** Achiraya Thanapassawat 
- **66010967** Benyapa Charatpreedalap 
- **66011005** Jhantharas Toojinda Suttivanich
