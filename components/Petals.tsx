"use client";
import { useState, useEffect } from "react";

interface PetalItem {
  id: number;
  left: number;
  size: number;
  delay: number;
  dur: number;
  drift: number;
  glyph: string;
  op: number;
}

export function Petals({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<PetalItem[]>([]);

  useEffect(() => {
    const glyphs = ["❀", "✿", "♡", "❁", "✦"];
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 20,
        delay: -Math.random() * 18,
        dur: 16 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 60,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        op: 0.12 + Math.random() * 0.25,
      }))
    );
  }, [count]);

  if (items.length === 0) return null;

  return (
    <div className="petals" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
            opacity: p.op,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
