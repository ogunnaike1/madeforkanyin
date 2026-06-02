"use client";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/Buttons";
import { PhotoFrame } from "@/components/PhotoFrame";
import { VideoCard } from "@/components/VideoCard";
import { STORY } from "@/lib/data";

const VIDEOS = [
  "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto/v1780326137/kanyin-5.jpeg_w1tk5b.mp4",
  "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto/v1780325529/kanyin-6.jpeg_gmtp59.mp4",
];

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Welcome({ onNext }: { onNext: () => void }) {
  const s = STORY[0];

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <div className="sec-head">
            <Reveal>
              <span className="sec-emoji">{s.emoji}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="ff-script sec-kicker">{s.kicker}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <h2 className="ff-serif sec-title">{s.title}</h2>
            </Reveal>
          </div>

          {s.paras.map((p, i) => (
            <Reveal key={i} delay={0.05 * i} className="para-wrap">
              <p className="ff-body para">{p}</p>
            </Reveal>
          ))}

          {/* photos */}
          {s.photos && (
            <div className="photos-block">
              {s.photoNote && (
                <Reveal className="photo-note-wrap">
                  <p className="ff-script photo-note">{s.photoNote}</p>
                </Reveal>
              )}
              <div className="photo-grid">
                {s.photos.map((p, i) => (
                  <PhotoFrame key={i} caption={p.caption} idx={i} src={p.src} />
                ))}
              </div>
            </div>
          )}

          {/* videos */}
          <div className="video-block">
            <Reveal className="photo-note-wrap">
              <p className="ff-script photo-note">and moving ones too…</p>
            </Reveal>
            <div className="video-grid">
              {VIDEOS.map((url, i) => (
                <VideoCard key={i} src={url} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="story-sec end-sec">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>Our Story →</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
