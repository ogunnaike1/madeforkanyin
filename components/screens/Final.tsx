"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Confetti } from "@/components/Confetti";
import { PhotoFrame } from "@/components/PhotoFrame";
import { GhostButton } from "@/components/Buttons";
import { CONFIG } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

export function Final({ onReplay }: { onReplay: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen center final-screen">
      <Confetti run={show} />
      <motion.div
        className="stack final-stack"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.45, delayChildren: 0.3 } },
        }}
      >
        <motion.p className="ff-script final-kicker" variants={fadeUp}>
          happy birthday
        </motion.p>

        <motion.h1 className="ff-script final-name" variants={popIn}>
          {CONFIG.displayName}{" "}
          <span className="final-heart">❤️</span>
        </motion.h1>

        <motion.div className="final-photo-wrap" variants={fadeUp}>
          <PhotoFrame
            caption="the birthday girl ✨"
            idx={1}
            src="https://res.cloudinary.com/dhmqhless/image/upload/v1780325536/kanyin-9_u1wu9k.jpg"
          />
        </motion.div>

        <motion.p className="ff-serif final-sub" variants={fadeUp}>
          You mean more to me than you know…
        </motion.p>

        <motion.div className="final-actions" variants={fadeUp}>
          <GhostButton onClick={onReplay}>read it again ↺</GhostButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
