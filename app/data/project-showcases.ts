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

  awsiot: {
    slug: "awsiot",
    name: "AWS IoT Fleet Telemetry",
    subtitle: "Industrial Heavy Machinery IoT Stream Pipeline",
    summary:
      "A resilient cloud telemetry consumption pipeline handling intermittent sensor streams from heavy mining and construction machinery across AWS IoT Core, MQTT, Lambda, Kinesis, and DynamoDB.",
    timeline: "Jul 2026 - Present",
    githubUrl: "https://github.com/beingadish",
    liveUrl: process.env.NEXT_PUBLIC_AWSIOT_URL || "https://awsiot-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_AWSIOT_API_URL || "https://api.iot.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "AWS IoT Core",
      "MQTT",
      "AWS SAM",
      "AWS Lambda",
      "Amazon Kinesis",
      "Amazon DynamoDB",
      "Docker",
    ],
    awsServices: [
      "AWS IoT Core",
      "Amazon Kinesis Data Streams",
      "AWS Lambda (Serverless)",
      "Amazon DynamoDB",
      "Amazon S3",
      "Amazon CloudWatch",
    ],
    metrics: [
      { label: "Ingest SLA", value: "< 15ms", sublabel: "MQTT publish to Kinesis" },
      { label: "Stream Sharding", value: "Autoscaled", sublabel: "Kinesis partition keys" },
      { label: "Idempotency", value: "DynamoDB Lock", sublabel: "Zero duplicate records" },
      { label: "Deploy Tooling", value: "AWS SAM", sublabel: "Infrastructure as Code" },
    ],
    architectureHighlights: [
      {
        title: "Intermittent Connectivity & Out-of-Order Handling",
        description:
          "Buffers device state in local device queues, replaying bursts through MQTT topics upon reconnection with sequence reconciliation.",
      },
      {
        title: "Kinesis Stream Fanout to Serverless Lambdas",
        description:
          "High-throughput stream processing utilizing enhanced fan-out consumer Lambdas with custom batch window aggregation.",
      },
      {
        title: "Idempotent DynamoDB Deduplication",
        description:
          "Conditional write expressions and TTL expiration prevent duplicate billing and telemetry points from processing multiple times.",
      },
    ],
    endpoints: [
      { method: "POST", path: "iot/fleet/{deviceId}/telemetry", description: "MQTT topic for telemetry sensor packets" },
      { method: "GET", path: "/api/v1/telemetry/latest", description: "Query current machine status and coordinates" },
      { method: "POST", path: "/api/v1/alerts/threshold", description: "Configure machine pressure/heat trigger alerts" },
    ],
  },

  janmat: {
    slug: "janmat",
    name: "JanMat Polling Engine",
    subtitle: "High-Throughput Public Sentiment & Polling Platform",
    summary:
      "A high-concurrency public sentiment engine engineered with a Rust async backend for microsecond vote counting and a reactive web application hosted on Vercel.",
    timeline: "Jun 2026 - Present",
    githubUrl: "https://github.com/beingadish/JanMat",
    liveUrl: process.env.NEXT_PUBLIC_JANMAT_URL || "https://janmat-demo.vercel.app",
    backendApiUrl: process.env.NEXT_PUBLIC_JANMAT_API_URL || "https://api.janmat.aws.beingadish.blog",
    status: "provisioning",
    stack: [
      "Rust",
      "Tokio Async",
      "Actix-web",
      "PostgreSQL",
      "Redis",
      "React",
      "Vite",
      "Docker",
    ],
    awsServices: [
      "AWS App Runner",
      "Amazon Aurora PostgreSQL",
      "Amazon ElastiCache Redis",
      "AWS CloudFront",
    ],
    metrics: [
      { label: "Vote Tallying Latency", value: "< 1ms", sublabel: "In-memory atomic counters" },
      { label: "Concurrency", value: "100K+ conn", sublabel: "Zero-cost Rust async" },
      { label: "Frontend Host", value: "Vercel", sublabel: "React + Vite SPA" },
      { label: "Container Engine", value: "App Runner", sublabel: "Serverless container runtime" },
    ],
    architectureHighlights: [
      {
        title: "Sub-Millisecond Vote Ingestion in Rust",
        description:
          "Non-blocking asynchronous network IO using Tokio runtime, persisting atomic counts to Redis before flushing to PostgreSQL.",
      },
      {
        title: "Cryptographic Tamper-Proof Ballot Audits",
        description:
          "Every vote is hashed with a verifiable audit receipt, allowing users to verify their vote was counted without revealing their identity.",
      },
      {
        title: "Edge Cached Dynamic Results",
        description:
          "Live polling updates streamed via WebSockets or long-polling, cached at AWS CloudFront edge with short invalidation windows.",
      },
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/polls/{id}/vote", description: "Submit encrypted vote with duplicate prevention" },
      { method: "GET", path: "/api/v1/polls/{id}/results", description: "Fetch cached real-time tally" },
      { method: "GET", path: "/api/v1/polls/{id}/ws", description: "WebSocket stream for live results" },
    ],
  },
};

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_SHOWCASES);
}

export function getProjectShowcase(slug: string): ProjectShowcase | undefined {
  return PROJECT_SHOWCASES[slug.toLowerCase()];
}
