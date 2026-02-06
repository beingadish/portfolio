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
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  location: string;
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
  role: "Software Engineer | Backend + Gen AI",
  location: "Bengaluru, Karnataka, India",
  summary:
    "Backend engineer focused on building fast, reliable systems at scale. I currently work on transit and payment infrastructure, and I actively build Gen AI projects around retrieval and semantic search.",
  pitch:
    "I design production-grade APIs, event pipelines, and mobile-backed integrations that handle real-world traffic with strong reliability.",
  contact: {
    email: "aadarshpandey.pandey@gmail.com",
    phone: "+91-9170077741",
  },
  // Replace image here
  profilePhoto: "/demo-profile-photo.jpeg",
  quickLinks: [
    // Replace link here
    { label: "GitHub", href: "https://github.com/beingadish", icon: "github" },
    // Replace link here
    { label: "LinkedIn", href: "https://linkedin.com/in/beingadish", icon: "linkedin" },
    // Replace link here
    { label: "LeetCode", href: "https://leetcode.com/u/ax777x", icon: "leetcode" },
    // Replace link here
    { label: "Medium", href: "https://medium.com/@beingadish", icon: "medium" },
    // Replace link here
    { label: "Resume", href: "https://drive.google.com/file/d/1OC4Hwo1x_KQg2HIOpmyf_1vB4FqCu0Qm/view?usp=sharing", icon: "resume", download: true },
  ] as QuickLinkItem[],
  socialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com/in/beingadish" },
    { label: "GitHub", href: "https://github.com/beingadish" },
    {
      label: "Email",
      href: "mailto:aadarshpandey.pandey@gmail.com",
    },
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
  ] as FocusInsight[],
  highlights: [
    "Built and maintained Java Spring Boot APIs for a high-volume transit environment.",
    "Delivered Android app features with MVVM architecture and hardware SDK integrations.",
    "Designed event-driven microservice workflows using Kafka, gRPC, and JWT auth.",
    "Exploring Gen AI systems with RAG pipelines, FAISS vector search, and LangChain.",
  ],
  experience: [
    {
      title: "Associate Software Engineer",
      company: "Accenture Solutions Private Limited",
      location: "Bengaluru, India",
      period: "Oct 2024 - Present",
      bullets: [
        "Built and improved Java Spring Boot REST APIs processing 100,000+ daily transit transactions across 10+ agencies.",
        "Reduced payment API latency by 35% using Redis caching, indexing, and query tuning.",
        "Delivered Android UI features in Java/Kotlin with MVVM architecture and Retrofit integrations.",
        "Debugged NFC readers, QR scanners, and thermal printer SDK edge cases with 99%+ transaction success rate.",
        "Maintained Kafka-based event pipelines handling 200K+ events/day with JWT-secured microservice endpoints.",
      ],
      stack: [
        "Java",
        "Kotlin",
        "Spring Boot",
        "Kafka",
        "Redis",
        "PostgreSQL",
        "Hibernate",
        "Docker",
        "AWS",
        "Android Native",
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
      name: "Clynic Microservices",
      timeline: "Apr 2025",
      summary:
        "A microservices architecture with secure APIs, event-driven communication, and production-like cloud simulation.",
      bullets: [
        "Implemented JWT-authenticated services for patient and billing flows with gRPC communication.",
        "Built Kafka analytics stream and API gateway request validation.",
        "Deployed using Docker and simulated AWS components via LocalStack + AWS CDK.",
        "Added centralized logging, health checks, and CI with JUnit 5 + GitHub Actions.",
      ],
      stack: [
        "Spring Boot",
        "Kafka",
        "gRPC",
        "PostgreSQL",
        "Docker",
        "LocalStack",
        "AWS CDK",
        "JUnit 5",
      ],
    },
    {
      name: "TalkingYoutube",
      timeline: "Oct 2025",
      summary:
        "A semantic Q&A system for YouTube transcripts powered by vector retrieval and RAG.",
      bullets: [
        "Built FAISS-backed retrieval with LangChain orchestration and Gemini embeddings.",
        "Implemented multi-query retrieval for better context recall and response quality.",
        "Improved answer relevancy to 88% through chunk strategy and embedding tuning.",
      ],
      stack: ["Python", "LangChain", "FAISS", "Gemini", "RAG", "Vector Embeddings"],
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
      category: "Cloud + Dev Workflow",
      items: ["AWS", "Docker", "Jenkins", "GitHub Actions", "Maven", "JUnit"],
    },
    {
      category: "Gen AI",
      items: ["LangChain", "RAG", "FAISS", "Prompting", "Vector Search Pipelines"],
    },
  ] as SkillGroup[],
  achievements: [
    {
      title: "Google Cloud Certified Generative AI Leader (July 2025)",
      // Replace link here
      link: "https://drive.google.com/file/d/1UzSXNm8I74ECWbNxRQ-sMhPkWHvIR8f5/view?usp=drive_link",
    },
    {
      title:
        "Solved 450+ DSA problems across LeetCode, Codeforces, GeeksforGeeks, and takeUForward",
      // Replace link here
      link: "https://example.com/certificate/dsa-profile",
    },
    {
      title: "2nd position - TechSprint'23 Hackathon (250+ participants)",
      // Replace link here
      link: "https://drive.google.com/file/d/1pJ8nd5nOqR27JWJM1EyKT97U4IZ3D-JK/view",
    },
  ] as AchievementItem[],
  writing: [
  {
    title: "Building Rate Limiters from First Principles",
    summary:
      "A hands-on exploration of rate limiting by implementing Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket algorithms from scratch, focusing on trade-offs and real-world behavior.",
    meta: "Medium • 10 min read",
    href: "https://medium.com/@beingadish/building-rate-limiters-from-first-principles-a-weekend-learning-project-7866f7435fe4",
  },
  {
    title: "Understanding System Design",
    summary:
      "A beginner-to-intermediate walkthrough of system design fundamentals, covering scalability, reliability, and how to reason about large systems beyond writing code.",
    meta: "Medium • 3 min read",
    href: "https://medium.com/@beingadish/understanding-system-design-d88a6b6f9008",
  },
  {
    title: "Authentication and Authorization: The Security Backbone of Backend Systems",
    summary:
      "An in-depth explanation of authentication vs authorization, common mechanisms, and how backend systems enforce identity and access control correctly.",
    meta: "Medium • 22 min read",
    href: "https://medium.com/@beingadish/authentication-and-authorization-the-security-backbone-of-backend-systems-ec0f8ed1720e",
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
      "A foundational deep dive into HTTP concepts—methods, status codes, headers, and statelessness—aimed at engineers building reliable backend services.",
    meta: "Medium • 15 min read",
    href: "https://medium.com/javaguides/understanding-http-for-backend-engineers-where-it-all-starts-56c633b9bb0e",
  },
  {
    title: "The Path to Production-Grade Backend Engineering",
    summary:
      "A reflective week-long journey through backend fundamentals, focusing on thinking in first principles, system boundaries, and production-readiness.",
    meta: "Medium • 8 min read",
    href: "https://medium.com/@beingadish/the-path-to-production-grade-backend-engineering-my-week-of-first-principles-741610b28a73",
  },
  {
    title: "How Amazon’s Notify Me Feature Uses the Observer Design Pattern",
    summary:
      "A design-pattern-driven breakdown of Amazon’s Notify Me feature, explaining how the Observer pattern enables decoupled, scalable event notifications.",
    meta: "Medium • 5 min read",
    href: "https://medium.com/@beingadish/how-amazons-notify-me-feature-leverages-the-observer-design-pattern-d087b23deb46",
  },
  {
    title: "Mastering System Design: Concert Ticketing Systems at Scale",
    summary:
      "A system design case study on high-demand ticketing platforms, covering load balancing, traffic spikes, fairness, and failure handling strategies.",
    meta: "Medium • 3 min read",
    href: "https://medium.com/@beingadish/mastering-system-design-how-concert-ticketing-systems-handle-high-demand-with-load-balancing-and-6c615c6df125",
  },
] as WritingItem[],
  staticShowcases: [
    {
      platform: "GitHub",
      heading: "Repository Showcase (Static Preview)",
      preview: "Demo preview card for pinned repositories, contribution style, and code focus.",
      // Replace link here
      href: "https://github.com/beingadish",
    },
    {
      platform: "LinkedIn",
      heading: "Profile Snapshot (Static Preview)",
      preview: "Demo preview card for profile summary, recent roles, and professional activity.",
      // Replace link here
      href: "https://linkedin.com/in/beingadish",
    },
  ] as ShowcaseItem[],
  education: [
    {
      school: "Ajay Kumar Garg Engineering College (AKTU)",
      degree: "Bachelor of Technology, Computer Science (CGPA: 7.8)",
      period: "2020 - 2024",
      location: "Ghaziabad, India",
    },
  ] as EducationItem[],
  blogSeedLinks: [] as BlogSeedLink[],
};
