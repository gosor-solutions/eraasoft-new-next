"use client";

import { motion } from "motion/react";

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  fadeIn:    { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

export default function FadeInSection({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
