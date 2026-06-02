"use client";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/Buttons";

const item = {
  hidden: { opacity: 0, y: 12 },
  show: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: custom * 0.5 + 0.3 },
  }),
};

export function Landing({ onNext }: { onNext: () => void }) {
  return (
    <div className="screen center">
      <motion.div
        className="stack"
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="ff-serif hook-line"
          custom={0}
          variants={item}
        >
          Hey… I have<br />something for you
          <span className="hook-heart"> ❤️</span>
        </motion.h1>
        <motion.div custom={1} variants={item}>
          <PrimaryButton onClick={onNext}>Click to begin</PrimaryButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
