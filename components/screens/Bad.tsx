"use client";
import { PrimaryButton } from "@/components/Buttons";
import { VideoCard } from "@/components/VideoCard";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

const BAD_VIDEOS = [
  "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto/v1780325537/kanyin-16_s2buix.mov",
  "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto/v1780326118/kanyin-17_tbc9hp.mov",
];

export function Bad({ onNext }: { onNext: () => void }) {
  const bad    = STORY[3];
  const wishes = STORY[4];

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={bad} />
          <SectionBody s={bad} />

          <div className="video-block">
            <Reveal className="photo-note-wrap">
              <p className="ff-script photo-note">but look at her though… 🤍</p>
            </Reveal>
            <div className="video-grid">
              {BAD_VIDEOS.map((url, i) => (
                <VideoCard
                  key={i}
                  src={url}
                  idx={i}
                  label={i === 0 ? "through it all 🌧️" : "still standing 💪🏾"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="story-sec">
          <SectionHead s={wishes} />
          <SectionBody s={wishes} />
        </section>

        <section className="story-sec end-sec">
          <Reveal>
            <p className="ff-body more-tease">but wait…</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>There&apos;s more 👀</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
