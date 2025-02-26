import HeroImg from "../../../assets/HeroImg.png";
import { motion } from "framer-motion";
import { slideRight } from "../../../utility/animation";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Big info*/}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={slideRight(0.3)}
              initial="hidden"
              animate="visible"
              className="text-[#2B7BA3] uppercase font-semibold tracking-wide"
            >
              Quality Education Made Easy
            </motion.p>
            <motion.h1
              variants={slideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
              Smart <span className="text-[#E3B505]">Tutor</span> Matching,
              Smarter Learning
            </motion.h1>
            <motion.p
              variants={slideRight(0.9)}
              initial="hidden"
              animate="visible"
            >
              Browse expert tutors across all subjects and connect instantly.
              Your perfect study match is just a click away.
            </motion.p>
            {/* button section */}
            <motion.div
              variants={slideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start mt-8"
            >
              <button
                className="primary-btn"
                onClick={() => navigate("/login")}
              >
                Get Started Now
              </button>
              <button
                className="secondary-btn"
                onClick={() => navigate("/community")}
              >
                Join Our Community
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              delay: 0.5,
              damping: 20,
              mass: 1.2,
              duration: 1.2,
            }}
            src={HeroImg}
            alt="Students learning together"
            className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[500px] xl:w-[550px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
