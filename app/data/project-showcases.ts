export interface ProjectShowcase {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  timeline: string;
  githubUrl: string;
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
    method: "GET" | "POST" | "PUT" | "DELETE" | "gRPC" | "KAFKA";
    path: string;
    description: string;
  }[];
  awsServices: string[];
}

export const PROJECT_SHOWCASES: Record<string, ProjectShowcase> = {
  clynic: {
    slug: "clynic",
    name: "Clynic Microservices",
    subtitle: "Clinical Patient Management, Billing & Diagnostic Services",
    summary:
      "A distributed microservices architecture engineered with Java Spring Boot, gRPC for fast inter-service messaging, and Apache Kafka for asynchronous transaction settlement and diagnostic notifications.",
    timeline: "Apr 2025 - Present",
    githubUrl: "https://github.com/beingadish/Clynic",
    liveUrl: process.env.NEXT_PUBLIC_CLYNIC_URL || "https://clynic-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_CLYNIC_API_URL || "https://api.clynic.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Spring Boot 3",
      "Java 21",
      "gRPC",
      "Apache Kafka",
      "PostgreSQL",
      "Docker",
      "LocalStack",
      "AWS CDK",
      "Next.js",
    ],
    awsServices: ["AWS ECS Fargate", "Amazon RDS PostgreSQL", "AWS API Gateway", "Amazon MSK (Kafka)", "AWS Secrets Manager"],
    metrics: [
      { label: "Inter-Service Latency", value: "< 8ms", sublabel: "via gRPC binary protocol" },
      { label: "Kafka Event Throughput", value: "50K+ msg/s", sublabel: "zero-loss partitioning" },
      { label: "Deployment Target", value: "AWS ECS", sublabel: "containerized Fargate" },
      { label: "Frontend Host", value: "Vercel", sublabel: "Next.js App Router" },
    ],
    architectureHighlights: [
      {
        title: "gRPC High-Throughput Inter-Service Communication",
        description:
          "High-performance RPC channels between Patient Service, Billing Service, and Notification Gateway, eliminating HTTP JSON serialization overhead.",
      },
      {
        title: "Kafka Event-Driven Settlement & Audit Streams",
        description:
          "Asynchronous event ingestion for clinical billing cycles, patient discharge events, and transaction receipts with idempotent consumer groups.",
      },
      {
        title: "Cloud Simulation with LocalStack & AWS CDK",
        description:
          "Infrastructure as code defined with AWS CDK TypeScript and validated locally with LocalStack before provisioning against AWS production accounts.",
      },
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/patients", description: "Create and register patient records" },
      { method: "gRPC", path: "billing.BillingService/ProcessInvoice", description: "Internal zero-copy invoice generation" },
      { method: "KAFKA", path: "clinical.events.discharge", description: "Discharge event broadcast to billing and pharmacy" },
      { method: "GET", path: "/api/v1/analytics/summary", description: "Real-time clinical ward occupancy metrics" },
    ],
  },

  talkingyt: {
    slug: "talkingyt",
    name: "TalkingYouTube",
    subtitle: "Persistent Semantic RAG for YouTube Transcripts",
    summary:
      "A full-stack GenAI application that ingests video transcripts, computes dense vector representations with Google Gemini, stores embeddings in PostgreSQL + pgvector, and delivers grounded, timestamped conversational answers.",
    timeline: "Oct 2025 - Present",
    githubUrl: "https://github.com/beingadish/TalkingYT",
    liveUrl: process.env.NEXT_PUBLIC_TALKINGYT_URL || "https://talkingyt-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_TALKINGYT_API_URL || "https://api.talkingyt.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Python 3.11",
      "FastAPI",
      "Google Gemini Embeddings",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "Docker Compose",
      "Next.js",
    ],
    awsServices: ["AWS App Runner", "Amazon Aurora PostgreSQL (pgvector)", "AWS CloudFront", "Amazon S3"],
    metrics: [
      { label: "Vector Search Latency", value: "< 24ms", sublabel: "Cosine distance with HNSW" },
      { label: "Embedding Model", value: "Gemini 768d", sublabel: "Dense semantic vectors" },
      { label: "Container Security", value: "1C / 4H", sublabel: "Hardened via Docker Scout" },
      { label: "Session Persistence", value: "PostgreSQL", sublabel: "Full conversational memory" },
    ],
    architectureHighlights: [
      {
        title: "Dense Vector Similarity with pgvector",
        description:
          "Stores 768-dimensional embeddings directly in PostgreSQL using pgvector, enabling relational joining of chat sessions with vector similarity search.",
      },
      {
        title: "Timestamped Grounded Citations",
        description:
          "Chunks video transcripts with precise video timestamp offsets, allowing the LLM response to link directly to exact moments in the YouTube video.",
      },
      {
        title: "Hardened Container Infrastructure",
        description:
          "Multi-stage Docker builds scanned with Docker Scout, eliminating critical CVEs and packaged for seamless deployment on AWS container services.",
      },
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/transcripts/ingest", description: "Extract and vectorize YouTube video transcripts" },
      { method: "POST", path: "/api/v1/chat/completions", description: "Semantic vector search + RAG generation" },
      { method: "GET", path: "/api/v1/sessions/{id}/history", description: "Retrieve persistent chat history" },
      { method: "DELETE", path: "/api/v1/videos/{id}", description: "Cascade-delete vector embeddings for video" },
    ],
  },

  aroundu: {
    slug: "aroundu",
    name: "AroundU",
    subtitle: "Hyperlocal Freelancing & Real-Time Job Discovery Platform",
    summary:
      "A modular monolith in Java 21 engineered with Redis GEO spatial indexing for sub-5ms nearby gig discovery, PostgreSQL source-of-truth, Resilience4j fault tolerance, and Kubernetes orchestration.",
    timeline: "Jan 2026 - Present",
    githubUrl: "https://github.com/orgs/AroundUPlatform/repositories",
    liveUrl: process.env.NEXT_PUBLIC_AROUNDU_URL || "https://aroundu-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_AROUNDU_API_URL || "https://api.aroundu.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Redis GEO",
      "PostgreSQL",
      "Resilience4j",
      "Docker",
      "Kubernetes (k3s)",
      "Prometheus",
      "Grafana",
    ],
    awsServices: ["AWS EC2", "Amazon ElastiCache Redis", "Amazon RDS PostgreSQL", "AWS Application Load Balancer"],
    metrics: [
      { label: "Geo-Spatial Query SLA", value: "< 5ms", sublabel: "via Redis GEO radius search" },
      { label: "Circuit Breaker", value: "Resilience4j", sublabel: "Zero cascading payment failures" },
      { label: "Orchestration", value: "k3s / K8s", sublabel: "Autoscaling + NGINX Ingress" },
      { label: "Observability", value: "Prometheus", sublabel: "Custom aroundu.* metrics" },
    ],
    architectureHighlights: [
      {
        title: "Two-Tier Geospatial Search Architecture",
        description:
          "High-velocity geospatial coordinates indexed in Redis GEO with coordinate radius queries, lazily hydrated from PostgreSQL.",
      },
      {
        title: "Resilient Escrow Payments",
        description:
          "State-machine managed job escrow transactions with distributed locking, automated circuit breakers, and exponential backoff retries.",
      },
      {
        title: "Telemetry & Custom Micrometer Observability",
        description:
          "Comprehensive metrics exported to Prometheus and visualized on Grafana dashboards for transaction rates, failure states, and P99 latency.",
      },
    ],
    endpoints: [
      { method: "GET", path: "/api/v1/jobs/nearby", description: "Redis GEO radius query by user lat/long" },
      { method: "POST", path: "/api/v1/jobs/bid", description: "Atomic bidding with distributed lock" },
      { method: "POST", path: "/api/v1/escrow/release", description: "Two-phase OTP escrow settlement" },
      { method: "GET", path: "/actuator/prometheus", description: "Scrape target for Prometheus & Grafana" },
    ],
  },
};

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_SHOWCASES);
}

export function getProjectShowcase(slug: string): ProjectShowcase | undefined {
  return PROJECT_SHOWCASES[slug.toLowerCase()];
}
