"use client";
import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/PhotoFrame";
import { StorySection } from "@/lib/data";

export function Reveal({
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
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ s }: { s: StorySection }) {
  return (
    <div className="sec-head">
      <Reveal><span className="sec-emoji">{s.emoji}</span></Reveal>
      <Reveal delay={0.08}><p className="ff-script sec-kicker">{s.kicker}</p></Reveal>
      <Reveal delay={0.16}><h2 className="ff-serif sec-title">{s.title}</h2></Reveal>
    </div>
  );
}

export function Paras({ list }: { list?: string[] }) {
  if (!list) return null;
  return (
    <>
      {list.map((p, i) => (
        <Reveal key={i} delay={0.05 * i} className="para-wrap">
          <p className="ff-body para">{p}</p>
        </Reveal>
      ))}
    </>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="pullquote-wrap">
      <blockquote className="ff-serif pullquote">
        <span className="q-mark">&ldquo;</span>
        {children}
      </blockquote>
    </Reveal>
  );
}

export function SectionBody({ s }: { s: StorySection }) {
  return (
    <>
      <Paras list={s.paras} />
      {s.quote && <PullQuote>{s.quote}</PullQuote>}
      <Paras list={s.parasAfter} />
      {s.quote2 && <PullQuote>{s.quote2}</PullQuote>}

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

      {s.wishlist && (
        <div className="wishlist">
          {s.wishlist.map((w, i) => (
            <Reveal key={i} delay={0.06 * i} className="wish-row">
              <span className="wish-dot">✦</span>
              <span className="ff-body wish-txt">{w}</span>
            </Reveal>
          ))}
        </div>
      )}

      {s.blessing && (
        <div className="blessing">
          {s.blessing.map((b, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <p className="ff-serif blessing-line">{b}</p>
            </Reveal>
          ))}
        </div>
      )}

      {s.closing && (
        <Reveal>
          <p className="ff-script closing-line">{s.closing}</p>
        </Reveal>
      )}
    </>
  );
}
