"use client";
import { PrimaryButton } from "@/components/Buttons";
import { PhotoFrame } from "@/components/PhotoFrame";
import { VideoCard } from "@/components/VideoCard";
import { CinematicVideo } from "@/components/CinematicVideo";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, Paras, PullQuote } from "./StoryUtils";

const STORY_VIDEO = "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto:good,w_720,br_800k/v1780326125/kanyin-14_gnuncu.mp4";

const NEW_VIDEO = "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto:good,w_480,br_600k/v1780431619/kanyin-video_szvpp2.mp4";

export function Story({ onNext }: { onNext: () => void }) {
  const s = STORY[1]; // "our story"

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={s} />
          <Paras list={s.paras} />
          {s.quote && <PullQuote>{s.quote}</PullQuote>}
          <Paras list={s.parasAfter} />

          {/* new video — above the photos */}
          <div className="video-block">
            <div className="video-grid" style={{ justifyContent: "center" }}>
              <VideoCard src={NEW_VIDEO} idx={0} label="us 🤍" />
            </div>
          </div>

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

          <CinematicVideo src={STORY_VIDEO} />
        </section>

        <section className="story-sec end-sec">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>The Good ☀️</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
