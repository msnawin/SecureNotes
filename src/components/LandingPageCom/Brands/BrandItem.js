import React from "react";
import { motion } from "framer-motion";

const BrandItem = ({ text, icon: Icon, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card hover:border-vault-500/20 hover:shadow-glow flex flex-col pt-7 pb-10 px-6 items-center gap-4 justify-center transition-all duration-300 group"
    >
      <Icon className="text-vault-400 text-5xl group-hover:scale-110 transition-transform duration-300" />
      <h3 className="text-xl text-surface-100 font-bold font-outfit">{title}</h3>
      <p className="text-surface-400 text-center text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
};

export default BrandItem;
