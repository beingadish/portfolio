export interface ProjectShowcase {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  timeline: string;
  githubUrl: string;
  localPath: string;
  liveUrl?: string; // Vercel deployment URL
  backendApiUrl?: string; // AWS API Gateway / ALB / ECS URL
  swaggerUrl?: string;
  status: "live" | "provisioning" | "demo";
  stack: string[];
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  architectureHighlights: {
    title: string;
    description: string;
  }[];
  endpoints: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "gRPC" | "KAFKA" | "ZK";
    path: string;
    description: string;
  }[];
  awsServices: string[];
}

export const PROJECT_SHOWCASES: Record<string, ProjectShowcase> = {
  aroundu: {
    slug: "aroundu",
    name: "AroundU",
    subtitle: "Hyperlocal Freelancing Platform & Real-Time Gig Discovery",
    summary:
      "A production-grade modular monolith in Java 21 for real-time job discovery, bidding, escrow payments, OTP verification, and reviews, featuring Redis GEO spatial indexing for sub-5ms nearby searches and Resilience4j fault tolerance.",
    timeline: "Jan 2026 - Present",
    githubUrl: "https://github.com/orgs/AroundUPlatform/repositories",
    localPath: "/Users/beingadish/Developer/CODE/Projects/AroundU",
    liveUrl: process.env.NEXT_PUBLIC_AROUNDU_URL || "https://aroundu-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_AROUNDU_API_URL || "https://api.aroundu.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Next.js 14",
      "Redis GEO",
      "PostgreSQL",
      "Resilience4j",
      "Docker",
      "Kubernetes (k3s)",
      "Prometheus",
      "Grafana",
    ],
    awsServices: [
      "AWS EC2 (k3s Cluster)",
      "Amazon ElastiCache Redis",
      "Amazon RDS PostgreSQL",
      "AWS Application Load Balancer",
      "AWS Route 53",
    ],
    metrics: [
      { label: "Geo-Spatial Query SLA", value: "< 5ms", sublabel: "via Redis GEO radius search" },
      { label: "Circuit Breaker", value: "Resilience4j", sublabel: "Zero cascading payment failures" },
      { label: "Orchestration", value: "AWS EC2 + k3s", sublabel: "Autoscaling + NGINX Ingress" },
      { label: "Frontend Host", value: "Vercel", sublabel: "Next.js 14 App Router" },
    ],
    architectureHighlights: [
      {
        title: "Two-Tier Geospatial Search Architecture",
        description:
          "High-velocity geospatial coordinates indexed in Redis GEO with radius searches, lazily hydrated from PostgreSQL for fast gig discovery within user proximity.",
      },
      {
        title: "Resilient Escrow Payments & Distributed Locking",
        description:
          "State-machine managed job escrow transactions with distributed locking, automated circuit breakers via Resilience4j, and exponential backoff retries.",
      },
      {
        title: "Custom Micrometer & Prometheus Telemetry",
        description:
          "Production observability exporting aroundu.* custom business metrics, latency percentiles, and JVM telemetry directly to Prometheus and Grafana dashboards.",
      },
    ],
    endpoints: [
      { method: "GET", path: "/api/v1/jobs/nearby", description: "Redis GEO radius query by user latitude and longitude" },
      { method: "POST", path: "/api/v1/bid", description: "Atomic bidding with distributed lock on job state" },
      { method: "POST", path: "/api/v1/payment/escrow", description: "Two-phase OTP escrow settlement release" },
      { method: "GET", path: "/actuator/prometheus", description: "Prometheus scraping endpoint for P99 telemetry" },
    ],
  },

  clynic: {
    slug: "clynic",
    name: "Clynic Microservices",
    subtitle: "Multi-Tenant Hospital Microservices Platform (Human & Vet Care)",
    summary:
      "A domain-driven multi-tenant microservices hospital platform featuring Spring Cloud Gateway, realm-per-tenant identity (Keycloak), gRPC internal service contracts, Apache Kafka event streams, and a reactive Vite/React web app.",
    timeline: "Apr 2025 - Present",
    githubUrl: "https://github.com/beingadish/Clynic",
    localPath: "/Users/beingadish/Developer/CODE/SpringBoot/Clynic",
    liveUrl: process.env.NEXT_PUBLIC_CLYNIC_URL || "https://clynic-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_CLYNIC_API_URL || "https://api.clynic.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Spring Boot 3",
      "Java 21",
      "gRPC",
      "Apache Kafka",
      "PostgreSQL",
      "React",
      "Vite",
      "Docker",
      "AWS CDK",
      "LocalStack",
    ],
    awsServices: [
      "AWS ECS Fargate",
      "Amazon RDS PostgreSQL",
      "Amazon MSK (Managed Kafka)",
      "AWS API Gateway",
      "AWS Secrets Manager",
    ],
    metrics: [
      { label: "Inter-Service Latency", value: "< 8ms", sublabel: "via gRPC binary protocol" },
      { label: "Kafka Event Throughput", value: "50K+ msg/s", sublabel: "Zero-loss audit stream" },
      { label: "Architecture", value: "Multi-Tenant", sublabel: "Realm-per-tenant isolation" },
      { label: "Frontend Host", value: "Vercel", sublabel: "Vite + React + Tailwind" },
    ],
    architectureHighlights: [
      {
        title: "gRPC Binary Inter-Service Messaging",
        description:
          "Zero-overhead RPC channels between Patient Registry, Appointment Service, and Billing Service using strongly-typed Protocol Buffers stubs.",
      },
      {
        title: "Kafka Event-Driven Settlement & Clinical Audit",
        description:
          "Asynchronous event streams for patient discharges, billing charges, and pharmacy orders with idempotent consumer group processing.",
      },
      {
        title: "Cloud Infrastructure as Code with AWS CDK",
        description:
          "Full cloud topology defined in TypeScript with AWS CDK and pre-tested with LocalStack before ECS Fargate and RDS provisioning.",
      },
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/patients", description: "Create and register tenant-scoped patient records" },
      { method: "gRPC", path: "billing.BillingService/ProcessInvoice", description: "Internal binary RPC for zero-copy invoice generation" },
      { method: "KAFKA", path: "clinical.events.discharge", description: "Discharge event broadcast across hospital wards" },
      { method: "GET", path: "/api/v1/analytics/summary", description: "Real-time clinical ward occupancy and financial metrics" },
    ],
  },

  janmat: {
    slug: "janmat",
    name: "JanMat Platform",
    subtitle: "Rust-First, Blockchain-Anchored Civic Democracy & Polling Engine",
    summary:
      "A privacy-preserving, tamper-proof civic opinion and polling platform engineered in Rust (Tokio + Axum) with zero-knowledge identity nullifiers, Blake3 cryptographic audit commitments, Redis in-memory aggregation, and an interactive web interface.",
    timeline: "Jun 2026 - Present",
    githubUrl: "https://github.com/beingadish/JanMat",
    localPath: "/Users/beingadish/Developer/CODE/Projects/JanMat",
    liveUrl: process.env.NEXT_PUBLIC_JANMAT_URL || "https://janmat-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_JANMAT_API_URL || "https://api.janmat.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Rust",
      "Tokio Async",
      "Axum",
      "Blake3",
      "ZK Proofs (RISC Zero)",
      "Redis",
      "PostgreSQL",
      "React",
      "Vite",
      "Docker",
    ],
    awsServices: [
      "AWS App Runner",
      "Amazon Aurora PostgreSQL",
      "Amazon ElastiCache Redis",
      "AWS CloudFront",
      "AWS KMS",
    ],
    metrics: [
      { label: "Vote Tallying Latency", value: "< 1ms", sublabel: "Atomic Redis counters" },
      { label: "Concurrency", value: "100K+ conn", sublabel: "Zero-cost Rust async IO" },
      { label: "Privacy Model", value: "ZK Nullifiers", sublabel: "Anonymous Blake3 audits" },
      { label: "Frontend Host", value: "Vercel", sublabel: "Vite + React SPA" },
    ],
    architectureHighlights: [
      {
        title: "Sub-Millisecond Vote Ingestion in Rust",
        description:
          "High-throughput non-blocking asynchronous network IO powered by Tokio and Axum, persisting atomic counts to Redis before batch-flushing to PostgreSQL.",
      },
      {
        title: "Zero-Knowledge & Blake3 Cryptographic Commitments",
        description:
          "Votes are signed with one-time ZK nullifiers derived from verified citizen credentials; every ballot produces an immutable Blake3 audit receipt.",
      },
      {
        title: "Real-Time WebSocket Results & CloudFront Caching",
        description:
          "Live civic voting tallies broadcast via WebSockets to the Vite/React frontend and cached at CloudFront edge nodes with short TTL invalidation.",
      },
    ],
    endpoints: [
      { method: "POST", path: "/pub/topics/{id}/vote", description: "Cast anonymous ballot with ZK nullifier and Blake3 hash" },
      { method: "GET", path: "/pub/topics/{id}/tally", description: "Fetch real-time verified poll aggregation" },
      { method: "ZK", path: "janmat_zk::verify_kyc_nullifier", description: "Zero-knowledge credential verification circuit" },
      { method: "GET", path: "/pub/live/ws", description: "Real-time WebSocket stream for election and opinion updates" },
    ],
  },
};

export const CONNECTED_PROJECT_SLUGS = ["aroundu", "clynic", "janmat"] as const;

export function getAllProjectSlugs(): string[] {
  return [...CONNECTED_PROJECT_SLUGS];
}

export function getProjectShowcase(slug: string): ProjectShowcase | undefined {
  return PROJECT_SHOWCASES[slug.toLowerCase()];
}
