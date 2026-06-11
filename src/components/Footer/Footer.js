import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-surface-950 border-t border-white/[0.06] py-6 lg:py-2 min-h-28 z-50 relative">
      <div className="xl:px-10 sm:px-6 px-4 min-h-28 flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center">
        <ul className="flex flex-1 md:gap-6 gap-4 text-surface-400 flex-row items-center font-inter text-sm">
          <li>
            <Link to="/about">
              <span className="hover:text-vault-400 transition-colors duration-200">About Us</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="hover:text-vault-400 transition-colors duration-200">Services</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span className="hover:text-vault-400 transition-colors duration-200">Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="hover:text-vault-400 transition-colors duration-200">Privacy Policy</span>
            </Link>
          </li>
        </ul>

        <p className="w-fit flex items-center text-surface-500 text-sm font-inter">
          <span>&copy;{currentYear} RookVault Notes | All rights reserved.</span>
        </p>

        <div className="flex-1 flex flex-row gap-4 lg:justify-end justify-start items-center">
          <Link
            className="text-surface-500 border h-9 w-9 flex justify-center items-center border-white/[0.1] rounded-full p-2 hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300"
            to="https://facebook.com"
          >
            <FaFacebookF width={18} height={18} />
          </Link>{" "}
          <Link
            className="text-surface-500 border h-9 w-9 flex justify-center items-center border-white/[0.1] rounded-full p-2 hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300"
            to="https://facebook.com"
          >
            <FaLinkedinIn width={18} height={18} />
          </Link>{" "}
          <Link
            className="text-surface-500 border h-9 w-9 flex justify-center items-center border-white/[0.1] rounded-full p-2 hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300"
            to="https://facebook.com"
          >
            <FaTwitter width={18} height={18} />
          </Link>{" "}
          <Link
            className="text-surface-500 border h-9 w-9 flex justify-center items-center border-white/[0.1] rounded-full p-2 hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300"
            to="https://facebook.com"
          >
            <FaInstagram width={18} height={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
