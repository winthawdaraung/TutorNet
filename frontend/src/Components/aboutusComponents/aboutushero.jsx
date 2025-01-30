import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaEye, FaStar } from "react-icons/fa";
import aboutusIMG from "../../assets/aboutusIMG.png";

const AboutusHero = () => {
  const features = [
    {
      id: 1,
      title: "Our Mission",
      description:
        "We are dedicated to making quality education accessible to everyone through innovative online tutoring solutions.",
      icon: <FaBookOpen className="w-8 h-8 text-white" />,
    },
    {
      id: 2,
      title: "Our Vision",
      description:
        "To create a global learning community where knowledge flows freely between tutors and students, breaking down educational barriers.",
      icon: <FaEye className="w-8 h-8 text-white" />,
    },
    {
      id: 3,
      title: "Our Values",
      description:
        "Excellence, integrity, and innovation drive everything we do. We believe in personalized learning experiences and continuous improvement.",
      icon: <FaStar className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            About Us
          </h1>
          <p className="text-base md:text-xl text-base-content/70">
            We are dedicated to providing quality education and empowering
            students to achieve their academic goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100 rounded-xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6">
              Transforming Education Through Technology
            </h2>
            <p className="text-base-content/70 mb-4 md:mb-6">
              EDUbridge connects students with expert tutors in a seamless
              online environment. Our platform makes it easy to find the right
              tutor for your specific needs, schedule sessions at your
              convenience, and learn at your own pace.
            </p>
            <p className="text-base-content/70">
              Whether you are struggling with a specific subject or aiming to
              excel in your studies, our dedicated tutors are here to support
              your academic journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src={aboutusIMG}
              alt="Education Illustration"
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 bg-teal-500 p-4 rounded-xl mask mask-hexagon">
                  {feature.icon}
                </div>
                <h3 className="card-title text-xl md:text-2xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutusHero;
