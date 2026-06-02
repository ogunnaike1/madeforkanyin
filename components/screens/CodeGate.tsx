"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/Buttons";
import { CONFIG } from "@/lib/data";

export function CodeGate({ onUnlock, onCorrect }: { onUnlock: () => void; onCorrect?: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = val.trim().toLowerCase();
    const answer = String(CONFIG.secretCode).trim().toLowerCase();
    if (guess === answer) {
      setOk(true);
      setErr(false);
      onCorrect?.();           // fires immediately — inside the click gesture
      setTimeout(onUnlock, 1100);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 600);
    }
  };

  return (
    <div className="screen center">
      <motion.form
        onSubmit={submit}
        className={"glass code-card " + (err ? "shake" : "")}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={
          ok
            ? { opacity: 0, scale: 1.05, filter: "blur(6px)", transition: { duration: 0.9 } }
            : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } }
        }
      >
        <motion.div
          className="lock"
          animate={ok ? { rotate: [0, -12, 0], scale: [1, 1.25, 1] } : {}}
          transition={{ duration: 0.7 }}
        >
          {ok ? "💝" : "🔒"}
        </motion.div>

        <p className="ff-script code-greet">Happy Birthday,</p>
        <h2 className="ff-serif code-name">{CONFIG.fullName}</h2>
        <p className="ff-body code-sub">
          Enter your code to come in.
        </p>

        <div className="code-input-wrap">
          <input
            className="ff-body code-input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Enter your birthday code…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {CONFIG.codeHint && (
          <p className={"ff-body code-hint " + (err ? "err" : "")}>
            {err
              ? "Hmm, not quite… try again 💗"
              : "psst — " + CONFIG.codeHint}
          </p>
        )}

        <PrimaryButton type="submit" className="code-btn">
          Unlock
        </PrimaryButton>
      </motion.form>
    </div>
  );
}
