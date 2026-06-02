"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface VideoCardProps {
  src: string;
  idx?: number;
  label?: string;
}

const DEFAULT_LABELS = ["just her doing her thing ✨", "she's everything 💖"];

export function VideoCard({ src, idx = 0, label }: VideoCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const inView = useInView(wrapRef, { amount: 0.5 });

  // Auto-play when scrolled into view (works on mobile), pause when out
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
      className="vc-wrap"
      initial={{ opacity: 0, y: 48, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04, zIndex: 20 }}
    >
      <motion.div
        className="vc-ring"
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.96 }}
        transition={{ duration: 0.4 }}
      />

      <div className="vc-inner">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="auto"
          className="vc-video"
          onLoadedMetadata={() => setLoaded(true)}
        />

        {/* overlay fades once playing */}
        <motion.div
          className="vc-overlay"
          animate={{ opacity: inView ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="vc-play-btn"
            animate={{ scale: hovered ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="vc-play-icon">▶</span>
          </motion.div>
        </motion.div>

        {!loaded && <div className="vc-shimmer" />}
      </div>

      <motion.p
        className="ff-script vc-label"
        animate={{ opacity: inView ? 1 : 0.5, y: inView ? 0 : 4 }}
        transition={{ duration: 0.3 }}
      >
        {label ?? DEFAULT_LABELS[idx % DEFAULT_LABELS.length]}
      </motion.p>
    </motion.div>
  );
}
