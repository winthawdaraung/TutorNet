import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* About Us */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-semibold mb-6">About Us</h3>
            <p className="text-gray-300 leading-relaxed text-center lg:text-left">
              We are dedicated to providing quality education and empowering
              students to achieve their full potential through innovative
              learning methods.
            </p>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-6 w-full max-w-md">
              <a
                href="mailto:EDUbridge@education.com"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="bg-slate-800 p-3 rounded-full group-hover:bg-slate-700 transition-colors">
                  <MdEmail size={20} />
                </div>
                <span>EDUbridge@education.com</span>
              </a>
              <a
                href="tel:+66555123456"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="bg-slate-800 p-3 rounded-full group-hover:bg-slate-700 transition-colors">
                  <MdPhone size={20} />
                </div>
                <span>+66 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="bg-slate-800 p-3 rounded-full">
                  <MdLocationOn size={20} />
                </div>
                <div className="text-left">
                  1 Soi Chalongkrung 1.
                  <br />
                  Ladkrabang, Ladkrabang.
                  <br />
                  BKK, 10520, TH
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} EDUbridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
