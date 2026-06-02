"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  src: string;
  idx?: number;
  label?: string;
}

const DEFAULT_LABELS = ["Natural Talent ✨", "she's everything 💖"];

export function VideoCard({ src, idx = 0, label }: VideoCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState(""); // lazy — empty until near viewport
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Load src when 300px away from viewport
    const preloadObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); preloadObserver.disconnect(); } },
      { rootMargin: "300px", threshold: 0 }
    );

    // Play/pause when actually visible
    const playObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
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
      className="vc-wrap"
      initial={{ opacity: 0, y: 48, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="vc-ring"
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.96 }}
        transition={{ duration: 0.4 }}
      />

      <div className="vc-inner">
        {activeSrc && (
          <video
            ref={videoRef}
            src={activeSrc}
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="vc-video"
            onLoadedMetadata={() => setLoaded(true)}
          />
        )}

        <motion.div
          className="vc-overlay"
          animate={{ opacity: inView && loaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="vc-play-btn">
            <span className="vc-play-icon">▶</span>
          </div>
        </motion.div>

        {(!loaded || !activeSrc) && <div className="vc-shimmer" />}
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
