"use client";
import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  rot: number;
  vr: number;
  color: string;
  heart: boolean;
  sway: number;
}

export function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!run) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      if (!canvas) return;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
    }
    size();
    window.addEventListener("resize", size);

    const colors = ["#ff6b81", "#ffd0d8", "#f3d79b", "#e8c27a", "#b7a4e0", "#ffffff"];
    const N = 160;

    function spawn(initial: boolean): Particle {
      const w = canvas!.width, h = canvas!.height;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h - h : -20 * DPR,
        vx: (Math.random() - 0.5) * 1.6 * DPR,
        vy: (1.4 + Math.random() * 2.6) * DPR,
        s: (5 + Math.random() * 7) * DPR,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        heart: Math.random() < 0.32,
        sway: Math.random() * Math.PI * 2,
      };
    }

    const parts: Particle[] = Array.from({ length: N }).map(() => spawn(true));

    function drawHeart(x: number, y: number, s: number, rot: number, color: string) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.scale(s / 16, s / 16);
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.moveTo(0, 5);
      ctx!.bezierCurveTo(0, 2, -3, -3, -8, -3);
      ctx!.bezierCurveTo(-15, -3, -15, 6, -15, 6);
      ctx!.bezierCurveTo(-15, 11, -9, 16, 0, 21);
      ctx!.bezierCurveTo(9, 16, 15, 11, 15, 6);
      ctx!.bezierCurveTo(15, 6, 15, -3, 8, -3);
      ctx!.bezierCurveTo(3, -3, 0, 2, 0, 5);
      ctx!.fill();
      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      parts.forEach((p) => {
        p.sway += 0.02;
        p.x += p.vx + Math.sin(p.sway) * 0.6 * DPR;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > canvas!.height + 30 * DPR) Object.assign(p, spawn(false));
        if (p.heart) {
          drawHeart(p.x, p.y, p.s * 1.4, p.rot, p.color);
        } else {
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.fillStyle = p.color;
          ctx!.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
          ctx!.restore();
        }
      });
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [run]);

  return <canvas ref={ref} className="confetti-canvas" aria-hidden="true" />;
}
