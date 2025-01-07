import React from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: "1",
      title: "Sign In",
      description:
        "Create your account in just a few clicks. We keep your information secure and private.",
      icon: <FaUserPlus size={24} />,
      color: "bg-teal-500",
    },
    {
      id: "2",
      title: "Choose Your Role",
      description:
        "Select whether you want to be a tutor or a student. Each role has its own tailored experience.",
      icon: <FaUsers size={24} />,
      color: "bg-teal-500",
    },
    {
      id: "3",
      title: "Start Learning",
      description:
        "Begin your educational journey! Connect with tutors or students and achieve your goals together.",
      icon: <IoSchool size={24} />,
      color: "bg-teal-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is easy! Follow these simple steps to begin your
            learning journey.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={itemVariants}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 flex items-center justify-center text-gray-600 text-lg font-medium">
                {step.id}
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center text-center">
                <motion.div
                  className={`${step.color} p-4 rounded-xl mask mask-hexagon mb-6 flex items-center justify-center`}
                  variants={iconVariants}
                >
                  {React.cloneElement(step.icon, { className: "text-white" })}
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
