import React from "react";
import { NavbarMenu } from "../../../mockData/HomeNavbardata";
import { SiStudyverse } from "react-icons/si";
import { IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsopen] = React.useState(false);

  // Handle button click
  const handleClick = (buttonType) => {
    alert(`${buttonType} button clicked!`);
  };

  return (
    <>
      <nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="container flex justify-between items-center py-6">
            {/* Logo section */}
            <div className="text-2xl flex items-center gap-1 font-extrabold">
              <SiStudyverse className="text-3xl text-teal-500" />
              <p>EDUbridge</p>
            </div>

            {/* Menu section */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="/"
                      className="inline-block text-black text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button section */}
            <div className="hidden lg:block space-x-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="font-semibold text-black hover:text-teal-500 transition-all duration-300"
                onClick={() => handleClick("Sign In")}
              >
                Sign in
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-white bg-[#00BFA5] font-semibold rounded-full px-6 py-2 hover:bg-teal-600 transition-all duration-300"
                onClick={() => handleClick("Register")}
              >
                Register
              </motion.button>
            </div>

            {/* Phone Hamburger Menu */}
            <div className="lg:hidden" onClick={() => setIsopen(!isOpen)}>
              <IoMenu className="text-4xl" />
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Phone slide bar */}
      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar;
