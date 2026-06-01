"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "@/components/Buttons";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Intro({ onNext }: { onNext: () => void }) {
  const lines = ["Today is not just any day…", "It's YOUR day 🎉"];
  const [step, setStep] = useState(0);
  const [line1, done1] = useTypewriter(lines[0], 52, 500);
  const [line2, done2] = useTypewriter(step >= 1 ? lines[1] : "", 60, 200);

  useEffect(() => {
    if (done1 && step === 0) {
      const t = setTimeout(() => setStep(1), 700);
      return () => clearTimeout(t);
    }
  }, [done1, step]);

  return (
    <div className="screen center">
      <div className="stack intro-stack">
        <p className="ff-serif type-line">
          {line1}
          {!done1 && <span className="caret" />}
        </p>
        {step >= 1 && (
          <p className="ff-serif type-line big">
            {line2}
            {!done2 && <span className="caret" />}
          </p>
        )}
        <AnimatePresence>
          {done2 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
