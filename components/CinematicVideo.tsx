"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function CinematicVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // once:false so it pauses when scrolled away
  const inView = useInView(wrapRef, { amount: 0.4 });
  // separate one-shot for the entrance animation
  const entered = useInView(wrapRef, { once: true, amount: 0.4 });

  // Auto-play when in view, pause when out
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [inView]);

  return (
    <motion.div
      ref={wrapRef}
      className="cv-outer"
      initial={{ opacity: 0, y: 50, rotateX: -10, scale: 0.94 }}
      animate={entered ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.025 }}
    >
      <motion.div
        className="cv-glow-border"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="cv-frame">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="auto"
          className="cv-video"
        />

        <div className="cv-grain" aria-hidden="true" />

        {/* letterbox bars retract when playing */}
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

        {/* overlay fades when playing */}
        <motion.div
          className="cv-overlay"
          animate={{ opacity: inView ? 0 : 1 }}
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
