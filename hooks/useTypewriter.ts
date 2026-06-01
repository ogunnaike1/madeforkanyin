"use client";
import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed = 55, startDelay = 300) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const startT = setTimeout(function tick() {
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        t = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      clearTimeout(startT);
      clearTimeout(t);
    };
  }, [text, speed, startDelay]);

  return [out, done] as const;
}
