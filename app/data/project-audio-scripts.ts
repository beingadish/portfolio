export interface ProjectAudioTrack {
  slug: string;
  name: string;
  brief: {
    audioUrl: string;
    duration: string;
    durationSeconds: number;
    text: string;
  };
  detailed: {
    audioUrl: string;
    duration: string;
    durationSeconds: number;
    text: string;
  };
}

export const PROJECT_AUDIO_TRACKS: Record<string, ProjectAudioTrack> = {
  aroundu: {
    slug: "aroundu",
    name: "AroundU",
    brief: {
      audioUrl: "/audio/projects/aroundu_brief.wav",
      duration: "0:42",
      durationSeconds: 42,
      text: "AroundU is a high-scale hyperlocal gig discovery and freelancing platform built in Java 21 and Spring Boot 3. It solves the cold-start and latency bottlenecks of local service matching using Redis GEO spatial indexing, achieving sub-5 millisecond radius queries for nearby workers. The platform features an atomic bidding engine, two-phase OTP escrow settlement, and Resilience4j circuit breakers to guarantee zero cascading payment failures under high concurrency. It is containerized and orchestrated on AWS EC2 using a lightweight Kubernetes k3s cluster with automated NGINX ingress routing.",
    },
    detailed: {
      audioUrl: "/audio/projects/aroundu_detailed.wav",
      duration: "1:48",
      durationSeconds: 108,
      text: "Welcome to the technical architecture deep dive of AroundU. At its core, AroundU is structured as a production-grade modular monolith in Java 21. By grouping domain services around bidding, job state lifecycles, and escrow payments into clean packages, we eliminate distributed network hops while keeping clear architectural boundaries. For spatial search, traditional relational distance queries cause heavy table scans under high query volume. We solved this with a two-tier geospatial indexing strategy: live worker and job coordinates are indexed in Redis GEO sets, allowing radius searches to execute in sub-five milliseconds. The database tier in Amazon RDS PostgreSQL remains the durable source of truth, hydrated on demand. For payments, job funds are held in escrow using a state machine with distributed locking, ensuring that bids and funds cannot be double-allocated during concurrent transactions. Resilience4j circuit breakers and exponential backoff retries isolate third-party payment gateways, ensuring high availability. On the cloud infrastructure side, AroundU runs on AWS EC2 instances running a Kubernetes k3s cluster, with automated Horizontal Pod Autoscaling and NGINX Ingress controllers. Production observability is powered by custom Micrometer aroundu metrics scraped into Prometheus and monitored in real time on Grafana dashboards.",
    },
  },

  clynic: {
    slug: "clynic",
    name: "Clynic Microservices",
    brief: {
      audioUrl: "/audio/projects/clynic_brief.wav",
      duration: "0:36",
      durationSeconds: 36,
      text: "Clynic 2.0 is a domain-driven, multi-tenant digital hospital platform built with Java Spring Boot 3 microservices for human and veterinary care. It features Spring Cloud Gateway for edge routing, realm-per-tenant identity with Keycloak, zero-overhead gRPC binary contracts for high-speed inter-service communication, and Apache Kafka for asynchronous clinical audit and billing settlement streams. The entire cloud infrastructure is defined with AWS CDK and orchestrated locally with Docker and Kubernetes.",
    },
    detailed: {
      audioUrl: "/audio/projects/clynic_detailed.wav",
      duration: "1:42",
      durationSeconds: 102,
      text: "Welcome to the architecture walkthrough of Clynic 2.0. As modern hospitals scale across multiple facilities and departments, multi-tenant data isolation and low latency become critical requirements. Clynic solves this using a realm-per-tenant security model. At the edge, Spring Cloud Gateway validates incoming JWT tokens, injects a verified TenantContext header, and routes requests to domain-isolated services. Internal communication between the Patient Registry, Appointment Scheduler, and Billing Service does not use heavy HTTP JSON. Instead, we use gRPC over HTTP/2 with Protocol Buffers, achieving sub-eight millisecond inter-service RPC latencies and strict compile-time contract enforcement. For asynchronous workflows, when a patient is discharged, a Kafka event is published to partitioned clinical audit topics. Downstream analytics and invoicing consumers ingest these messages idempotently, guaranteeing that billing batches are processed without blocking clinical staff. The infrastructure is codified using AWS CDK in TypeScript. It provisions Amazon ECS Fargate for serverless container execution, Amazon Aurora PostgreSQL for multi-tenant clinical records, and Amazon MSK for managed Kafka streaming. For local development, Docker Compose and KIND clusters emulate the full AWS environment with LocalStack.",
    },
  },

  janmat: {
    slug: "janmat",
    name: "JanMat Platform",
    brief: {
      audioUrl: "/audio/projects/janmat_brief.wav",
      duration: "0:38",
      durationSeconds: 38,
      text: "JanMat is a high-concurrency, privacy-preserving civic democracy and polling platform engineered in Rust using Tokio and Axum. It delivers sub-millisecond atomic vote tallying for over 100,000 concurrent connections. Voters are authenticated via zero-knowledge credential nullifiers, ensuring one citizen, one vote without ever revealing personal identities. Every ballot produces an immutable Blake3 cryptographic commitment, creating a tamper-proof and verifiably auditable voting ledger deployed on AWS App Runner and Vercel.",
    },
    detailed: {
      audioUrl: "/audio/projects/janmat_detailed.wav",
      duration: "1:45",
      durationSeconds: 105,
      text: "Welcome to the engineering architecture deep dive of JanMat. In public civic polling and constitutional voting systems, the central engineering challenge is balancing absolute voter anonymity with verifiable anti-tampering and high throughput. JanMat solves this using zero-knowledge identity nullifiers. Powered by RISC Zero zk-SNARK circuits, citizens prove valid voter eligibility derived from credentials, but their personal identity numbers never touch the network. The system stores a unique mathematical nullifier on-chain to guarantee that no user can cast more than one ballot. On the ingestion side, the backend is written in Rust using Tokio's asynchronous runtime and Axum web framework. Handling peak civic voting events requires extreme throughput: votes are batched into an atomic in-memory Redis aggregation layer, achieving sub-millisecond tally latencies before being asynchronously flushed to Amazon Aurora PostgreSQL. Every cast vote generates an immutable Blake3 cryptographic hash commitment. This allows any voter to independently audit that their ballot is included in the final aggregation without revealing their voting choice. For deployment, the Rust container runs serverlessly on AWS App Runner with Amazon ElastiCache Redis, while the reactive voting interface is hosted on Vercel Edge with live WebSocket tally streams.",
    },
  },

  talkingyt: {
    slug: "talkingyt",
    name: "TalkingYouTube",
    brief: {
      audioUrl: "/audio/projects/talkingyt_brief.wav",
      duration: "0:32",
      durationSeconds: 32,
      text: "TalkingYouTube is a persistent semantic RAG system for YouTube transcripts built with Python FastAPI, Google Gemini embeddings, and PostgreSQL with pgvector. It allows users to chat naturally with long-form video content, producing grounded conversational answers with precise timestamped citations. Sessions, embeddings, and chat histories are permanently retained, and the containerized architecture is hardened to minimal CVEs using Docker Scout.",
    },
    detailed: {
      audioUrl: "/audio/projects/talkingyt_detailed.wav",
      duration: "1:35",
      durationSeconds: 95,
      text: "Welcome to the technical walkthrough of TalkingYouTube. TalkingYouTube delivers grounded conversational retrieval-augmented generation over long-form YouTube video transcripts. When a YouTube video URL is submitted, the ingestion pipeline extracts transcript tracks, chunks the text semantically with sliding windows, and generates 768-dimensional dense vector embeddings using Google's Gemini embedding model. These vectors are stored directly in PostgreSQL using the pgvector extension with Hierarchical Navigable Small World indexing, enabling vector similarity queries to execute in under 25 milliseconds while keeping relational session metadata tightly coupled. When answering questions, the system extracts relevant semantic chunks and formats timestamped citations, allowing the user to click and jump directly to the exact moment in the YouTube video where the topic is discussed. The stack is built with FastAPI and Next.js, containerized with Docker Compose, and hardened using Docker Scout to reduce vulnerabilities from 28 high-severity CVEs down to four. In production, it is deployed across AWS App Runner and Amazon Aurora PostgreSQL.",
    },
  },

  campusdesk: {
    slug: "campusdesk",
    name: "CampusDesk",
    brief: {
      audioUrl: "/audio/projects/campusdesk_brief.wav",
      duration: "0:42",
      durationSeconds: 42,
      text: "CampusDesk is a lightweight, student-first lecture planner and mandatory 75% attendance calculator built with React 18, TypeScript, and Tailwind CSS. It features an automated safe bunk forecaster that mathematically computes permissible lecture cuts and minimum required classes to maintain semester examination eligibility. Designed for zero-lag mobile responsiveness, it runs completely client-side with offline local storage state hydration, zero external API tracking, and is deployed on AWS EC2 via NGINX with zero operating cost.",
    },
    detailed: {
      audioUrl: "/audio/projects/campusdesk_detailed.wav",
      duration: "1:33",
      durationSeconds: 93,
      text: "Welcome to the technical architecture deep dive of CampusDesk. College students across Indian technical universities face strict 75% mandatory attendance regulations where falling below the threshold risks semester debarment. CampusDesk eliminates guesswork with an inverse mathematical inequality solver. Instead of simple percentage divisions, the engine dynamically solves for two scenarios: first, safe bunk forecast, determining the exact number of consecutive upcoming lectures a student can skip without dropping below seventy-five percent; and second, target recovery forecast, computing the exact number of consecutive classes required to recover if currently in the warning zone. Built with React 18 and Vite, the entire state machine executes synchronously in under one millisecond with optimistic UI updates. All subject profiles, lecture tallies, and past history are hydrated and persisted strictly in browser local storage, ensuring complete student privacy with zero telemetry or server-side logging. For deployment, CampusDesk is containerized into a tiny static artifact served via NGINX reverse-proxying on an AWS EC2 t3.micro instance alongside edge routing on Vercel, incurring zero monthly infrastructure cost.",
    },
  },

  gradeorbit: {
    slug: "gradeorbit",
    name: "GradeOrbit",
    brief: {
      audioUrl: "/audio/projects/gradeorbit_brief.wav",
      duration: "0:41",
      durationSeconds: 41,
      text: "GradeOrbit is an academic performance tracker and target honors predictor engineered for engineering students using React, TypeScript, and Vite. It provides real-time semester-wise SGPA tracking, cumulative CGPA calculation, and an inverse credit-weighted solver that calculates the minimum GPA required across remaining semesters to graduate with target honors such as First Class with Distinction. It operates with zero backend overhead, instant client-side calculation, and is hosted on AWS EC2 and Vercel Edge.",
    },
    detailed: {
      audioUrl: "/audio/projects/gradeorbit_detailed.wav",
      duration: "1:27",
      durationSeconds: 87,
      text: "Welcome to the technical architecture overview of GradeOrbit. In modern credit-based choice systems and engineering degree programs, students need to plan multi-year academic trajectories to secure degree honors and eligibility for campus placements and higher education. GradeOrbit solves this through a credit-weighted inverse solver. By inputting completed semester SGPAs and credit allocations alongside anticipated future credits, the algorithm computes the exact average SGPA required across future semesters to achieve a target CGPA threshold, such as 8.5 for First Class with Distinction. The engine supports standard 10-point UGC and AICTE grading scales with custom grade-to-point mappings. Built on React 18 and TypeScript with modular components, all calculations occur client-side with zero network round trips. State is seamlessly preserved across browser reloads using responsive local storage bindings. The production application is served as static optimized assets on AWS EC2 with NGINX edge caching and globally replicated Vercel Edge CDN nodes, guaranteeing zero backend latency, zero database maintenance, and zero operational expenditure.",
    },
  },
};
