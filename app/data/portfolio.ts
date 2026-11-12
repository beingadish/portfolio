export type SocialLink = {
  label: string;
  href: string;
};

export type QuickLinkItem = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "leetcode" | "medium" | "resume";
  download?: boolean;
};

export const profilePhotoSrc = "/profile-photo.jpeg";

export const contactDetails = {
  email: "aadarshpandey.pandey@gmail.com",
  phone: "+91-9170077741",
};

export const primaryQuickLinks = {
  github: { label: "GitHub", href: "https://github.com/beingadish", icon: "github" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/beingadish", icon: "linkedin" },
  leetcode: { label: "LeetCode", href: "https://leetcode.com/u/ax777x", icon: "leetcode" },
  medium: { label: "Medium", href: "https://medium.com/@beingadish", icon: "medium" },
} satisfies Record<"github" | "linkedin" | "leetcode" | "medium", QuickLinkItem>;

export const emailSocialLink: SocialLink = {
  label: "Email",
  href: `mailto:${contactDetails.email}`,
};

const toSocialLink = ({ label, href }: Pick<QuickLinkItem, "label" | "href">): SocialLink => ({
  label,
  href,
});

export const resumeQuickLink: QuickLinkItem = {
  label: "Resume",
  href: "/Aadarsh_Pandey_Resume.pdf",
  icon: "resume",
  download: true,
};

export type FocusInsight = {
  title: string;
  description: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  stack: string[];
};

export type ProjectItem = {
  name: string;
  timeline: string;
  summary: string;
  bullets: string[];
  stack: string[];
  href?: string;
  demoUrl?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type LanguageItem = {
  name: string;
  foundations: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  location: string;
  href?: string;
};

export type BlogSeedLink = {
  title: string;
  url: string;
};

export type AchievementItem = {
  title: string;
  link?: string;
};

export type WritingItem = {
  title: string;
  summary: string;
  meta: string;
  href: string;
};

export type ShowcaseItem = {
  platform: string;
  heading: string;
  preview: string;
  href: string;
};

export const portfolioData = {
  name: "Aadarsh Pandey",
  role: "Software Engineer | Backend, Distributed Systems & Gen AI",
  location: "Bengaluru, Karnataka, India",
  summary:
    "Backend engineer focused on building fast, reliable systems at scale. I currently work on transit and payment infrastructure, and I actively build Gen AI projects around retrieval and semantic search.",
  pitch:
    "I design production-grade APIs, event pipelines, and mobile-backed integrations that handle real-world traffic with strong reliability. My work focuses on backend systems, distributed workflows, and production readiness across high-volume platforms.",
  contact: contactDetails,
  // Replace image here
  profilePhoto: profilePhotoSrc,
  quickLinks: [
    // Replace link here
    primaryQuickLinks.github,
    // Replace link here
    primaryQuickLinks.linkedin,
    // Replace link here
    primaryQuickLinks.leetcode,
    // Replace link here
    primaryQuickLinks.medium,
    // Replace link here
    resumeQuickLink,
  ] as QuickLinkItem[],
  socialLinks: [
    toSocialLink(primaryQuickLinks.linkedin),
    toSocialLink(primaryQuickLinks.github),
    emailSocialLink,
  ] as SocialLink[],
  focusInsights: [
    {
      title: "Professional Focus",
      description: "Backend engineering, distributed services, and production reliability.",
    },
    {
      title: "Engineering Mindset",
      description: "System thinking with clarity-first implementation and maintainable code.",
    },
    {
      title: "Known For",
      description: "Shipping stable features with strong edge-case handling and clean APIs.",
    },
    {
      title: "Working Style",
      description: "Pragmatic execution, collaborative debugging, and quality-driven delivery.",
    },
    {
      title: "Infrastructure Strength",
      description: "Hands-on with containerization, Kubernetes deployments, autoscaling, and production monitoring.",
    },
    {
      title: "System Thinking",
      description: "Strong understanding of backend execution systems, async workflows, and designing frontend experiences around distributed architectures."
    }
  ] as FocusInsight[],
  highlights: [
    "Built and maintained Java Spring Boot APIs for a high-volume transit environment.",
    "Delivered Android app features with MVVM architecture and hardware SDK integrations.",
    "Designed event-driven microservice workflows using Kafka, gRPC, and JWT auth.",
    "Exploring Gen AI systems with RAG pipelines, FAISS vector search, and LangChain.",
    "Deployed production-grade backend using Kubernetes (k3s) with autoscaling and ingress routing.",
    "Built observability pipelines using Prometheus, Grafana, and Micrometer for real-time system insights.",
    "Designed frontend flows for async distributed systems (polling, job lifecycle, failure states).",
    "Collaborated on system design for sandboxed code execution platforms handling untrusted workloads.",
  ],
  experience: [
    {
      title: "Software Engineer Analyst",
      company: "Accenture",
      location: "Bengaluru, India",
      period: "June 2026 - Present",
      bullets: [
        "Working on a large-scale fleet telemetry consumption and processing system that generates insights from heavy mining and construction machinery.",
        "Contributing to backend and cloud development across Java, Spring Boot, MQTT, AWS IoT Core, Lambda, Kinesis, DynamoDB, ECS Fargate, SQS/SNS, CloudFormation, and Snowflake.",
        "Building resilient telemetry flows for intermittent connectivity, retries, idempotency, duplicate and out-of-order events, data validation, and observability.",
      ],
      stack: [
        "Java",
        "Spring Boot",
        "MQTT",
        "AWS IoT Core",
        "Lambda",
        "Kinesis",
        "DynamoDB",
        "ECS Fargate",
        "SQS/SNS",
        "CloudFormation",
        "Snowflake",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "Accenture",
      location: "Bengaluru, India",
      period: "Sep 2024 - May 2026",
      bullets: [
        "Developed and maintained Java Spring Boot microservices for transit payment processing, supporting 1M+ daily transactions across 10+ agencies; implemented Redis caching and composite SQL indexes, reducing payment-confirmation latency by 35%.",
        "Built Kafka consumers in Spring Boot for a settlement pipeline handling 2M+ events/day; integrated Spring Security and JWT for service-to-service authentication.",
        "Refactored legacy payment validation with the Strategy pattern for agency-specific fare rules, improving maintainability.",
      ],
      stack: [
        "Java",
        "Spring Boot",
        "Kafka",
        "Redis",
        "PostgreSQL",
        "Spring Security",
        "JWT",
        "Microservices",
        "Strategy Pattern",
      ],
    },
    {
      title: "Software Development Engineer Intern",
      company: "Ostello India Pvt. Ltd.",
      location: "Remote",
      period: "Mar 2024 - May 2024",
      bullets: [
        "Re-architected a Flutter app to MVVM with Riverpod state management.",
        "Reduced app load time by 78% (5600ms to 1210ms) via caching and UI optimization.",
        "Improved maintainability with clearer structure and documentation for future development.",
      ],
      stack: ["Flutter", "Dart", "Riverpod", "Firebase", "REST APIs"],
    },
    {
      title: "Software Development Engineer Intern",
      company: "BlupX India Pvt. Ltd.",
      location: "Remote",
      period: "Sep 2023 - Mar 2024",
      bullets: [
        "Built a secure cab-booking workflow with real-time Firebase integration.",
        "Integrated Google Maps and Razorpay payment flow with JWT-based authentication.",
        "Contributed to backend integrations using Flutter and Node.js for production use cases.",
      ],
      stack: [
        "Flutter",
        "Node.js",
        "Firebase",
        "Google Maps API",
        "Razorpay",
        "JWT",
        "MongoDB",
      ],
    },
  ] as ExperienceItem[],
  projects: [
    {
      name: "AroundU (Hyperlocal Freelancing Platform)",
      timeline: "Jan 2026 - Present",
      summary:
        "A production-grade modular monolith in Java 21 for job discovery, bidding, escrow payments, OTP verification, and reviews, using Strategy, Decorator, Builder, and Chain of Responsibility.",
      href: "https://github.com/orgs/AroundUPlatform/repositories",
      demoUrl: "/projects/aroundu",
      bullets: [
        "Designed a production-grade modular monolith in Java 21 for job discovery, bidding, escrow payments, OTP verification, and reviews, using Strategy, Decorator, Builder, and Chain of Responsibility.",
        "Engineered geo-spatial search using Redis GEO as a secondary index and PostgreSQL as the source of truth, with fallback queries and retries; deployed on AWS EC2 with Kubernetes (k3s), NGINX Ingress, and HPA.",
        "Built resilient payments with Resilience4j (Circuit Breaker + Retry) and distributed locking; added observability with Actuator, Micrometer, Prometheus, Grafana, and custom aroundu.* metrics.",
      ],
      stack: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "Redis",
        "Resilience4j",
        "JWT",
        "Hibernate",
        "Docker",
        "k3s",
        "Prometheus",
        "Grafana",
      ],
    },
    {
      name: "TalkingYoutube (Semantic RAG System)",
      timeline: "Oct 2025",
      summary:
        "A persistent semantic RAG system for YouTube transcripts using FastAPI, Google Gemini embeddings, and PostgreSQL + pgvector, retaining sessions, embeddings, and chat history with grounded, timestamped citations.",
      href: "https://github.com/beingadish/TalkingYT",
      demoUrl: "/projects/talkingyt",
      bullets: [
        "Built a persistent semantic RAG system for YouTube transcripts using FastAPI, Google Gemini embeddings, and PostgreSQL + pgvector, retaining sessions, embeddings, and chat history with grounded, timestamped citations.",
        "Designed per-video embedding removal with ON DELETE CASCADE; containerized and hardened the stack with Docker Compose and Docker Scout, reducing frontend criticals/highs from 1C/28H to 1C/4H.",
      ],
      stack: [
        "Python",
        "FastAPI",
        "Next.js",
        "PostgreSQL",
        "pgvector",
        "Gemini",
        "RAG",
        "Docker",
        "Docker Compose",
      ],
    },
    {
      name: "Clynic 2.0 (Multi-Tenant Hospital Microservices)",
      timeline: "Apr 2025 - Present",
      summary:
        "A domain-driven multi-tenant microservices platform for clinical and veterinary care featuring Spring Cloud Gateway, realm-per-tenant Keycloak auth, internal gRPC contracts, Kafka streams, and a Vite/React web app.",
      href: "https://github.com/beingadish/Clynic",
      demoUrl: "/projects/clynic",
      bullets: [
        "Implemented realm-per-tenant identity with Keycloak and JWT propagation across microservices via Spring Cloud Gateway.",
        "Engineered zero-overhead internal RPC communications with strongly typed gRPC stubs for patient and billing transactions.",
        "Built Kafka event-driven pipelines for clinical audit logs, patient discharges, and automated payment settlement.",
        "Orchestrated local and cloud stacks using Docker Compose, KIND (Kubernetes), and AWS CDK infrastructure as code.",
      ],
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
        "Keycloak",
      ],
    },
    {
      name: "JanMat (Civic Democracy & Polling Platform)",
      timeline: "Jun 2026 - Present",
      summary:
        "A Rust-first, privacy-preserving civic democracy and polling platform engineered in Tokio and Axum with zero-knowledge identity nullifiers, Blake3 cryptographic audit commitments, and an interactive Vite web interface.",
      href: "https://github.com/beingadish/JanMat",
      demoUrl: "/projects/janmat",
      bullets: [
        "Engineered a high-concurrency async voting engine in Rust using Tokio and Axum, delivering sub-millisecond atomic vote counting.",
        "Implemented zero-knowledge credential verification (RISC Zero) and Blake3 cryptographic commitments for tamper-proof ballot audits.",
        "Integrated an atomic Redis aggregation tier backed by PostgreSQL with real-time WebSocket live tally broadcasts.",
        "Developed a responsive civic voting interface in React + Vite configured for Vercel edge deployment.",
      ],
      stack: [
        "Rust",
        "Tokio",
        "Axum",
        "Blake3",
        "Redis",
        "PostgreSQL",
        "React",
        "Vite",
        "Docker",
        "WebSockets",
      ],
    },
    {
      name: "CodeRunrAI Mobile",
      timeline: "Mar 2026",
      summary:
        "A LeetCode-style mobile coding platform enabling real-time code execution, output visualization, and system design exploration of sandboxed execution systems.",
      href: "https://github.com/beingadish",
      bullets: [
        "Built a Flutter-based multi-language code editor with syntax highlighting and dynamic language loading from backend APIs.",
        "Implemented real-time execution polling with clear state transitions (Idle → Running → Completed) using Riverpod.",
        "Designed execution result UI showing stdout, stderr, execution time, memory usage, and status handling.",
      ],
      stack: ["Flutter", "Dart", "Riverpod", "Dio", "Material UI"],
    },
  ] as ProjectItem[],
  skillGroups: [
    {
      category: "Backend Engineering",
      items: [
        "Java",
        "Spring Boot",
        "REST APIs",
        "gRPC",
        "PostgreSQL",
        "Hibernate",
        "JWT",
      ],
    },
    {
      category: "Distributed Systems",
      items: ["Kafka", "Redis", "Event Streaming", "Microservices", "System Reliability"],
    },
    {
      category: "Mobile + Integration",
      items: [
        "Android (Java/Kotlin)",
        "MVVM",
        "Retrofit",
        "NFC/Hardware SDKs",
        "Flutter",
      ],
    },
    {
      category: "Dev Workflow & CI/CD",
      items: [
        "GitHub Actions",
        "Jenkins",
        "Maven",
        "JUnit"
      ],
    },
    {
      category: "DevOps & Infrastructure",
      items: [
        "Docker",
        "Kubernetes (k3s)",
        "NGINX Ingress",
        "AWS (EC2, VPC)",
        "Prometheus",
        "Grafana",
        "CI/CD",
        "System Monitoring",
        "Autoscaling (HPA)"
      ],
    },
    {
      category: "Gen AI",
      items: ["LangChain", "RAG", "FAISS", "Prompting", "Vector Search Pipelines"],
    },
  ] as SkillGroup[],
  languages: [
    {
      name: "C++",
      foundations: [
        "STL (Standard Template Library)",
        "Core Data Structures & Algorithms",
      ],
    },
    {
      name: "Java",
      foundations: ["Java Collections Framework"],
    },
    {
      name: "Python",
      foundations: [],
    },
    {
      name: "Dart",
      foundations: [],
    },
  ] as LanguageItem[],
  achievements: [
    {
      title: "Received 300+* claps on Medium Articles",
      link: "https://medium.com/@beingadish",
    },
    {
      title: "Google Cloud Certified Generative AI Leader (July 2025)",
      link: "https://drive.google.com/file/d/1UzSXNm8I74ECWbNxRQ-sMhPkWHvIR8f5/view?usp=drive_link",
    },
    {
      title: "Solved 600+ DSA problems in C++ across LeetCode, Codeforces, GeeksforGeeks, and takeUForward",
      link: "https://leetcode.com/u/ax777x",
    },
    {
      title: "2nd Position in TechSprint'23 Hackathon (250+ participants)",
      link: "https://drive.google.com/file/d/1pJ8nd5nOqR27JWJM1EyKT97U4IZ3D-JK/view",
    },
    {
      title: "Application Domain Head at Blockchain Research Lab, AKGEC (2022-2024)",
      link: "https://www.akgec.ac.in/blockchain-research-lab/",
    },
  ] as AchievementItem[],
  writing: [
    {
      title: "Building Rate Limiters",
      summary:
        "A hands-on exploration of rate limiting by implementing Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket algorithms from scratch, focusing on trade-offs and real-world behavior.",
      meta: "Medium • 10 min read",
      href: "https://medium.com/@beingadish/building-rate-limiters-from-first-principles-a-weekend-learning-project-7866f7435fe4",
    },
    {
      title: "Building Consistent Hashing System",
      summary:
        "A hands-on deep dive into consistent hashing, explaining how distributed systems minimize rebalancing when nodes change, with a step-by-step Java implementation and real-world scaling insights.",
      meta: "Medium • 14 min read",
      href: "https://medium.com/@beingadish/building-consistent-hashing-from-first-principles-in-java-ff463b96423b",
    },
    {
      title: "Authentication and Authorization: The Security Backbone of Backend Systems",
      summary:
        "An in-depth explanation of authentication vs authorization, common mechanisms, and how backend systems enforce identity and access control correctly.",
      meta: "Medium • 22 min read",
      href: "https://medium.com/@beingadish/authentication-and-authorization-the-security-backbone-of-backend-systems-ec0f8ed1720e",
    },
    {
      title: "Understanding System Design",
      summary:
        "A beginner-to-intermediate walkthrough of system design fundamentals, covering scalability, reliability, and how to reason about large systems beyond writing code.",
      meta: "Medium • 3 min read",
      href: "https://medium.com/@beingadish/understanding-system-design-d88a6b6f9008",
    },
    {
      title: "Routing and Serialization: How Requests Find Their Way and Speak the Same Language",
      summary:
        "A practical look at how backend frameworks route requests and serialize data, explaining the hidden mechanics behind controllers, handlers, and payload formats.",
      meta: "Medium • 13 min read",
      href: "https://medium.com/@beingadish/routing-and-serialization-how-requests-find-their-way-and-speak-the-same-language-b5aef8883dc2",
    },
    {
      title: "Understanding HTTP for Backend Engineers: Where It All Starts",
      summary:
        "A foundational deep dive into HTTP concepts including methods, status codes, headers, and statelessness, aimed at engineers building reliable backend services.",
      meta: "Medium • 15 min read",
      href: "https://medium.com/javaguides/understanding-http-for-backend-engineers-where-it-all-starts-56c633b9bb0e",
    },
    {
      title: "How Amazon’s Notify Me Feature Uses the Observer Design Pattern",
      summary:
        "A design-pattern-driven breakdown of Amazon’s Notify Me feature, explaining how the Observer pattern enables decoupled, scalable event notifications.",
      meta: "Medium • 5 min read",
      href: "https://medium.com/@beingadish/how-amazons-notify-me-feature-leverages-the-observer-design-pattern-d087b23deb46",
    },
    {
      title: "Design Thinking of Concert Ticketing Systems at Scale",
      summary:
        "A system design case study on high-demand ticketing platforms, covering load balancing, traffic spikes, fairness, and failure handling strategies.",
      meta: "Medium • 3 min read",
      href: "https://medium.com/@beingadish/mastering-system-design-how-concert-ticketing-systems-handle-high-demand-with-load-balancing-and-6c615c6df125",
    },
  ] as WritingItem[],
  staticShowcases: [
    {
      platform: "GitHub",
      heading: "Profile Overview",
      preview: "Repository and contribution snapshot from the public GitHub profile.",
      // Replace link here
      href: primaryQuickLinks.github.href,
    },
    {
      platform: "LeetCode",
      heading: "Submission Heatmap",
      preview: "Submission consistency snapshot from the public LeetCode profile.",
      // Replace link here
      href: primaryQuickLinks.leetcode.href,
    },
  ] as ShowcaseItem[],
  education: [
    {
      school: "Ajay Kumar Garg Engineering College (AKTU)",
      degree: "Bachelor of Technology, Computer Science (CGPA: 7.8)",
      period: "2020 - 2024",
      location: "Ghaziabad, India",
      href: "https://www.akgec.ac.in/",
    },
  ] as EducationItem[],
  blogSeedLinks: [] as BlogSeedLink[],
};
