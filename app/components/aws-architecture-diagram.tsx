"use client";

import React, { useState } from "react";
import { AWS_ARCHITECTURES, type AwsNode, type AwsArchitectureDiagram } from "../data/aws-architectures";

interface AwsArchitectureDiagramProps {
  slug: string;
}

export function AwsArchitectureDiagramView({ slug }: AwsArchitectureDiagramProps) {
  const diagram: AwsArchitectureDiagram | undefined = AWS_ARCHITECTURES[slug] || AWS_ARCHITECTURES.aroundu;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(diagram.nodes[1]?.id || diagram.nodes[0]?.id);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);

  const selectedNode = diagram.nodes.find((n) => n.id === selectedNodeId) || diagram.nodes[0];

  // Group nodes by subnet
  const edgeNodes = diagram.nodes.filter((n) => n.subnet === "edge");
  const publicNodes = diagram.nodes.filter((n) => n.subnet === "public-subnet");
  const computeNodes = diagram.nodes.filter((n) => n.subnet === "compute-subnet");
  const dataNodes = diagram.nodes.filter((n) => n.subnet === "data-subnet");

  const getCategoryStyles = (category: AwsNode["awsCategory"]) => {
    switch (category) {
      case "compute":
        return {
          badge: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40",
          border: "hover:border-[#f59e0b] group-hover:border-[#f59e0b]/60",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
          iconBg: "bg-[#f59e0b]/10 text-[#f59e0b]",
          bulletColor: "text-[#f59e0b]",
        };
      case "database":
      case "cache":
        return {
          badge: "bg-[#3b82f6]/15 text-[#60a5fa] border-[#3b82f6]/40",
          border: "hover:border-[#3b82f6] group-hover:border-[#3b82f6]/60",
          glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
          iconBg: "bg-[#3b82f6]/10 text-[#60a5fa]",
          bulletColor: "text-[#60a5fa]",
        };
      case "ingress":
      case "edge":
        return {
          badge: "bg-[#2dd4bf]/15 text-[#2dd4bf] border-[#2dd4bf]/40",
          border: "hover:border-[#2dd4bf] group-hover:border-[#2dd4bf]/60",
          glow: "shadow-[0_0_15px_rgba(45,212,191,0.15)]",
          iconBg: "bg-[#2dd4bf]/10 text-[#2dd4bf]",
          bulletColor: "text-[#2dd4bf]",
        };
      case "event":
        return {
          badge: "bg-[#ec4899]/15 text-[#f472b6] border-[#ec4899]/40",
          border: "hover:border-[#ec4899] group-hover:border-[#ec4899]/60",
          glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)]",
          iconBg: "bg-[#ec4899]/10 text-[#f472b6]",
          bulletColor: "text-[#f472b6]",
        };
      case "security":
        return {
          badge: "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/40",
          border: "hover:border-[#10b981] group-hover:border-[#10b981]/60",
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
          iconBg: "bg-[#10b981]/10 text-[#34d399]",
          bulletColor: "text-[#34d399]",
        };
      case "observability":
      default:
        return {
          badge: "bg-[#a855f7]/15 text-[#c084fc] border-[#a855f7]/40",
          border: "hover:border-[#a855f7] group-hover:border-[#a855f7]/60",
          glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
          iconBg: "bg-[#a855f7]/10 text-[#c084fc]",
          bulletColor: "text-[#c084fc]",
        };
    }
  };

  const getAwsIcon = (iconType: AwsNode["iconType"]) => {
    switch (iconType) {
      case "route53":
        return "🌐";
      case "cloudfront":
        return "⚡";
      case "alb":
        return "⚖️";
      case "ec2":
        return "🖥️";
      case "ecs":
        return "📦";
      case "apprunner":
        return "🚀";
      case "redis":
        return "⚡";
      case "rds":
        return "🗄️";
      case "kafka":
        return "📬";
      case "keycloak":
        return "🛡️";
      case "cloudwatch":
        return "📊";
      case "s3":
        return "🪣";
      default:
        return "☁️";
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Topology Header Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#12131a] border border-white/10 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b]">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <span className="font-semibold">AWS VPC</span>
            <span className="text-white/60">({diagram.vpcCidr})</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#8c8f9a]">
            <span>Region:</span>
            <span className="text-[#edeae3] font-medium">{diagram.region}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#8c8f9a]">
            <span>Components:</span>
            <span className="text-[#2dd4bf] font-medium">{diagram.nodes.length} Verified Nodes</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#8c8f9a]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2dd4bf]" />
          <span>Click any component to inspect configuration</span>
        </div>
      </div>

      {/* Main Visual AWS Architecture Canvas */}
      <div className="relative rounded-2xl border-2 border-white/10 bg-[#0a0b10] p-4 sm:p-7 overflow-x-auto shadow-2xl">
        {/* Background Grid Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#2dd4bf 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Outer AWS VPC Boundary */}
        <div className="relative flex flex-col gap-6 rounded-xl border border-dashed border-[#f59e0b]/30 bg-[#0e1017]/90 p-4 sm:p-6">
          {/* VPC Title Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-semibold border border-[#f59e0b]/40">
                AWS VPC
              </span>
              <span className="text-white font-medium">{diagram.projectName} Cloud Mesh</span>
            </div>
            <span className="font-mono text-[11px] text-[#8c8f9a] hidden sm:inline">
              Multi-AZ Fault Tolerant Subnets
            </span>
          </div>

          {/* Subnet 1: Edge & Ingress Zone */}
          {(edgeNodes.length > 0 || publicNodes.length > 0) && (
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#12141d]/70 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#2dd4bf] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
                  ZONE 01: {diagram.zones.publicSubnet || "Public Ingress Subnet"}
                </span>
                <span className="font-mono text-[10px] text-[#8c8f9a] uppercase tracking-wider">
                  Internet Facing · TLS 1.3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[...edgeNodes, ...publicNodes].map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const styles = getCategoryStyles(node.awsCategory);
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`group text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                        isSelected
                          ? `border-[#2dd4bf] bg-[#1a1e28] shadow-lg shadow-[#2dd4bf]/10 scale-[1.02]`
                          : `border-white/10 bg-[#151722]/80 hover:border-white/30 hover:bg-[#1a1d2b]`
                      }`}
                    >
                      <div className="flex items-start justify-between w-full gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${styles.iconBg}`}>
                            {getAwsIcon(node.iconType)}
                          </span>
                          <div>
                            <h4 className="text-xs font-mono font-semibold text-white group-hover:text-[#2dd4bf] transition-colors">
                              {node.shortName}
                            </h4>
                            <span className="text-[10px] text-[#8c8f9a] font-mono block">{node.service}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${styles.badge}`}>
                          {node.metricBadge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8c8f9a] pt-1 border-t border-white/5">
                        <span className="text-white/80">{node.portOrProtocol}</span>
                        <span className="text-[#2dd4bf] text-[10px] group-hover:translate-x-0.5 transition-transform">
                          Inspect →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subnet 2: Private Compute Subnet Zone */}
          {computeNodes.length > 0 && (
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#12141d]/70 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#f59e0b] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  ZONE 02: {diagram.zones.computeSubnet || "Private Compute Subnet"}
                </span>
                <span className="font-mono text-[10px] text-[#8c8f9a] uppercase tracking-wider">
                  Isolated Backend · Horizontal Scaling
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {computeNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const styles = getCategoryStyles(node.awsCategory);
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`group text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                        isSelected
                          ? `border-[#f59e0b] bg-[#1e1c16] shadow-lg shadow-[#f59e0b]/10 scale-[1.02]`
                          : `border-white/10 bg-[#151722]/80 hover:border-white/30 hover:bg-[#1a1d2b]`
                      }`}
                    >
                      <div className="flex items-start justify-between w-full gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${styles.iconBg}`}>
                            {getAwsIcon(node.iconType)}
                          </span>
                          <div>
                            <h4 className="text-xs font-mono font-semibold text-white group-hover:text-[#f59e0b] transition-colors">
                              {node.shortName}
                            </h4>
                            <span className="text-[10px] text-[#8c8f9a] font-mono block">{node.service}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${styles.badge}`}>
                          {node.metricBadge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8c8f9a] pt-1 border-t border-white/5">
                        <span className="text-white/80">{node.portOrProtocol}</span>
                        <span className="text-[#f59e0b] text-[10px] group-hover:translate-x-0.5 transition-transform">
                          Inspect →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subnet 3: Isolated Data & Streaming Subnet Zone */}
          {dataNodes.length > 0 && (
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#12141d]/70 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#3b82f6] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  ZONE 03: {diagram.zones.dataSubnet || "Isolated Data & Storage Subnet"}
                </span>
                <span className="font-mono text-[10px] text-[#8c8f9a] uppercase tracking-wider">
                  No Public IP · Multi-AZ Durability
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {dataNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const styles = getCategoryStyles(node.awsCategory);
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`group text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                        isSelected
                          ? `border-[#3b82f6] bg-[#141b29] shadow-lg shadow-[#3b82f6]/10 scale-[1.02]`
                          : `border-white/10 bg-[#151722]/80 hover:border-white/30 hover:bg-[#1a1d2b]`
                      }`}
                    >
                      <div className="flex items-start justify-between w-full gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${styles.iconBg}`}>
                            {getAwsIcon(node.iconType)}
                          </span>
                          <div>
                            <h4 className="text-xs font-mono font-semibold text-white group-hover:text-[#60a5fa] transition-colors">
                              {node.shortName}
                            </h4>
                            <span className="text-[10px] text-[#8c8f9a] font-mono block">{node.service}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${styles.badge}`}>
                          {node.metricBadge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8c8f9a] pt-1 border-t border-white/5">
                        <span className="text-white/80">{node.portOrProtocol}</span>
                        <span className="text-[#60a5fa] text-[10px] group-hover:translate-x-0.5 transition-transform">
                          Inspect →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Node Detailed Architecture Inspector Panel */}
      {selectedNode && (
        <div className="rounded-xl border border-white/10 bg-[#12131a] p-5 sm:p-6 flex flex-col gap-4 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                {getAwsIcon(selectedNode.iconType)}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">{selectedNode.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${getCategoryStyles(selectedNode.awsCategory).badge}`}>
                    {selectedNode.awsCategory.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-[#8c8f9a]">{selectedNode.service} · {selectedNode.portOrProtocol}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8c8f9a]">Performance SLA:</span>
              <span className="text-xs font-semibold text-[#2dd4bf] px-2.5 py-1 rounded bg-[#2dd4bf]/10 border border-[#2dd4bf]/30">
                {selectedNode.metricBadge}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#9da1ad] font-sans leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs uppercase tracking-wider text-[#8c8f9a]">
              Technical Implementation Details:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedNode.technicalDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0e0f14] border border-white/5 flex items-start gap-2.5 text-[#edeae3]"
                >
                  <span className="text-[#2dd4bf] shrink-0 font-bold">▹</span>
                  <span className="font-sans leading-normal">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verified Inter-Component Data Flows */}
      <div className="rounded-xl border border-white/10 bg-[#12131a] p-5 sm:p-6 flex flex-col gap-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[#8c8f9a] font-semibold">
            Inter-Component Data Flow &amp; Protocol Contracts
          </span>
          <span className="text-[11px] text-[#2dd4bf]">
            {diagram.dataFlows.length} Active Cloud Channels
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
          {diagram.dataFlows.map((flow) => {
            const isHovered = activeFlowId === flow.id;
            return (
              <div
                key={flow.id}
                onMouseEnter={() => setActiveFlowId(flow.id)}
                onMouseLeave={() => setActiveFlowId(null)}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-2 ${
                  isHovered
                    ? "border-[#2dd4bf] bg-[#161a22]"
                    : "border-white/5 bg-[#0e0f14] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{flow.name}</span>
                  <span className="text-[10px] text-[#8c8f9a]">({flow.type})</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#2dd4bf]">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">
                    {flow.label}
                  </span>
                  <span>⚡</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
