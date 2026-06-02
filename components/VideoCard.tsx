"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  src: string;
  idx?: number;
  label?: string;
}

const DEFAULT_LABELS = ["just her doing her thing ✨", "she's everything 💖"];

export function VideoCard({ src, idx = 0, label }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleHoverStart = () => {
    setHovered(true);
    ref.current?.play().catch(() => {});
  };

  const handleHoverEnd = () => {
    setHovered(false);
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <motion.div
      className="vc-wrap"
      initial={{ opacity: 0, y: 48, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.04, zIndex: 20 }}
    >
      <motion.div
        className="vc-ring"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.96 }}
        transition={{ duration: 0.4 }}
      />

      <div className="vc-inner">
        <video
          ref={ref}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          className="vc-video"
          onLoadedMetadata={() => setLoaded(true)}
        />

        <motion.div
          className="vc-overlay"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.35 }}
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
        animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.3 }}
      >
        {label ?? DEFAULT_LABELS[idx % DEFAULT_LABELS.length]}
      </motion.p>
    </motion.div>
  );
}
