"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CinematicVideo({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState("");
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Preload src when 400px away
    const preloadObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); preloadObserver.disconnect(); } },
      { rootMargin: "400px", threshold: 0 }
    );

    // Play/pause when in view
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    preloadObserver.observe(el);
    playObserver.observe(el);
    return () => { preloadObserver.disconnect(); playObserver.disconnect(); };
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !activeSrc) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [inView, activeSrc]);

  return (
    <motion.div
      ref={wrapRef}
      className="cv-outer"
      initial={{ opacity: 0, y: 50, rotateX: -10, scale: 0.94 }}
      animate={entered ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      whileHover={{ scale: 1.025 }}
    >
      <motion.div
        className="cv-glow-border"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="cv-frame">
        {activeSrc && (
          <video
            ref={videoRef}
            src={activeSrc}
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="cv-video"
          />
        )}

        <div className="cv-grain" aria-hidden="true" />

        <motion.div
          className="cv-bar cv-bar-top"
          animate={{ scaleY: inView ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="cv-bar cv-bar-bottom"
          animate={{ scaleY: inView ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="cv-overlay"
          animate={{ opacity: inView && activeSrc ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="cv-play"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <span className="cv-play-icon">▶</span>
          </motion.div>
          <p className="ff-script cv-play-label">our story</p>
        </motion.div>

        <div className="cv-vignette" />
      </div>

      <motion.p
        className="ff-script cv-caption"
        animate={{ opacity: inView ? 1 : 0.45, y: inView ? 0 : 6 }}
        transition={{ duration: 0.35 }}
      >
        a little piece of time, saved forever 🎞️
      </motion.p>
    </motion.div>
  );
}
