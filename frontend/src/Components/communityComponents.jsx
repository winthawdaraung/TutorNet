import React from "react";
import { motion } from "framer-motion";
import communityImg from "../assets/CommunityImg.png";
import {
  FaDiscord,
  FaFacebook,
  FaTwitter,
  FaUsers,
  FaBookOpen,
  FaChalkboardTeacher,
} from "react-icons/fa";

const JoinCommunity = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 min-h-[80vh] flex flex-col md:flex-row items-center justify-center">
      {/* Left Section - Image for Desktop */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0"
      >
        <img
          src={communityImg}
          alt="Community Engagement"
          className="max-w-full w-[320px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px]"
        />
      </motion.div>

      {/* Right Section - Text */}
      <div className="text-center md:text-left max-w-xl space-y-6 md:w-1/2">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold lg:text-5xl text-gray-900"
        >
          Join <span className="text-[#E3B505]">Our Community</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Connect with like-minded students and expert tutors. Get access to
          exclusive study materials, discussions, and mentorship to boost your
          learning journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-[#2B7BA3]" />
            <p className="text-lg font-semibold text-gray-700">
              Join thousands of students worldwide in an engaging learning
              space.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaBookOpen className="text-3xl text-[#E3B505]" />
            <p className="text-lg font-semibold text-gray-700">
              Gain access to premium study materials curated by top educators.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaChalkboardTeacher className="text-3xl text-[#00BFA5]" />
            <p className="text-lg font-semibold text-gray-700">
              Engage with experienced mentors ready to guide you towards
              success.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center md:justify-start mt-6"
        >
          <a
            href="#"
            className="flex items-center gap-2 text-lg text-[#5865F2] font-semibold hover:underline transition-all duration-300"
          >
            <FaDiscord className="text-3xl" /> Join our Discord
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-lg text-[#1877F2] font-semibold hover:underline transition-all duration-300"
          >
            <FaFacebook className="text-3xl" /> Join on Facebook
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-lg text-[#1DA1F2] font-semibold hover:underline transition-all duration-300"
          >
            <FaTwitter className="text-3xl" /> Follow us on Twitter
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinCommunity;
