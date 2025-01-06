import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Testimonialprofile1 from "../../../assets/Testimonialimg/Testimonialprofile1.jpg";
import Testimonialprofile2 from "../../../assets/Testimonialimg/Testimonialprofile2.jpg";
import Testimonialprofile3 from "../../../assets/Testimonialimg/Testimonialprofile3.jpg";
import Testimonialprofile4 from "../../../assets/Testimonialimg/Testimonialprofile4.jpg";
import Testimonialprofile5 from "../../../assets/Testimonialimg/Testimonialprofile5.jpg";

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const baseTestimonials = [
    {
      name: "Ritah K.",
      role: "Student",
      image: Testimonialprofile1,
      comment:
        "Finding a tutor was so simple! The website is user-friendly, and I was matched with the perfect tutor for my needs in just minutes. Highly recommend it to anyone looking for reliable tutoring!",
      rating: 5,
    },
    {
      name: "Mark Ferguson",
      role: "Student",
      image: Testimonialprofile2,
      comment:
        "The platform offers so much flexibility in choosing tutors who match my schedule. I’ve had lessons at home and online, making learning so much more accessible.",
      rating: 5,
    },
    {
      name: "Kristen Sinclair",
      role: "Student",
      image: Testimonialprofile3,
      comment:
        "I struggled with economics for years, but thanks to this website, I found a tutor who explained complex theories in a way I could understand. I even aced my university finals for the first time!",
      rating: 5,
    },
    {
      name: " Sophia Bolton",
      role: "Student",
      image: Testimonialprofile4,
      comment:
        " love how I can schedule lessons whenever I want, even after school or on weekends. Plus, my tutor makes learning so fun—it doesn’t even feel like studying",
      rating: 5,
    },
    {
      name: "Jenny D.",
      role: "Student",
      image: Testimonialprofile5,
      comment:
        "This site helped me find the perfect English tutor to prep for my IELTS. They gave me great tips and practice tests, and I scored higher than I expected!",
      rating: 5,
    },
  ];

  // Optimized duplicate array
  const testimonials = [...baseTestimonials, ...baseTestimonials];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(() => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveSlide(index % baseTestimonials.length);
      });
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [baseTestimonials.length]);

  const handleDotClick = (index) => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const cardWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-teal-500 font-semibold mb-2"
          >
            OUR TESTIMONIALS
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900"
          >
            What Our Students Say About Us
          </motion.h2>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="carousel carousel-center w-full p-4 space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="carousel-item flex-shrink-0 snap-start"
              >
                <div className="card w-96 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full ring ring-teal-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {testimonial.comment}
                    </p>
                    <div className="flex gap-1 mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: 0.1 + i * 0.1, // Each star appears with a slight delay
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="text-yellow-400" // Make stars yellow
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {baseTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeSlide
                    ? "w-8 h-2 bg-teal-500"
                    : "w-2 h-2 bg-gray-300 hover:bg-teal-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
