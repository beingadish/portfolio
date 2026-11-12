"use client";

import React, { useState } from "react";
import {
  PROJECT_ARCHITECTURES,
  type ArchitectureNode,
  type ErdTable,
  type ErdRelationship,
  type FlowDiagram,
  type FlowStep,
  type SecuritySpec,
} from "../data/project-architectures";

interface ArchitectureViewerProps {
  slug: string;
}

type TabMode = "infra" | "erd" | "flows" | "security";

export function ArchitectureViewer({ slug }: ArchitectureViewerProps) {
  const arch = PROJECT_ARCHITECTURES[slug] || PROJECT_ARCHITECTURES.aroundu;

  const [activeTab, setActiveTab] = useState<TabMode>("infra");

  // Infra Tab state
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    arch.infraNodes[0]?.id || ""
  );

  // ERD Tab state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTableForRel, setSelectedTableForRel] = useState<string>("all");
  const [erdViewMode, setErdViewMode] = useState<"tables" | "relationships">("tables");

  // Flow Tab state
  const [selectedFlowId, setSelectedFlowId] = useState<string>(
    arch.flows[0]?.id || ""
  );
  const [expandedPayloads, setExpandedPayloads] = useState<Record<number, boolean>>({});

  const activeNode =
    arch.infraNodes.find((n) => n.id === selectedNodeId) || arch.infraNodes[0];

  const activeFlow =
    arch.flows.find((f) => f.id === selectedFlowId) || arch.flows[0];

  // Group infra nodes by tier
  const tierOrder: ArchitectureNode["tier"][] = [
    "edge",
    "gateway",
    "compute",
    "messaging",
    "cache",
    "database",
  ];

  const tierLabels: Record<ArchitectureNode["tier"], string> = {
    edge: "Edge & Ingress",
    gateway: "API Gateway & Routing",
    compute: "Application & Microservice Engine",
    messaging: "Event Streaming & Async Queue",
    cache: "High-Speed Cache & In-Memory State",
    database: "Persistence & Data Store",
  };

  const getTierColor = (tier: ArchitectureNode["tier"]) => {
    switch (tier) {
      case "edge":
        return "text-[#2dd4bf] border-[#2dd4bf]/40 bg-[#2dd4bf]/10";
      case "gateway":
        return "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10";
      case "compute":
        return "text-[#fbbf24] border-[#fbbf24]/40 bg-[#fbbf24]/10";
      case "messaging":
        return "text-[#ec4899] border-[#ec4899]/40 bg-[#ec4899]/10";
      case "cache":
        return "text-[#a78bfa] border-[#a78bfa]/40 bg-[#a78bfa]/10";
      case "database":
        return "text-[#34d399] border-[#34d399]/40 bg-[#34d399]/10";
      default:
        return "text-white/60 border-white/20 bg-white/5";
    }
  };

  const getTableCategoryBadge = (category: ErdTable["category"]) => {
    switch (category) {
      case "core":
        return "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30";
      case "transactional":
        return "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30";
      case "lookup":
        return "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30";
      case "audit":
        return "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30";
      case "vector":
        return "bg-[#ec4899]/15 text-[#ec4899] border-[#ec4899]/30";
      default:
        return "bg-white/10 text-white/70 border-white/20";
    }
  };

  // Filtered ERD tables
  const filteredTables = arch.erdTables.filter((table) => {
    if (selectedCategory === "all") return true;
    return table.category === selectedCategory;
  });

  // Filtered ERD relationships
  const filteredRelationships = arch.erdRelationships.filter((rel) => {
    if (selectedTableForRel === "all") return true;
    return rel.fromTable === selectedTableForRel || rel.toTable === selectedTableForRel;
  });

  const togglePayload = (stepIdx: number) => {
    setExpandedPayloads((prev) => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Architecture Overview Banner */}
      <div className="p-6 rounded-2xl bg-[#121318] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-[#2dd4bf]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#2dd4bf]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              <span>Full-Stack Architecture &amp; System Blueprint</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white mt-1">
              {arch.headline}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#9da1ad] max-w-3xl leading-relaxed">
              {arch.summary}
            </p>
          </div>

          {/* Quick Architecture Metrics Pill */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#181a22] border border-white/10 flex items-center gap-2">
              <span className="text-[#2dd4bf] font-semibold">{arch.infraNodes.length}</span>
              <span className="text-[#8c8f9a]">Topology Nodes</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181a22] border border-white/10 flex items-center gap-2">
              <span className="text-[#fbbf24] font-semibold">{arch.erdTables.length}</span>
              <span className="text-[#8c8f9a]">Schema Tables</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181a22] border border-white/10 flex items-center gap-2">
              <span className="text-[#38bdf8] font-semibold">{arch.flows.length}</span>
              <span className="text-[#8c8f9a]">Execution Flows</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("infra")}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === "infra"
                ? "bg-[#2dd4bf] text-[#090a0d] font-semibold shadow-[0_0_16px_rgba(45,212,191,0.25)]"
                : "bg-[#181a22] text-[#8c8f9a] hover:text-white border border-white/10"
            }`}
          >
            <span>🏗️</span>
            <span>Infra &amp; Topology</span>
            <span className="text-[10px] opacity-75 font-normal">({arch.infraNodes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("erd")}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === "erd"
                ? "bg-[#fbbf24] text-[#090a0d] font-semibold shadow-[0_0_16px_rgba(251,191,36,0.25)]"
                : "bg-[#181a22] text-[#8c8f9a] hover:text-white border border-white/10"
            }`}
          >
            <span>🗄️</span>
            <span>Database Schema &amp; ERD</span>
            <span className="text-[10px] opacity-75 font-normal">({arch.erdTables.length} Tables)</span>
          </button>

          <button
            onClick={() => setActiveTab("flows")}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === "flows"
                ? "bg-[#38bdf8] text-[#090a0d] font-semibold shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                : "bg-[#181a22] text-[#8c8f9a] hover:text-white border border-white/10"
            }`}
          >
            <span>⚡</span>
            <span>Execution &amp; Request Flows</span>
            <span className="text-[10px] opacity-75 font-normal">({arch.flows.length} Scenarios)</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === "security"
                ? "bg-[#ec4899] text-[#090a0d] font-semibold shadow-[0_0_16px_rgba(236,72,153,0.25)]"
                : "bg-[#181a22] text-[#8c8f9a] hover:text-white border border-white/10"
            }`}
          >
            <span>🛡️</span>
            <span>Security &amp; Isolation</span>
            <span className="text-[10px] opacity-75 font-normal">(Zero Trust)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INFRASTRUCTURE & SYSTEM TOPOLOGY */}
      {activeTab === "infra" && (
        <div className="flex flex-col gap-6">
          {/* Visual Topology Grid Organized by Tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tierOrder.map((tier) => {
              const nodesInTier = arch.infraNodes.filter((n) => n.tier === tier);
              if (nodesInTier.length === 0) return null;

              return (
                <div
                  key={tier}
                  className="p-4 rounded-xl bg-[#0e0f14] border border-white/10 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
                      {tierLabels[tier]}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getTierColor(
                        tier
                      )}`}
                    >
                      {nodesInTier.length} {nodesInTier.length === 1 ? "Component" : "Components"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {nodesInTier.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-3.5 rounded-lg border transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#181a22] border-[#2dd4bf] shadow-[0_0_14px_rgba(45,212,191,0.2)]"
                              : "bg-[#121318]/70 border-white/5 hover:border-white/20 hover:bg-[#181a22]/60"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-sm text-white">
                              {node.shortName}
                            </span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#2dd4bf] border border-[#2dd4bf]/20 whitespace-nowrap">
                              {node.metricBadge}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5 font-mono text-[11px] text-[#8c8f9a]">
                            <span className="text-[#edeae3]">{node.service}</span>
                            <span>•</span>
                            <span className="text-white/40">{node.protocol}</span>
                          </div>

                          <p className="mt-2 text-xs text-[#9da1ad] line-clamp-2 leading-relaxed font-sans">
                            {node.description}
                          </p>

                          {/* Connections summary */}
                          {node.connectsTo.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono text-white/40">Connects:</span>
                              {node.connectsTo.map((targetId) => {
                                const target = arch.infraNodes.find((n) => n.id === targetId);
                                return (
                                  <span
                                    key={targetId}
                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#9da1ad]"
                                  >
                                    → {target?.shortName || targetId}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Node Deep-Dive Inspection Drawer */}
          {activeNode && (
            <div className="p-6 rounded-2xl bg-[#121318] border border-[#2dd4bf]/30 shadow-[0_0_24px_rgba(45,212,191,0.1)] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf]">
                    <span className="text-[10px] px-2 py-0.5 rounded uppercase tracking-wider bg-[#2dd4bf]/15 border border-[#2dd4bf]/30">
                      Tier: {tierLabels[activeNode.tier]}
                    </span>
                    <span>•</span>
                    <span>Protocol: {activeNode.protocol}</span>
                  </div>
                  <h4 className="text-xl font-medium text-white mt-1">
                    {activeNode.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#181a22] border border-white/10 text-[#2dd4bf]">
                    SLA / Performance: {activeNode.metricBadge}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#edeae3] leading-relaxed">
                {activeNode.description}
              </div>

              {/* Technical Specifications */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
                  Technical Specifications &amp; Implementation Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeNode.technicalDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0e0f14] border border-white/5 font-mono text-xs text-[#9da1ad] flex items-start gap-2.5"
                    >
                      <span className="text-[#2dd4bf] shrink-0">▸</span>
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downstream Connections Linker */}
              {activeNode.connectsTo.length > 0 && (
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
                    Downstream Targets &amp; Event Consumers
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.connectsTo.map((targetId) => {
                      const target = arch.infraNodes.find((n) => n.id === targetId);
                      return (
                        <button
                          key={targetId}
                          onClick={() => setSelectedNodeId(targetId)}
                          className="px-3 py-1.5 rounded-lg bg-[#181a22] hover:bg-[#222430] border border-white/10 font-mono text-xs text-[#edeae3] transition-colors flex items-center gap-2"
                        >
                          <span className="text-[#2dd4bf]">→</span>
                          <span>{target?.name || targetId}</span>
                          <span className="text-[10px] text-[#8c8f9a]">({target?.protocol})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: DATABASE SCHEMA & ERD */}
      {activeTab === "erd" && (
        <div className="flex flex-col gap-6">
          {/* ERD Control Bar */}
          <div className="p-4 rounded-xl bg-[#121318] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#0e0f14] p-1 rounded-lg border border-white/10 font-mono text-xs">
              <button
                onClick={() => setErdViewMode("tables")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  erdViewMode === "tables"
                    ? "bg-[#fbbf24] text-[#090a0d] font-semibold"
                    : "text-[#8c8f9a] hover:text-white"
                }`}
              >
                Relational Tables ({arch.erdTables.length})
              </button>
              <button
                onClick={() => setErdViewMode("relationships")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  erdViewMode === "relationships"
                    ? "bg-[#fbbf24] text-[#090a0d] font-semibold"
                    : "text-[#8c8f9a] hover:text-white"
                }`}
              >
                Foreign Key Links &amp; Relationships ({arch.erdRelationships.length})
              </button>
            </div>

            {/* Filter by Category (for tables) */}
            {erdViewMode === "tables" && (
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <span className="text-[#8c8f9a] mr-1">Category:</span>
                {["all", "core", "transactional", "lookup", "audit", "vector"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors ${
                        selectedCategory === cat
                          ? "bg-white/20 text-white font-medium"
                          : "text-[#8c8f9a] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Filter by Table (for relationships) */}
            {erdViewMode === "relationships" && (
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#8c8f9a]">Focus Table:</span>
                <select
                  value={selectedTableForRel}
                  onChange={(e) => setSelectedTableForRel(e.target.value)}
                  className="bg-[#0e0f14] border border-white/10 rounded px-2.5 py-1 text-white text-xs font-mono focus:outline-none focus:border-[#fbbf24]"
                >
                  <option value="all">All Tables ({arch.erdRelationships.length} Links)</option>
                  {arch.erdTables.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* TABLES VIEW */}
          {erdViewMode === "tables" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredTables.map((table) => (
                <div
                  key={table.name}
                  className="rounded-xl bg-[#0e0f14] border border-white/10 overflow-hidden flex flex-col"
                >
                  {/* Table Header */}
                  <div className="p-4 bg-[#14151c] border-b border-white/10 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-semibold text-white tracking-wide">
                          {table.name}
                        </span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border capitalize ${getTableCategoryBadge(
                            table.category
                          )}`}
                        >
                          {table.category}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#9da1ad] font-sans leading-relaxed">
                        {table.description}
                      </p>
                    </div>

                    <div className="shrink-0 font-mono text-[11px] px-2.5 py-1 rounded bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24]">
                      PK: {table.primaryKey}
                    </div>
                  </div>

                  {/* Columns Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[#090a0d] border-b border-white/5 text-[11px] text-[#8c8f9a] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Column</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Constraint</th>
                          <th className="py-2.5 px-3 font-sans">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {table.columns.map((col) => (
                          <tr key={col.name} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2 px-3 font-medium text-[#edeae3]">
                              {col.name}
                            </td>
                            <td className="py-2 px-3 text-[#38bdf8] text-[11px]">
                              {col.type}
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {col.isPk && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40">
                                    PK
                                  </span>
                                )}
                                {col.isFk && (
                                  <span
                                    title={col.references ? `References: ${col.references}` : "Foreign Key"}
                                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40"
                                  >
                                    FK {col.references ? `→ ${col.references}` : ""}
                                  </span>
                                )}
                                {col.nullable ? (
                                  <span className="text-[10px] text-white/40">NULL</span>
                                ) : (
                                  <span className="text-[10px] text-white/70">NOT NULL</span>
                                )}
                              </div>
                            </td>
                            <td className="py-2 px-3 text-[11px] text-[#9da1ad] font-sans leading-relaxed">
                              {col.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Indexes Footer */}
                  {table.indexes.length > 0 && (
                    <div className="p-3 bg-[#090a0d] border-t border-white/5 flex items-center gap-2 flex-wrap font-mono text-[11px]">
                      <span className="text-[#8c8f9a]">Indexes:</span>
                      {table.indexes.map((idx, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/5 text-[#9da1ad] border border-white/10"
                        >
                          {idx}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* RELATIONSHIPS VIEW */}
          {erdViewMode === "relationships" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRelationships.map((rel) => (
                <div
                  key={rel.id}
                  className="p-4 rounded-xl bg-[#0e0f14] border border-white/10 flex flex-col gap-3 hover:border-[#fbbf24]/50 transition-all"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30 font-semibold">
                      {rel.type} Cardinality
                    </span>
                    <span className="font-mono text-xs text-[#8c8f9a]">
                      FK Constraint
                    </span>
                  </div>

                  {/* Relationship Flow diagram */}
                  <div className="p-3 rounded-lg bg-[#14151c] border border-white/5 flex items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-[#8c8f9a] text-[10px] uppercase">From (Source)</span>
                      <span className="text-white font-semibold">{rel.fromTable}</span>
                      <span className="text-[#38bdf8] text-[11px]">.{rel.fromColumn}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-[#fbbf24]">
                      <span className="text-xs">━━━━▶</span>
                      <span className="text-[10px] font-bold">{rel.type}</span>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[#8c8f9a] text-[10px] uppercase">To (Reference)</span>
                      <span className="text-white font-semibold">{rel.toTable}</span>
                      <span className="text-[#38bdf8] text-[11px]">.{rel.toColumn}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#9da1ad] leading-relaxed font-sans">
                    {rel.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: EXECUTION & REQUEST FLOWS */}
      {activeTab === "flows" && (
        <div className="flex flex-col gap-6">
          {/* Flow Scenario Switcher Pills */}
          <div className="flex flex-wrap gap-2">
            {arch.flows.map((flow) => {
              const isSelected = selectedFlowId === flow.id;
              return (
                <button
                  key={flow.id}
                  onClick={() => {
                    setSelectedFlowId(flow.id);
                    setExpandedPayloads({});
                  }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs text-left transition-all flex flex-col gap-1 border ${
                    isSelected
                      ? "bg-[#181a22] border-[#38bdf8] shadow-[0_0_16px_rgba(56,189,248,0.2)]"
                      : "bg-[#121318] border-white/10 hover:border-white/20 text-[#8c8f9a] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#38bdf8]" : "bg-white/30"}`} />
                    <span className="font-semibold text-white">{flow.title}</span>
                  </div>
                  <span className="text-[11px] text-[#8c8f9a]">{flow.steps.length} Sequential Steps</span>
                </button>
              );
            })}
          </div>

          {/* Active Flow Header & Context */}
          {activeFlow && (
            <div className="p-5 rounded-2xl bg-[#121318] border border-white/10 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-lg font-medium text-white">
                  {activeFlow.title}
                </h4>
                <span className="font-mono text-xs text-[#38bdf8] px-2.5 py-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/20">
                  {activeFlow.steps.length} Micro-Transactions
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9da1ad] leading-relaxed">
                {activeFlow.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-[#0e0f14] border border-white/5">
                  <span className="text-[#8c8f9a] text-[10px] uppercase block mb-1">Trigger Event:</span>
                  <span className="text-[#edeae3]">{activeFlow.trigger}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0f14] border border-white/5">
                  <span className="text-[#8c8f9a] text-[10px] uppercase block mb-1">Guaranteed Outcome:</span>
                  <span className="text-[#34d399]">{activeFlow.outcome}</span>
                </div>
              </div>
            </div>
          )}

          {/* Sequential Step Cards */}
          {activeFlow && (
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#38bdf8]/50 via-white/10 to-transparent hidden md:block" />

              {activeFlow.steps.map((step, idx) => (
                <div
                  key={step.step}
                  className="p-5 rounded-xl bg-[#0e0f14] border border-white/10 ml-0 md:ml-12 relative flex flex-col gap-3 hover:border-[#38bdf8]/40 transition-all"
                >
                  {/* Step Number Dot (Desktop) */}
                  <div className="hidden md:flex absolute -left-12 top-5 w-6 h-6 rounded-full bg-[#181a22] border border-[#38bdf8] text-[#38bdf8] font-mono text-xs font-bold items-center justify-center -translate-x-1/2">
                    {step.step}
                  </div>

                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="md:hidden font-mono text-xs font-bold text-[#38bdf8]">
                        Step {step.step}:
                      </span>
                      <span className="font-semibold text-white text-sm">
                        {step.action}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[#38bdf8] border border-[#38bdf8]/20">
                        {step.protocol}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[#fbbf24] border border-[#fbbf24]/20">
                        SLA: {step.latency}
                      </span>
                    </div>
                  </div>

                  {/* Actor -> Target Indicator */}
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8c8f9a]">
                    <span className="px-2 py-0.5 rounded bg-[#181a22] text-[#edeae3] font-medium border border-white/5">
                      {step.actor}
                    </span>
                    <span className="text-[#38bdf8]">────────▶</span>
                    <span className="px-2 py-0.5 rounded bg-[#181a22] text-[#edeae3] font-medium border border-white/5">
                      {step.target}
                    </span>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-[#9da1ad] leading-relaxed font-sans">
                    {step.description}
                  </p>

                  {/* Resilience / Fault Tolerance note */}
                  {step.resilienceNote && (
                    <div className="p-2.5 rounded-lg bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-start gap-2 font-mono text-xs text-[#fbbf24]/90">
                      <span className="shrink-0">⚠️</span>
                      <span className="leading-relaxed">
                        <strong className="font-semibold">Resilience Guarantee:</strong> {step.resilienceNote}
                      </span>
                    </div>
                  )}

                  {/* Data Payload Inspection Drawer */}
                  {step.dataPayload && (
                    <div className="pt-2">
                      <button
                        onClick={() => togglePayload(idx)}
                        className="font-mono text-xs text-[#38bdf8] hover:underline flex items-center gap-1.5"
                      >
                        <span>{expandedPayloads[idx] ? "▼ Hide" : "▶ Inspect"} Wire Data Payload</span>
                      </button>

                      {expandedPayloads[idx] && (
                        <pre className="mt-2 p-3 rounded-lg bg-[#090a0d] border border-white/10 font-mono text-[11px] text-[#34d399] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {step.dataPayload}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: SECURITY & TOPOLOGY ISOLATION */}
      {activeTab === "security" && (
        <div className="flex flex-col gap-6">
          {/* Security Posture Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#ec4899] uppercase tracking-wider">
                <span>🔐</span>
                <span>Auth &amp; Identity Model</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.authModel}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] uppercase tracking-wider">
                <span>🏢</span>
                <span>Tenant &amp; Data Isolation</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.isolationModel}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf] uppercase tracking-wider">
                <span>⚡</span>
                <span>Encryption in Transit</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.encryptionInTransit}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider">
                <span>🛡️</span>
                <span>Encryption at Rest</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.encryptionAtRest}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#a78bfa] uppercase tracking-wider">
                <span>🔄</span>
                <span>Resilience &amp; Failover</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.resilienceStrategy}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#34d399] uppercase tracking-wider">
                <span>📋</span>
                <span>Audit &amp; Compliance</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] leading-relaxed font-sans">
                {arch.security.complianceOrAudit}
              </p>
            </div>
          </div>

          {/* Deep Architectural Highlights */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
              Zero-Trust Architecture &amp; Engineering Controls
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {arch.security.keyHighlights.map((highlight, i) => (
                <div
                  key={highlight.title}
                  className="p-5 rounded-xl bg-[#0e0f14] border border-white/10 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf]">
                    <span>0{i + 1} //</span>
                    <h5 className="font-medium text-white text-sm font-sans">{highlight.title}</h5>
                  </div>
                  <p className="text-xs text-[#9da1ad] leading-relaxed font-sans">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
