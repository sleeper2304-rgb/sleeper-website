"use client";

import { motion } from "framer-motion";

export function SectionTransition() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto h-px w-[calc(100%-2.5rem)] max-w-[1460px] bg-gradient-to-r from-transparent via-ink/20 to-transparent md:w-[calc(100%-4.5rem)]"
    />
  );
}
