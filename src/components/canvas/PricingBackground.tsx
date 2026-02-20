"use client";

import { useEffect, useRef } from "react";

export default function PricingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width  = W;
    canvas.height = H;

    // ─── Particles ───────────────────────
    const GOLD = "199, 165, 106";
    const count = 55;

    const particles = Array.from({ length: count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.2 + 0.3,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    // ─── Resize ──────────────────────────
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    // ─── Draw ────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Base
      ctx.fillStyle = "#05050A";
      ctx.fillRect(0, 0, W, H);

      // ── Grid ──────────────────────────
      const gridSize = 90;
      ctx.strokeStyle = `rgba(${GOLD}, 0.04)`;
      ctx.lineWidth   = 1;

      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // ── Grid Intersections (dots) ──────
      ctx.fillStyle = `rgba(${GOLD}, 0.12)`;
      for (let x = 0; x < W; x += gridSize) {
        for (let y = 0; y < H; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Gold orb top ──────────────────
      const orbTop = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.6);
      orbTop.addColorStop(0,   `rgba(${GOLD}, 0.08)`);
      orbTop.addColorStop(0.5, `rgba(${GOLD}, 0.03)`);
      orbTop.addColorStop(1,   "transparent");
      ctx.fillStyle = orbTop;
      ctx.fillRect(0, 0, W, H);

      // ── Gold orb bottom-left ──────────
      const orbBL = ctx.createRadialGradient(W * 0.15, H, 0, W * 0.15, H, W * 0.4);
      orbBL.addColorStop(0,   `rgba(${GOLD}, 0.05)`);
      orbBL.addColorStop(1,   "transparent");
      ctx.fillStyle = orbBL;
      ctx.fillRect(0, 0, W, H);

      // ── Diagonal lines (فقط ۳ تا) ────
      ctx.strokeStyle = `rgba(${GOLD}, 0.03)`;
      ctx.lineWidth   = 1;
      [[0, H * 0.3, W, H * 0.7], [0, H * 0.6, W, H], [W * 0.3, 0, W, H * 0.4]].forEach(
        ([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      );

      // ── Particles ─────────────────────
      particles.forEach((p) => {
        // حرکت
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // رسم
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD}, ${p.alpha})`;
        ctx.fill();
      });

      // ── Connection lines بین particles نزدیک ──
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const a = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(${GOLD}, ${a})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Vignette ──────────────────────
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.9);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}
