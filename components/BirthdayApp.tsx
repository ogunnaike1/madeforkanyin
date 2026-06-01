"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glow } from "@/components/Glow";
import { Petals } from "@/components/Petals";
import { MusicButton } from "@/components/MusicButton";
import { Landing } from "@/components/screens/Landing";
import { CodeGate } from "@/components/screens/CodeGate";
import { Intro } from "@/components/screens/Intro";
import { Welcome } from "@/components/screens/Welcome";
import { Story } from "@/components/screens/Story";
import { Good } from "@/components/screens/Good";
import { Bad } from "@/components/screens/Bad";
import { Interlude } from "@/components/screens/Interlude";
import { Final } from "@/components/screens/Final";
import { CONFIG } from "@/lib/data";

type Step = "landing" | "code" | "intro" | "welcome" | "story" | "good" | "bad" | "interlude" | "final";
const STEPS: Step[] = ["landing", "code", "intro", "welcome", "story", "good", "bad", "interlude", "final"];

export function BirthdayApp() {
  const [step, setStep] = useState<Step>("landing");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kanyin_step") as Step | null;
    if (saved && STEPS.includes(saved)) setStep(saved);
  }, []);

  useEffect(() => {
    if (!CONFIG.musicUrl) return;
    const audio = new Audio(CONFIG.musicUrl);
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  const startMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a || !CONFIG.musicUrl) return;
    a.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  }, [playing]);

  const go = useCallback((next: Step) => {
    localStorage.setItem("kanyin_step", next);
    window.scrollTo({ top: 0, behavior: "auto" });
    setStep(next);
  }, []);

  const goBack = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) go(STEPS[idx - 1]);
  }, [step, go]);

  const handleUnlock = useCallback(() => { go("intro"); }, [go]);

  const isStory = ["welcome", "story", "good", "bad"].includes(step);
  const musicVisible = !!CONFIG.musicUrl && step !== "landing" && step !== "code";
  const showBack = step !== "landing";

  const screen = (() => {
    switch (step) {
      case "landing":   return <Landing onNext={() => go("code")} />;
      case "code":      return <CodeGate onUnlock={handleUnlock} onCorrect={startMusic} />;
      case "intro":     return <Intro onNext={() => go("welcome")} />;
      case "welcome":   return <Welcome onNext={() => go("story")} />;
      case "story":     return <Story onNext={() => go("good")} />;
      case "good":      return <Good onNext={() => go("bad")} />;
      case "bad":       return <Bad onNext={() => go("interlude")} />;
      case "interlude": return <Interlude onNext={() => go("final")} />;
      case "final":     return <Final onReplay={() => go("story")} />;
      default:          return <Landing onNext={() => go("code")} />;
    }
  })();

  return (
    <div className="app-root">
      <Glow />
      <Petals count={step === "final" ? 0 : 16} />
      <MusicButton playing={playing} visible={musicVisible} onToggle={toggleMusic} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="page"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: isStory ? "blur(0px)" : "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {screen}
        </motion.div>
      </AnimatePresence>

      {/* back button — top left */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            className="back-btn"
            title="Go back"
            onClick={goBack}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
          >
            ←
          </motion.button>
        )}
      </AnimatePresence>

      {/* restart — top right */}
      {step !== "landing" && (
        <button
          className="restart-btn"
          title="Start over"
          onClick={() => {
            const a = audioRef.current;
            if (a) { a.pause(); setPlaying(false); }
            localStorage.removeItem("kanyin_step");
            go("landing");
          }}
        >
          ⟲
        </button>
      )}
    </div>
  );
}
