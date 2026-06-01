"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GhostButton } from "@/components/Buttons";
import { QUIZ } from "@/lib/data";

type Phase = "quiz" | "gift" | "count";

export function Interlude({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (phase !== "count") return;
    if (count <= 0) {
      const t = setTimeout(onNext, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [phase, count, onNext]);

  return (
    <div className="screen center">
      <AnimatePresence mode="wait">
        {phase === "quiz" && (
          <motion.div
            key="quiz"
            className="stack quiz-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ff-serif quiz-q">{QUIZ.question}</h2>
            <div className="quiz-opts">
              {QUIZ.options.map((o, i) => (
                <GhostButton key={i} onClick={() => setPhase("gift")}>
                  {o}
                </GhostButton>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "gift" && (
          <motion.div
            key="gift"
            className="stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="ff-script tap-hint">tap the gift</p>
            <motion.button
              className="gift-btn"
              onClick={() => setPhase("count")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: [0, -6, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              🎁
            </motion.button>
            <p className="ff-body tiny-note">go on… 💗</p>
          </motion.div>
        )}

        {phase === "count" && (
          <motion.div key="count" className="center-abs">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                className="ff-serif countdown"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.8 }}
                transition={{ duration: 0.5 }}
              >
                {count > 0 ? count : "♡"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
