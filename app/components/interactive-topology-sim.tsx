"use client";

import { useState } from "react";

interface Tier {
  id: string;
  name: string;
  category: string;
  latency: string;
  slaImpact: string;
  description: string;
  points: { cx: number; cy: number };
}

const TIERS: Tier[] = [
  {
    id: "l1",
    name: "L1 Cache",
    category: "CPU Registers",
    latency: "0.9 ns",
    slaImpact: "99.99%",
    description: "Hardware CPU registers & L1 instruction cache. Instantaneous deterministic state access with zero bus contention.",
    points: { cx: 40, cy: 74 },
  },
  {
    id: "dram",
    name: "DDR5 DRAM",
    category: "Main Memory",
    latency: "72 ns",
    slaImpact: "99.8%",
    description: "Main bus memory access. Uncontended concurrent read boundary utilized by in-memory data structures and thread pools.",
    points: { cx: 200, cy: 72 },
  },
  {
    id: "nvme",
    name: "NVMe SSD DMA",
    category: "Flash Storage",
    latency: "18 µs",
    slaImpact: "98.5%",
    description: "Non-volatile PCIe 5.0 page writes with direct DMA zero-copy bypass. Critical for persistent write-ahead logs and WAL flushes.",
    points: { cx: 400, cy: 66 },
  },
  {
    id: "lan",
    name: "Intra-Rack LAN",
    category: "Cluster Network",
    latency: "280 µs",
    slaImpact: "94.2%",
    description: "Same datacenter switch boundary over 100GbE / eBPF kernel sockets. Replicates Redis clusters and Kafka event partitions.",
    points: { cx: 600, cy: 42 },
  },
  {
    id: "wan",
    name: "Public WAN Transit",
    category: "Internet Roundtrip",
    latency: "48 ms",
    slaImpact: "14.8%",
    description: "Cross-region network transit across edge gateways. Represents client-to-backend mobile payload delivery and transit settlement.",
    points: { cx: 760, cy: 10 },
  },
];

export function InteractiveTopologySim() {
  const [selectedTier, setSelectedTier] = useState<Tier>(TIERS[0]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#121318]/90 p-5 sm:p-7 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
            <span className="uppercase tracking-wider">Empirical Hardware Profile</span>
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-light text-[#edeae3]">
            Memory Hierarchy Latency vs. Network Boundary
          </h3>
          <p className="mt-1 text-xs text-[#8c8f9a] font-sans max-w-xl">
            Click across hardware tiers to simulate propagation latency against strict sub-millisecond p99 SLA budgets.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs border border-white/10 px-4 py-2 bg-[#0a0b0e] rounded-lg">
          <span className="text-[#8c8f9a]">TIER:</span>
          <span className="text-[#edeae3] font-semibold">{selectedTier.name}</span>
          <span className="text-white/20">|</span>
          <span className="text-[#2dd4bf] font-semibold tabular-nums">{selectedTier.latency}</span>
        </div>
      </div>

      {/* Tier Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-5 font-mono text-xs">
        {TIERS.map((tier, idx) => {
          const isSelected = tier.id === selectedTier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`text-left p-3.5 rounded-lg border transition-all duration-200 flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? "border-[#2dd4bf] bg-[#1a1c24] shadow-[0_0_15px_rgba(45,212,191,0.15)] ring-1 ring-[#2dd4bf]/40"
                  : "border-white/10 bg-[#0e0f14]/60 hover:border-white/25 hover:bg-[#14151c]"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-[#5a5c66]">
                <span>§ 0{idx + 1}</span>
                <span className="tabular-nums text-[#8c8f9a]">{tier.slaImpact}</span>
              </div>
              <div>
                <span className={`block text-xs font-semibold ${isSelected ? "text-white" : "text-[#edeae3]"}`}>
                  {tier.name}
                </span>
                <span className="text-[10px] text-[#8c8f9a]">{tier.category}</span>
              </div>
              <span className="text-[11px] text-[#2dd4bf] font-medium tabular-nums border-t border-white/5 pt-1.5">
                {tier.latency}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Graph Visualizer */}
      <div className="mt-5 rounded-lg border border-white/10 bg-[#090a0d] p-5 flex flex-col gap-4 font-mono text-xs">
        <div className="flex items-center justify-between text-[11px] text-[#8c8f9a]">
          <span>SCALE RATIO (EXPONENTIAL 10x LOG):</span>
          <span className="text-white/90 font-sans italic text-right max-w-md truncate">
            {selectedTier.description}
          </span>
        </div>

        {/* Dynamic SVG Curve */}
        <div className="w-full h-20 relative flex items-end">
          <svg className="w-full h-full text-[#2dd4bf] overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 80">
            {/* Guide lines */}
            <line x1="0" y1="75" x2="800" y2="75" stroke="#1e2028" strokeWidth="1" />
            <line x1="0" y1="40" x2="800" y2="40" stroke="#1e2028" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Curve */}
            <path
              d="M0,75 C120,75 220,73 380,68 C520,60 660,35 800,8"
              fill="none"
              stroke="rgba(45, 212, 191, 0.4)"
              strokeWidth="2"
            />

            {/* Inactive & Active Points */}
            {TIERS.map((tier) => {
              const active = tier.id === selectedTier.id;
              return (
                <g key={tier.id}>
                  {active && (
                    <circle
                      cx={tier.points.cx}
                      cy={tier.points.cy}
                      r="9"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="1.5"
                      className="animate-ping opacity-75"
                    />
                  )}
                  <circle
                    cx={tier.points.cx}
                    cy={tier.points.cy}
                    r={active ? 5 : 3.5}
                    fill={active ? "#2dd4bf" : "#8c8f9a"}
                    stroke={active ? "#ffffff" : "transparent"}
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Axis Labels */}
        <div className="flex items-center justify-between text-[10px] text-[#5a5c66] pt-2 border-t border-white/5">
          <span>L1 REGISTERS (0.9ns)</span>
          <span className="hidden sm:inline">DRAM BUS (72ns)</span>
          <span>NVMe FLASH (18µs)</span>
          <span className="hidden sm:inline">ROCE / LAN (280µs)</span>
          <span>WAN ROUNDTRIP (48ms)</span>
        </div>
      </div>
    </div>
  );
}
