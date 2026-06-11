import React from "react";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";

const TestimonialItem = ({ title, text, name, status, imgurl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card hover:border-vault-500/20 hover:shadow-glow flex flex-col p-6 justify-between transition-all duration-300 group"
    >
      <div>
        <h1 className="text-surface-100 font-outfit text-2xl font-bold pb-4">
          {title}
        </h1>
        <p className="text-sm text-surface-400 leading-relaxed">{text}</p>
      </div>

      <div className="pt-5 flex gap-3 items-center border-t border-white/[0.06] mt-6">
        <Avatar alt={name} src={imgurl} sx={{ border: "2px solid rgba(16,185,129,0.2)" }} />
        <div className="flex flex-col">
          <span className="font-semibold text-surface-200 font-outfit text-sm">{name}</span>
          <span className="text-xs text-surface-500 font-medium">{status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialItem;
