"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function CinematicVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleHoverStart = () => {
    setHovered(true);
    ref.current?.play().then(() => setPlaying(true)).catch(() => {});
  };

  const handleHoverEnd = () => {
    setHovered(false);
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <motion.div
      ref={wrapRef}
      className="cv-outer"
      initial={{ opacity: 0, y: 50, rotateX: -10, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.025 }}
    >
      {/* glowing border on hover */}
      <motion.div
        className="cv-glow-border"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="cv-frame">
        <video
          ref={ref}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          className="cv-video"
        />

        {/* film grain */}
        <div className="cv-grain" aria-hidden="true" />

        {/* letterbox bars */}
        <motion.div
          className="cv-bar cv-bar-top"
          animate={{ scaleY: hovered ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="cv-bar cv-bar-bottom"
          animate={{ scaleY: hovered ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* play overlay */}
        <motion.div
          className="cv-overlay"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="cv-play"
            animate={{ scale: playing ? 0.8 : [1, 1.06, 1] }}
            transition={playing ? { duration: 0.3 } : { repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <span className="cv-play-icon">▶</span>
          </motion.div>
          <p className="ff-script cv-play-label">our story</p>
        </motion.div>

        {/* vignette always on */}
        <div className="cv-vignette" />
      </div>

      <motion.p
        className="ff-script cv-caption"
        animate={{ opacity: hovered ? 1 : 0.45, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.35 }}
      >
        a little piece of time, saved forever 🎞️
      </motion.p>
    </motion.div>
  );
}
