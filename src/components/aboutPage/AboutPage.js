import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
//import aboutImage from "./path/to/your/image.jpg"; // Add your image path here

const AboutPage = () => {
  return (
    <div className="p-8 min-h-screen">
      <div className="md:w-2/3 mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-surface-100 font-outfit">
          About <span className="text-gradient">RookVault Notes</span>
        </h1>
        <p className="mb-6 text-surface-400 leading-relaxed">
          Welcome to RookVault Notes, your trusted companion for secure and private
          note-taking. We believe in providing a safe space where your thoughts
          and ideas are protected with the highest level of security. Our
          mission is to ensure that your notes are always accessible to you and
          only you. With state-of-the-art encryption and user-friendly features,
          RookVault Notes is designed to keep your information confidential and
          secure.
        </p>

        <ul className="list-none mb-6 space-y-3 px-2">
          <li className="flex items-start gap-3 text-surface-300">
            <span className="text-vault-400 mt-1">▸</span>
            Add an extra layer of security with two-factor authentication.
          </li>
          <li className="flex items-start gap-3 text-surface-300">
            <span className="text-vault-400 mt-1">▸</span>
            Your notes are encrypted from the moment you create them.
          </li>
          <li className="flex items-start gap-3 text-surface-300">
            <span className="text-vault-400 mt-1">▸</span>
            Access your notes from anywhere with the assurance that they are
            stored securely.
          </li>
          <li className="flex items-start gap-3 text-surface-300">
            <span className="text-vault-400 mt-1">▸</span>
            Our app is designed to be intuitive and easy to use.
          </li>
        </ul>
        <div className="flex space-x-3 mt-10">
          <Link className="text-surface-400 rounded-full p-2.5 bg-white/[0.05] border border-white/[0.1] hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300" to="/">
            <FaFacebookF size={20} />
          </Link>
          <Link className="text-surface-400 rounded-full p-2.5 bg-white/[0.05] border border-white/[0.1] hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300" to="/">
            <FaTwitter size={20} />
          </Link>
          <Link className="text-surface-400 rounded-full p-2.5 bg-white/[0.05] border border-white/[0.1] hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300" to="/">
            <FaLinkedinIn size={20} />
          </Link>
          <Link className="text-surface-400 rounded-full p-2.5 bg-white/[0.05] border border-white/[0.1] hover:text-vault-400 hover:border-vault-500/30 hover:bg-vault-500/5 transition-all duration-300" to="/">
            <FaInstagram size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
