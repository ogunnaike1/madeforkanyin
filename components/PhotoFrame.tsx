"use client";
import { motion } from "framer-motion";

interface PhotoFrameProps {
  caption: string;
  idx?: number;
  src?: string;
}

export function PhotoFrame({ caption, idx = 0, src }: PhotoFrameProps) {
  const tilt = [-4, 3, -2, 4][idx % 4];
  return (
    <motion.figure
      className="polaroid"
      style={{ rotate: `${tilt}deg` }}
      initial={{ opacity: 0, y: 40, rotate: `${tilt + 8}deg` }}
      whileInView={{ opacity: 1, y: 0, rotate: `${tilt}deg` }}
      whileHover={{ scale: 1.03, rotate: "0deg", zIndex: 5 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: idx * 0.12 }}
    >
      <div className="polaroid-img">
        {src ? (
          <img src={src} alt={caption} />
        ) : (
          <div className="photo-ph">
            <span className="photo-ph-ic">♡</span>
            <span className="photo-ph-txt">your photo here</span>
          </div>
        )}
      </div>
      <figcaption className="ff-script">{caption}</figcaption>
    </motion.figure>
  );
}
