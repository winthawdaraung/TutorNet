import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavbarBanner = () => {
  const [isOpen, setIsOpen] = React.useState(true); // Changed to true to show by default

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-indigo-50 text-indigo-900 px-4 py-3 text-center relative"
        >
          Are you a university or school student that looking for an online
          tutoring partnership?{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 font-semibold ml-1 hover:underline transition-all duration-200"
          >
            Talk to us
          </a>
          <div
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800 text-lg"
            onClick={() => setIsOpen(false)}
          >
            x
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarBanner;
