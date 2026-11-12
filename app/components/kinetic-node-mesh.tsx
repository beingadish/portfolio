"use client";

import { useEffect, useRef } from "react";

interface KeywordDef {
  text: string;
  category: "cloud" | "backend" | "stream" | "data" | "ops" | "iot" | "org" | "ai" | "mobile";
  color: string;
}

const RESUME_KEYWORDS: KeywordDef[] = [
  { text: "AWS", category: "cloud", color: "#f59e0b" },
  { text: "MQTT", category: "iot", color: "#14b8a6" },
  { text: "IoT Core", category: "iot", color: "#2dd4bf" },
  { text: "Accenture", category: "org", color: "#a855f7" },
  { text: "Presto", category: "data", color: "#06b6d4" },
  { text: "Spring Boot", category: "backend", color: "#22c55e" },
  { text: "Java 21", category: "backend", color: "#eab308" },
  { text: "Grafana", category: "ops", color: "#f97316" },
  { text: "Kafka", category: "stream", color: "#f43f5e" },
  { text: "Redis", category: "data", color: "#ef4444" },
  { text: "Prometheus", category: "ops", color: "#e11d48" },
  { text: "k3s / K8s", category: "cloud", color: "#38bdf8" },
  { text: "DynamoDB", category: "data", color: "#3b82f6" },
  { text: "Kinesis", category: "stream", color: "#ec4899" },
  { text: "Docker", category: "ops", color: "#0ea5e9" },
  { text: "Microservices", category: "backend", color: "#14b8a6" },
  { text: "PostgreSQL", category: "data", color: "#6366f1" },
  { text: "Micrometer", category: "ops", color: "#10b981" },
  { text: "LangChain", category: "ai", color: "#8b5cf6" },
  { text: "FAISS", category: "ai", color: "#a78bfa" },
  { text: "Snowflake", category: "data", color: "#38bdf8" },
  { text: "Bucket4j", category: "backend", color: "#14b8a6" },
  { text: "Android", category: "mobile", color: "#4ade80" },
  { text: "MVVM", category: "backend", color: "#2dd4bf" },
  { text: "NFC", category: "iot", color: "#f59e0b" },
  { text: "Razorpay", category: "backend", color: "#3b82f6" },
];

interface MasterNode {
  keyword: KeywordDef;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  alpha: number;
  targetAlpha: number;
  state: "fade-in" | "active" | "fade-out";
  stateAge: number;
  activeDuration: number;
  fadeDuration: number;
  isHovered: boolean;
  orbitAngle: number;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface PulsePacket {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function KineticNodeMesh({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    let width = 0;
    let height = 0;

    // Mouse coordinates tracked from window
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 170,
      active: false,
    };

    let shockwaves: Shockwave[] = [];
    let pulsePackets: PulsePacket[] = [];

    // Master nodes count (simultaneous keywords on screen)
    const MASTER_NODE_COUNT = 9;
    const masterNodes: MasterNode[] = [];
    const usedKeywordIndices = new Set<number>();

    function pickNextKeyword(): KeywordDef {
      // Find unused keywords
      const availableIndices = RESUME_KEYWORDS.map((_, i) => i).filter(
        (i) => !usedKeywordIndices.has(i)
      );
      const chosenIndex =
        availableIndices.length > 0
          ? availableIndices[Math.floor(Math.random() * availableIndices.length)]
          : Math.floor(Math.random() * RESUME_KEYWORDS.length);

      usedKeywordIndices.add(chosenIndex);
      return RESUME_KEYWORDS[chosenIndex];
    }

    function releaseKeyword(text: string) {
      const idx = RESUME_KEYWORDS.findIndex((k) => k.text === text);
      if (idx !== -1) usedKeywordIndices.delete(idx);
    }

    function initMasterNode(index: number, initialSpawn = false): MasterNode {
      const keyword = pickNextKeyword();
      // Distribute nicely across viewport
      const col = index % 3;
      const row = Math.floor(index / 3);
      const sectorW = width / 3;
      const sectorH = height / 3;

      const padding = 70;
      const minX = col * sectorW + padding;
      const maxX = (col + 1) * sectorW - padding;
      const minY = row * sectorH + padding;
      const maxY = (row + 1) * sectorH - padding;

      const x = Math.max(padding, Math.min(width - padding, minX + Math.random() * Math.max(10, maxX - minX)));
      const y = Math.max(padding, Math.min(height - padding, minY + Math.random() * Math.max(10, maxY - minY)));

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.25;

      return {
        keyword,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseRadius: 4.5,
        alpha: initialSpawn ? 0.15 + Math.random() * 0.6 : 0,
        targetAlpha: 0.8 + Math.random() * 0.18,
        state: initialSpawn ? "active" : "fade-in",
        stateAge: 0,
        activeDuration: 12000 + Math.random() * 10000, // 12-22s
        fadeDuration: 2600 + Math.random() * 1000,
        isHovered: false,
        orbitAngle: Math.random() * Math.PI * 2,
      };
    }

    // Ambient particles
    const AMBIENT_COUNT = 70;
    const ambientParticles: AmbientParticle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed ambient particles if empty or resized significantly
      if (ambientParticles.length === 0) {
        for (let i = 0; i < AMBIENT_COUNT; i++) {
          ambientParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: 1.2 + Math.random() * 1.5,
            alpha: 0.15 + Math.random() * 0.35,
          });
        }
      }

      // Initialize master nodes if empty
      if (masterNodes.length === 0) {
        for (let i = 0; i < MASTER_NODE_COUNT; i++) {
          masterNodes.push(initMasterNode(i, true));
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking on window (works even with pointer-events-none on canvas)
    const handlePointerMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 220,
        alpha: 0.75,
      });
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
      if (isTabVisible) {
        cancelAnimationFrame(animationFrameId);
        lastTime = performance.now();
        render(lastTime);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isTabVisible) return;

      const dt = Math.min(now - lastTime, 50); // cap delta to 50ms
      lastTime = now;

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -2000;
        mouse.y = -2000;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update and render Shockwaves
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += (dt / 16) * 6;
        sw.alpha -= (dt / 16) * 0.025;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(sIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 212, 191, ${sw.alpha * 0.35})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 2. Update Ambient Particles
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // Soft screen bounce / wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse elastic repulsion / attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius && dist > 1) {
            const force = ((mouse.radius - dist) / mouse.radius) * 0.75;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.55})`;
        ctx.fill();

        // Connect nearby ambient particles
        for (let j = i + 1; j < ambientParticles.length; j++) {
          const p2 = ambientParticles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 105) {
            const edgeAlpha = (1 - dist / 105) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${edgeAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 3. Update & Lifecycle of Master Nodes (Keywords)
      for (let mIdx = 0; mIdx < masterNodes.length; mIdx++) {
        const node = masterNodes[mIdx];
        node.stateAge += dt;
        node.orbitAngle += 0.015 * (dt / 16);

        // Check if mouse is hovering near this node
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mouseDist = Math.hypot(mdx, mdy);
        node.isHovered = mouseDist < 60;

        // If hovered, pause aging so it doesn't fade out while user is reading/interacting
        const effectiveDt = node.isHovered ? 0 : dt;

        // Lifecycle transitions: fade-in -> active -> fade-out -> respawn
        if (node.state === "fade-in") {
          node.alpha += (dt / node.fadeDuration) * node.targetAlpha;
          if (node.alpha >= node.targetAlpha) {
            node.alpha = node.targetAlpha;
            node.state = "active";
            node.stateAge = 0;
          }
        } else if (node.state === "active") {
          if (!node.isHovered && node.stateAge > node.activeDuration) {
            node.state = "fade-out";
            node.stateAge = 0;
          }
        } else if (node.state === "fade-out") {
          node.alpha -= (dt / node.fadeDuration) * node.targetAlpha;
          if (node.alpha <= 0.01) {
            // Respawn with a new keyword
            releaseKeyword(node.keyword.text);
            masterNodes[mIdx] = initMasterNode(mIdx, false);
            continue;
          }
        }

        // Float movement
        node.x += node.vx * (dt / 16);
        node.y += node.vy * (dt / 16);

        // Gentle boundary bounce with padding
        const pad = 60;
        if (node.x < pad) {
          node.x = pad;
          node.vx = Math.abs(node.vx);
        } else if (node.x > width - pad) {
          node.x = width - pad;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y < pad) {
          node.y = pad;
          node.vy = Math.abs(node.vy);
        } else if (node.y > height - pad) {
          node.y = height - pad;
          node.vy = -Math.abs(node.vy);
        }

        // Mouse attraction when close
        if (mouse.active && mouseDist < mouse.radius && mouseDist > 1) {
          const force = ((mouse.radius - mouseDist) / mouse.radius) * 0.9;
          node.x += (mdx / mouseDist) * force;
          node.y += (mdy / mouseDist) * force;
        }

        // Spawn occasional pulse packets to nearby ambient particles
        if (Math.random() < 0.008 && pulsePackets.length < 18) {
          // Find closest ambient particle
          let closestP: AmbientParticle | null = null;
          let closestDist = 180;
          for (const ap of ambientParticles) {
            const d = Math.hypot(node.x - ap.x, node.y - ap.y);
            if (d < closestDist && d > 20) {
              closestDist = d;
              closestP = ap;
            }
          }
          if (closestP) {
            pulsePackets.push({
              fromX: node.x,
              fromY: node.y,
              toX: closestP.x,
              toY: closestP.y,
              progress: 0,
              speed: 0.018 + Math.random() * 0.012,
              color: node.keyword.color,
            });
          }
        }

        // Draw connections from Master Node to nearby ambient particles
        for (const ap of ambientParticles) {
          const d = Math.hypot(node.x - ap.x, node.y - ap.y);
          if (d < 140) {
            const edgeAlpha = (1 - d / 140) * 0.22 * node.alpha;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(ap.x, ap.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${edgeAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw connections to cursor if nearby
        if (mouse.active && mouseDist < mouse.radius) {
          const cursorEdgeAlpha = (1 - mouseDist / mouse.radius) * 0.45 * node.alpha;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(45, 212, 191, ${cursorEdgeAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // 4. Render Master Node Visuals (Hub + Keyword Badge)
        const alpha = Math.max(0, Math.min(1, node.alpha));
        const color = node.keyword.color;
        const isHovered = node.isHovered;

        // Outer halo glow
        const pulse = Math.sin(now * 0.003 + node.x) * 1.5;
        const haloRadius = (node.baseRadius + 5 + pulse) * (isHovered ? 1.6 : 1.0);
        ctx.beginPath();
        ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? `rgba(45, 212, 191, ${0.28 * alpha})`
          : `rgba(20, 184, 166, ${0.12 * alpha})`;
        ctx.fill();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius + (isHovered ? 1.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHovered ? 14 : 7;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Orbiting satellite dot
        const orbitR = 14 + (isHovered ? 4 : 0);
        const satX = node.x + Math.cos(node.orbitAngle) * orbitR;
        const satY = node.y + Math.sin(node.orbitAngle) * orbitR;
        ctx.beginPath();
        ctx.arc(satX, satY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.65 * alpha})`;
        ctx.fill();

        // Keyword badge (Pill)
        const label = node.keyword.text;
        ctx.font = isHovered
          ? "600 11.5px 'JetBrains Mono', monospace"
          : "500 10.5px 'JetBrains Mono', monospace";
        const metrics = ctx.measureText(label);
        const textWidth = metrics.width;
        const pillHeight = 20;
        const pillWidth = textWidth + 18;
        const pillX = node.x - pillWidth / 2;
        const pillY = node.y + node.baseRadius + 8;
        const radius = 6;

        // Draw pill background
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, radius);
        ctx.fillStyle = isHovered
          ? `rgba(9, 10, 13, ${0.95 * alpha})`
          : `rgba(18, 19, 24, ${0.82 * alpha})`;
        ctx.fill();

        // Pill border
        ctx.strokeStyle = isHovered
          ? `rgba(45, 212, 191, ${0.85 * alpha})`
          : `rgba(255, 255, 255, ${0.12 * alpha})`;
        ctx.lineWidth = isHovered ? 1.3 : 0.8;
        ctx.stroke();

        // Pill text
        ctx.fillStyle = isHovered
          ? "#ffffff"
          : `rgba(237, 234, 227, ${0.85 * alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, node.x, pillY + pillHeight / 2);
      }

      // 5. Update & Draw Traveling Pulse Packets
      for (let pIdx = pulsePackets.length - 1; pIdx >= 0; pIdx--) {
        const packet = pulsePackets[pIdx];
        packet.progress += packet.speed * (dt / 16);
        if (packet.progress >= 1) {
          pulsePackets.splice(pIdx, 1);
          continue;
        }

        const px = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
        const py = packet.fromY + (packet.toY - packet.fromY) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowColor = packet.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
