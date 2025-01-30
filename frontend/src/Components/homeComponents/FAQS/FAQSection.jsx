import React from "react";
import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Does EDUbridge handle payments between students and tutors?",
      answer:
        "No, EDUbridge does not facilitate payments. Any financial transactions are arranged independently between students and tutors.",
    },
    {
      question: "Can I use EDUbridge if I’m not a student or tutor?",
      answer:
        "At the moment, EDUbridge is designed specifically for students and tutors.",
    },
    {
      question: "How do I know if a tutor is qualified?",
      answer:
        "Tutor profiles include their qualifications, experience, and reviews from other students to help you make an informed decision.",
    },
    {
      question: "What should I include in my tutor profile?",
      answer:
        "Include details about your educational background, teaching experience, subjects you specialize in, and your availability.",
    },
    {
      question: "How do I find a tutor on EDUbridge?",
      answer:
        "You can use search filters like subjects, location, and reviews to find a tutor that matches your preferences. Or you can post your learning requirements, and tutors who are interested will respond by clicking the Interested button or commenting.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-b from-[#EAFBFF80] to-white py-16"
    >
      <div data-theme="mytheme" className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our tutoring services
          </p>
        </motion.div>

        <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="carousel-item w-96"
            >
              <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold text-primary">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 text-gray-500"
        >
          <p>← Swipe to see more questions →</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQSection;
