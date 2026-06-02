"use client";
import { PrimaryButton } from "@/components/Buttons";
import { CinematicVideo } from "@/components/CinematicVideo";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

const STORY_VIDEO = "https://res.cloudinary.com/dhmqhless/video/upload/f_mp4,vc_h264,q_auto:good,w_720,br_800k/v1780326125/kanyin-14_gnuncu.mp4";

export function Story({ onNext }: { onNext: () => void }) {
  const s = STORY[1]; // "our story"

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={s} />
          <SectionBody s={s} />
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
