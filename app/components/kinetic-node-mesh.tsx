"use client";

import { useEffect, useRef, useState } from "react";

type HubNode = {
  id: string;
  label: string;
  sublabel: string;
  x: number; // 0..1 relative position
  y: number; // 0..1 relative position
  color: string;
  size: number;
};

const HUB_NODES: HubNode[] = [
  { id: "iot", label: "AWS IoT Core", sublabel: "Telemetry", x: 0.14, y: 0.52, color: "#14b8a6", size: 6.5 },
  { id: "kafka", label: "Kafka Streams", sublabel: "2M+ ev/d", x: 0.35, y: 0.28, color: "#f59e0b", size: 6.5 },
  { id: "spring", label: "Spring Boot", sublabel: "1M+ tx/d", x: 0.36, y: 0.74, color: "#14b8a6", size: 7 },
  { id: "redis", label: "Redis GEO & PG", sublabel: "-35% Latency", x: 0.62, y: 0.52, color: "#10b981", size: 8 },
  { id: "rag", label: "pgvector RAG", sublabel: "Gemini", x: 0.85, y: 0.28, color: "#14b8a6", size: 6.5 },
  { id: "k3s", label: "K8s (k3s) & Observe", sublabel: "Prometheus", x: 0.84, y: 0.74, color: "#14b8a6", size: 6.5 },
];

export function KineticNodeMesh({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    // Ambient floating particles
    const particleCount = 26;
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    };
    let particles: Particle[] = [];

    const resize = () => {
      if (!container || !canvas) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-init ambient particles
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1.2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse listeners on container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Check if mouse is hovering near any Hub Node
      let hovered: string | null = null;
      for (const hub of HUB_NODES) {
        const hx = hub.x * width;
        const hy = hub.y * height;
        const dist = Math.hypot(mouse.x - hx, mouse.y - hy);
        if (dist < 28) {
          hovered = hub.id;
          break;
        }
      }
      setActiveHub(hovered);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setActiveHub(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Pause animation when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          render();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let pulseStep = 0;

    const render = () => {
      if (!isVisible) return;
      pulseStep += 0.025;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw connections between Hub Nodes
      const hubEdges: [number, number][] = [
        [0, 1], // IoT -> Kafka
        [0, 2], // IoT -> Spring
        [1, 3], // Kafka -> Redis/PG
        [2, 3], // Spring -> Redis/PG
        [3, 4], // Redis/PG -> RAG
        [3, 5], // Redis/PG -> K8s
        [4, 5], // RAG -> K8s
      ];

      for (const [fromIdx, toIdx] of hubEdges) {
        const from = HUB_NODES[fromIdx];
        const to = HUB_NODES[toIdx];
        const x1 = from.x * width;
        const y1 = from.y * height;
        const x2 = to.x * width;
        const y2 = to.y * height;

        // Base edge
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(20, 184, 166, 0.22)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated traveling packet on the edge
        const t = (pulseStep * 0.4 + (fromIdx + toIdx) * 0.2) % 1;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.85)";
        ctx.shadowColor = "#14b8a6";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Update & draw ambient particles with constellation links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (pDist < 75) {
            const alpha = (1 - pDist / 75) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Core Hub Nodes with Labels
      for (const hub of HUB_NODES) {
        const hx = hub.x * width;
        const hy = hub.y * height;
        const isHovered = activeHub === hub.id;

        // Glowing outer halo
        const haloRadius = hub.size * (isHovered ? 2.8 : 2.0 + Math.sin(pulseStep + hx) * 0.2);
        ctx.beginPath();
        ctx.arc(hx, hy, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "rgba(20, 184, 166, 0.25)" : "rgba(20, 184, 166, 0.1)";
        ctx.fill();

        // Hub border ring
        ctx.beginPath();
        ctx.arc(hx, hy, hub.size + (isHovered ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.fill();

        // Center core
        ctx.beginPath();
        ctx.arc(hx, hy, hub.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = hub.color;
        ctx.shadowColor = hub.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label above / below
        ctx.font = isHovered
          ? "600 10.5px 'JetBrains Mono', monospace"
          : "500 9.5px 'JetBrains Mono', monospace";
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(226, 232, 240, 0.9)";
        ctx.textAlign = "center";
        ctx.fillText(hub.label, hx, hy - hub.size - 6);

        // Sublabel
        ctx.font = "400 8.5px 'JetBrains Mono', monospace";
        ctx.fillStyle = isHovered ? "#14b8a6" : "rgba(148, 163, 184, 0.75)";
        ctx.fillText(hub.sublabel, hx, hy + hub.size + 13);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-[var(--surface-base,#080f12)]/80 border border-[var(--line)]/70 select-none group/canvas ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Heads-up overlay badges */}
      <div className="absolute top-2.5 left-3 flex items-center gap-2 pointer-events-none text-[10px] font-mono">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--teal)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--teal)]" />
        </span>
        <span className="text-[var(--teal)] font-semibold uppercase tracking-wider">
          Architecture Topology Mesh
        </span>
      </div>

      <div className="absolute top-2.5 right-3 pointer-events-none text-[10px] font-mono text-[var(--muted)]">
        <span className="text-emerald-400 font-semibold">-35% P99</span> • 1M+ TX/D
      </div>

      <div className="absolute bottom-2 left-3 pointer-events-none flex items-center gap-3 text-[9px] font-mono text-[var(--muted)]/70">
        <span>NODES: 6 HUBS</span>
        <span>•</span>
        <span>SETTLEMENT: 2M+ EVENTS/DAY</span>
      </div>

      <div className="absolute bottom-2 right-3 pointer-events-none text-[9px] font-mono text-[var(--muted)]/60">
        Hover nodes to inspect
      </div>
    </div>
  );
}
