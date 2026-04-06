"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sequence = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1600&q=80"
];

export function HeroImageSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [20, -28]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-14, -8]);

  return (
    <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
      <motion.div style={{ y: y1 }} className="relative aspect-[4/5] overflow-hidden bg-ink/5">
        <Image src={sequence[0]} alt="Sleeper sequence 1" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
      </motion.div>

      <div className="grid gap-4 md:gap-6">
        <motion.div style={{ y: y2 }} className="relative aspect-[5/4] overflow-hidden bg-ink/5">
          <Image src={sequence[1]} alt="Sleeper sequence 2" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="relative aspect-[5/4] overflow-hidden bg-ink/5">
          <Image src={sequence[2]} alt="Sleeper sequence 3" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
