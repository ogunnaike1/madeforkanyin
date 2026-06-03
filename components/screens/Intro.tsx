"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "@/components/Buttons";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Intro({ onNext }: { onNext: () => void }) {
  const lines = ["Today is not just any day…", "It's YOUR day 🎉"];
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const [line1, done1] = useTypewriter(lines[0], 52, 600);
  const [line2, done2] = useTypewriter(step >= 1 ? lines[1] : "", 60, 300);

  // Start line 2 after line 1 finishes
  useEffect(() => {
    if (done1 && step === 0) {
      const t = setTimeout(() => setStep(1), 800);
      return () => clearTimeout(t);
    }
  }, [done1, step]);

  // Show button only after line 2 fully types out — with a beat of pause
  useEffect(() => {
    if (step >= 1 && done2) {
      const t = setTimeout(() => setShowButton(true), 700);
      return () => clearTimeout(t);
    }
  }, [step, done2]);

  return (
    <div className="screen center">
      <div className="stack intro-stack">
        <motion.p
          className="ff-serif type-line"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {line1}
          {!done1 && <span className="caret" />}
        </motion.p>

        <AnimatePresence>
          {step >= 1 && (
            <motion.p
              className="ff-serif type-line big"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {line2}
              {!done2 && <span className="caret" />}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
