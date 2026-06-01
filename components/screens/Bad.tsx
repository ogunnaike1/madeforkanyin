"use client";
import { PrimaryButton } from "@/components/Buttons";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

export function Bad({ onNext }: { onNext: () => void }) {
  const bad    = STORY[3]; // "the bad & the ugly"
  const wishes = STORY[4]; // "everything I want for you this year"

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={bad} />
          <SectionBody s={bad} />
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
