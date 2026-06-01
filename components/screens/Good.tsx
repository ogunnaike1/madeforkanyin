"use client";
import { PrimaryButton } from "@/components/Buttons";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

export function Good({ onNext }: { onNext: () => void }) {
  const s = STORY[2]; // "the good"

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={s} />
          <SectionBody s={s} />
        </section>

        <section className="story-sec end-sec">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>The Bad &amp; The Ugly 🌧️</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
