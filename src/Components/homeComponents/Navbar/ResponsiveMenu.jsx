import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { NavbarMenu } from "../../../mockData/HomeNavbardata"; // ปรับ path ตามโครงสร้างไฟล์
import { Link } from "react-router-dom";
// คอมโพเนนต์ปุ่มที่มีการเปลี่ยนสีเมื่อคลิก
const MenuButton = ({ title, link }) => {
  // สถานะการคลิกปุ่ม
  const [isClicked, setIsClicked] = useState(false);

  // ฟังก์ชันจัดการการคลิก - เปลี่ยนสีและรีเซ็ตหลัง 300ms
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <Link to={link}>
      <motion.button
        whileTap={{ scale: 0.95 }} // เอฟเฟกต์ย่อขนาดเมื่อกด
        onClick={handleClick}
        className={`${
          isClicked ? "text-yellow-300" : "text-white" // เปลี่ยนสีข้อความเมื่อคลิก
        } bg-[#00BFA5] font-semibold rounded-full px-6 py-2 hover:bg-teal-600 transition-all duration-300`}
      >
        {title}
      </motion.button>
    </Link>
  );
};

// เพิ่ม PropTypes สำหรับ MenuButton
MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const ResponsiveMenu = ({ isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-[#00BFA5]/95 text-white p-6 md:p-10 m-4 md:m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              {NavbarMenu.map((item) => (
                <MenuButton key={item.id} title={item.title} link={item.link} />
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ResponsiveMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default ResponsiveMenu;
