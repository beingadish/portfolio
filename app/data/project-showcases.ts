export interface ApiParameter {
  name: string;
  in: "path" | "query" | "header";
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface ApiResponseSpec {
  status: number;
  description: string;
  example?: unknown;
}

export interface ApiEndpointSpec {
  method: "GET" | "POST" | "PUT" | "DELETE" | "gRPC" | "KAFKA" | "ZK" | "PATCH";
  path: string;
  summary: string;
  description: string;
  tag?: string;
  parameters?: ApiParameter[];
  requestBody?: {
    contentType: string;
    description?: string;
    example: unknown;
  };
  responses: ApiResponseSpec[];
}

export interface ProjectShowcase {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  timeline: string;
  githubUrl: string;
  localPath: string;
  liveUrl?: string; // Live web app URL
  backendApiUrl?: string; // Live API Gateway / Backend URL
  swaggerUrl?: string;
  apkUrl?: string; // S3 Direct APK Download URL
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
  endpoints: ApiEndpointSpec[];
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
    liveUrl: process.env.NEXT_PUBLIC_AROUNDU_URL || "/aroundu/",
    backendApiUrl: process.env.NEXT_PUBLIC_AROUNDU_API_URL || "https://api.aroundu.beingadish.com",
    apkUrl: "/AroundU.apk",
    status: "live",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Next.js 14",
      "Flutter",
      "Redis GEO",
      "PostgreSQL",
      "Resilience4j",
      "Docker",
      "Kubernetes (k3s)",
      "Prometheus",
      "Grafana",
    ],
    awsServices: [
      "AWS EC2 (Production Dedicated Ingress)",
      "Amazon S3 (APK Distribution)",
      "Amazon ElastiCache Redis",
      "Amazon RDS PostgreSQL",
      "AWS Application Load Balancer",
      "AWS Route 53",
    ],
    metrics: [
      { label: "Geo-Spatial Query SLA", value: "< 3.4ms", sublabel: "via Redis GEO radius search" },
      { label: "Circuit Breaker", value: "Resilience4j", sublabel: "Zero cascading payment failures" },
      { label: "Memory Footprint", value: "8.52 MB RAM", sublabel: "Ultra-lean zero-scaling container" },
      { label: "Android Mobile", value: "66.1 MB APK", sublabel: "Direct Amazon S3 distribution" },
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
      {
        method: "GET",
        path: "/api/v1/jobs/nearby",
        summary: "Redis GEO Spatial Radius Search",
        description:
          "Calculates spherical distance using Redis GEO geospatial indices and Haversine formula, filtering gigs within user proximity radius.",
        tag: "Jobs & Gigs",
        parameters: [
          {
            name: "lat",
            in: "query",
            type: "number",
            required: true,
            description: "Latitude coordinate of search center (e.g. 19.0760 for Mumbai)",
            example: "19.0760",
          },
          {
            name: "lng",
            in: "query",
            type: "number",
            required: true,
            description: "Longitude coordinate of search center (e.g. 72.8777 for Mumbai)",
            example: "72.8777",
          },
          {
            name: "radius",
            in: "query",
            type: "number",
            required: false,
            description: "Search radius threshold in kilometers (default: 50 km)",
            example: "50",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Array of nearby active jobs sorted ascending by distanceKm",
            example: [
              {
                id: "job-001",
                title: "Urgent: Dual-Zone AC Circuit Repair & Gas Refill",
                category: "Electrical & HVAC",
                budget: 3200,
                status: "OPEN",
                distanceKm: 0.8,
                address: "Hiranandani Gardens, Powai, Mumbai",
                clientName: "Aadarsh Pandey",
                skills: ["HVAC", "Electrical", "Circuit Diagnosis"],
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/jobs",
        summary: "Active Gigs & Tasks Directory",
        description: "Returns all posted freelance tasks filtered by state and category.",
        tag: "Jobs & Gigs",
        parameters: [
          {
            name: "category",
            in: "query",
            type: "string",
            required: false,
            description: "Filter by skill or industry domain",
            example: "Electrical & HVAC",
          },
          {
            name: "status",
            in: "query",
            type: "string",
            required: false,
            description: "Job lifecycle state (OPEN, IN_PROGRESS, COMPLETED)",
            example: "OPEN",
          },
        ],
        responses: [
          {
            status: 200,
            description: "List of matching job listings",
            example: [
              {
                id: "job-001",
                title: "Urgent: Dual-Zone AC Circuit Repair",
                budget: 3200,
                status: "OPEN",
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/jobs/{jobId}",
        summary: "Retrieve Single Gig Specification",
        description: "Fetches full task requirements, client identity, budget, escrow state, and active worker bids.",
        tag: "Jobs & Gigs",
        parameters: [
          {
            name: "jobId",
            in: "path",
            type: "string",
            required: true,
            description: "Unique task identifier",
            example: "job-001",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Full job entity details",
            example: {
              id: "job-001",
              title: "Urgent: Dual-Zone AC Circuit Repair & Gas Refill",
              description: "Inverter AC tripping breaker on compressor startup.",
              category: "Electrical & HVAC",
              budget: 3200,
              status: "OPEN",
              clientId: "usr-client-01",
              clientName: "Aadarsh Pandey",
              bidsCount: 3,
            },
          },
          { status: 404, description: "Job identifier not found" },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/jobs",
        summary: "Create New Freelance Gig",
        description: "Posts a new gig with location coordinates, escrow budget, and required skill tags.",
        tag: "Jobs & Gigs",
        requestBody: {
          contentType: "application/json",
          description: "Gig specification payload",
          example: {
            title: "Commercial Kitchen Copper Piping Leak",
            description: "Main shutoff gate valve leaking under 4 bar pressure.",
            category: "Plumbing",
            budget: 2500,
            latitude: 19.0596,
            longitude: 72.8295,
            address: "Pali Hill, Bandra West, Mumbai",
            skills: ["Plumbing", "Copper Soldering", "Pipe Fitting"],
          },
        },
        responses: [
          {
            status: 201,
            description: "Gig created successfully with initialized escrow lock",
            example: {
              id: "job-002",
              title: "Commercial Kitchen Copper Piping Leak",
              status: "OPEN",
              createdAt: "2026-11-13T03:00:00.000Z",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/bid/jobs/{jobId}/bids",
        summary: "List Proposals & Bids on Gig",
        description: "Retrieves all competitive worker bids submitted for a specific job.",
        tag: "Bidding & Escrow",
        parameters: [
          {
            name: "jobId",
            in: "path",
            type: "string",
            required: true,
            description: "Unique job ID",
            example: "job-001",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Array of worker proposals, ratings, and quoted amounts",
            example: [
              {
                id: "bid-101",
                jobId: "job-001",
                workerName: "Manoj Kumar",
                workerRating: 4.9,
                amount: 3000,
                proposal: "Certified HVAC tech with 8 years experience. Can arrive within 35 minutes.",
                status: "PENDING",
              },
            ],
          },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/bid/jobs/{jobId}/bids",
        summary: "Submit Worker Proposal",
        description: "Places an atomic bid with distributed lock to prevent race conditions.",
        tag: "Bidding & Escrow",
        parameters: [
          {
            name: "jobId",
            in: "path",
            type: "string",
            required: true,
            description: "Target job identifier",
            example: "job-001",
          },
        ],
        requestBody: {
          contentType: "application/json",
          description: "Worker bidding parameters",
          example: {
            amount: 3200,
            proposal: "Specialist in Daikin and Voltas inverter units. 90-day warranty included.",
          },
        },
        responses: [
          {
            status: 201,
            description: "Bid submitted and client notified",
            example: {
              id: "bid-102",
              status: "PENDING",
              createdAt: "2026-11-13T03:00:00.000Z",
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/bid/bids/{bidId}/accept",
        summary: "Accept Proposal & Lock Escrow",
        description: "Client accepts worker bid, triggering two-phase escrow hold and dispatching start code.",
        tag: "Bidding & Escrow",
        parameters: [
          {
            name: "bidId",
            in: "path",
            type: "string",
            required: true,
            description: "Target bid identifier",
            example: "bid-101",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Bid accepted, gig state transitioned to ASSIGNED",
            example: {
              message: "Bid accepted successfully",
              bid: { id: "bid-101", status: "ACCEPTED" },
              job: { id: "job-001", status: "ASSIGNED" },
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/auth/login",
        summary: "User & Worker Authentication",
        description: "Authenticates credentials and returns a signed JWT bearer token with claims.",
        tag: "Authentication",
        requestBody: {
          contentType: "application/json",
          description: "User sign-in credentials",
          example: {
            email: "aadarsh@aroundu.dev",
            password: "demo-password-2026",
          },
        },
        responses: [
          {
            status: 200,
            description: "JWT Access Token and verified profile metadata",
            example: {
              token: "jwt-demo-aroundu-secure-token",
              tokenType: "Bearer",
              expiresIn: 86400,
              user: {
                id: "usr-client-01",
                name: "Aadarsh Pandey",
                email: "aadarsh@aroundu.dev",
                role: "CLIENT",
              },
            },
          },
          { status: 401, description: "Invalid email or credentials" },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/client/me",
        summary: "Current Client Profile",
        description: "Retrieves active client session, completed gigs count, and escrow wallet balance.",
        tag: "Users & Profiles",
        responses: [
          {
            status: 200,
            description: "Client profile object",
            example: {
              id: "usr-client-01",
              name: "Aadarsh Pandey",
              role: "CLIENT",
              verified: true,
              completedGigs: 14,
              escrowBalance: 12500,
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/worker/me",
        summary: "Current Worker Status & Rating",
        description: "Returns worker duty status (ONLINE/OFFLINE), aggregate star rating, and verified skills.",
        tag: "Users & Profiles",
        responses: [
          {
            status: 200,
            description: "Worker profile object",
            example: {
              id: "wrk-01",
              name: "Manoj Kumar",
              role: "WORKER",
              rating: 4.9,
              completedGigs: 87,
              skills: ["HVAC", "Electrical", "Plumbing"],
              dutyStatus: "ONLINE",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/skills/suggest",
        summary: "Skill Taxonomy Autocomplete",
        description: "Returns standardized gig skills for quick job categorization and search indexing.",
        tag: "Skills & Taxonomy",
        parameters: [
          {
            name: "query",
            in: "query",
            type: "string",
            required: false,
            description: "Partial search query",
            example: "Electric",
          },
        ],
        responses: [
          {
            status: 200,
            description: "List of matching standardized skill labels",
            example: [
              "HVAC & AC Repair",
              "Plumbing & Pipe Fitting",
              "Electrical Wiring & Circuit Repair",
              "Carpentry & Modular Joinery",
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/admin/overview",
        summary: "Platform Telemetry & Escrow SLA",
        description: "Real-time administrative telemetry, active escrow volume, and P99 latency SLA.",
        tag: "Telemetry & Admin",
        responses: [
          {
            status: 200,
            description: "Platform metrics overview",
            example: {
              activeJobs: 4,
              totalWorkers: 154,
              totalClients: 89,
              escrowLockedInr: 485000,
              avgRadiusQueryLatencyMs: 3.4,
              resilienceCircuitState: "HEALTHY",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/actuator/health",
        summary: "Container & Gateway Health Check",
        description: "Liveness and readiness probe reporting database, Redis GEO, and circuit breaker health.",
        tag: "Telemetry & Admin",
        responses: [
          {
            status: 200,
            description: "Health components status UP",
            example: {
              status: "UP",
              service: "aroundu-backend",
              components: {
                db: { status: "UP" },
                redis: { status: "UP" },
                resilience4j: { status: "UP", circuitBreaker: "CLOSED" },
              },
            },
          },
        ],
      },
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
    liveUrl: process.env.NEXT_PUBLIC_CLYNIC_URL || "/clynic/",
    backendApiUrl: process.env.NEXT_PUBLIC_CLYNIC_API_URL || "https://api.clynic.beingadish.com",
    status: "live",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "Keycloak",
      "gRPC",
      "Apache Kafka",
      "PostgreSQL",
      "Docker",
      "AWS ECS Fargate",
      "AWS CDK",
    ],
    awsServices: [
      "AWS EC2 (Production Dedicated Ingress)",
      "Amazon ECS Fargate",
      "Amazon RDS PostgreSQL (Multi-AZ)",
      "Amazon Managed Streaming for Apache Kafka (MSK)",
      "AWS Application Load Balancer",
    ],
    metrics: [
      { label: "Tenant Isolation", value: "Schema + Keycloak", sublabel: "Zero cross-tenant bleed" },
      { label: "Internal RPC", value: "gRPC Protobuf", sublabel: "< 2ms inter-service latency" },
      { label: "Event Streaming", value: "Apache Kafka", sublabel: "Guaranteed clinical order delivery" },
      { label: "Care Modes", value: "Human & Vet", sublabel: "Dual clinical domain models" },
    ],
    architectureHighlights: [
      {
        title: "Spring Cloud Gateway & Dynamic JWT Routing",
        description:
          "Central edge gateway intercepting inbound traffic, resolving tenant subdomains or headers to specific Keycloak realms, and stripping auth headers before forwarding downstream.",
      },
      {
        title: "Dual Care Domain Engine (Human & Veterinary)",
        description:
          "Domain-driven architecture handling standard human healthcare workflows alongside animal care specs including species classification, owner custody, and veterinary surgical wards.",
      },
      {
        title: "Cloud Infrastructure as Code with AWS CDK",
        description:
          "Full cloud topology defined in TypeScript with AWS CDK and pre-tested with LocalStack before ECS Fargate and RDS provisioning.",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/clynic-api/health",
        summary: "Microservices Gateway Health",
        description: "Reports cluster liveness, active tenant count, and connected database pools.",
        tag: "System & Health",
        responses: [
          {
            status: 200,
            description: "Gateway status UP",
            example: {
              status: "UP",
              service: "clynic-api",
              version: "1.0.0",
              tenantsCount: 1,
              patientsCount: 5,
              appointmentsCount: 4,
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/clynic-api/auth/login",
        summary: "Tenant-Realm Authentication",
        description: "Authenticates hospital staff against tenant-isolated Keycloak realm.",
        tag: "Authentication",
        requestBody: {
          contentType: "application/json",
          description: "Login credentials with tenant context",
          example: {
            tenantId: "apex-health",
            email: "doctor@apexhealth.org",
            password: "clynic-demo-password",
          },
        },
        responses: [
          {
            status: 200,
            description: "JWT token pair with tenant-scoped role claims",
            example: {
              user: {
                id: "usr-01",
                email: "doctor@apexhealth.org",
                fullName: "Dr. Aadarsh Pandey",
                tenantId: "tnt-apex-01",
                roles: ["DOCTOR", "CLINICAL_HEAD"],
              },
              accessToken: "ey.clynic.mock.access.token",
              tokenType: "Bearer",
            },
          },
          { status: 401, description: "Invalid tenant credentials" },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/tenants/{tenantId}",
        summary: "Tenant Organization Specification",
        description: "Retrieves hospital facility tier, care mode (HUMAN / VET), and enterprise settings.",
        tag: "Tenants & Campuses",
        parameters: [
          {
            name: "tenantId",
            in: "path",
            type: "string",
            required: true,
            description: "Tenant slug or identifier",
            example: "apex-health",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Tenant entity metadata",
            example: {
              id: "tnt-apex-01",
              name: "Apex Multispecialty & Veterinary Hospital",
              slug: "apex-health",
              careMode: "HUMAN",
              planTier: "ENTERPRISE",
              status: "ACTIVE",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/tenants/{tenantId}/facilities",
        summary: "Hospital Pavilions & Trauma Wings",
        description: "Lists inpatient surgical pavilions, diagnostic labs, and animal care wings.",
        tag: "Tenants & Campuses",
        parameters: [
          {
            name: "tenantId",
            in: "path",
            type: "string",
            required: true,
            description: "Tenant ID",
            example: "apex-health",
          },
        ],
        responses: [
          {
            status: 200,
            description: "List of hospital facility buildings",
            example: [
              {
                id: "fac-01",
                name: "Main Clinical & Surgical Pavilion",
                type: "HOSPITAL",
                address: "Block 4, Medical Enclave, Mumbai",
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/tenants/{tenantId}/departments",
        summary: "Clinical Specialty Departments",
        description: "Retrieves clinical departments (Cardiology, Orthopedics, Veterinary Surgery).",
        tag: "Tenants & Campuses",
        parameters: [
          {
            name: "tenantId",
            in: "path",
            type: "string",
            required: true,
            description: "Tenant ID",
            example: "apex-health",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Array of medical specialty departments",
            example: [
              { id: "dep-01", name: "Cardiology & Interventional Care", code: "CARDIO" },
              { id: "dep-02", name: "Veterinary Surgery & Trauma Wing", code: "VET-SURG" },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/patients",
        summary: "Patient Clinical Directory",
        description: "Returns tenant-scoped patient records across human and animal patient registries.",
        tag: "Patients & Clinical",
        parameters: [
          {
            name: "subjectType",
            in: "query",
            type: "string",
            required: false,
            description: "Filter by subject classification (HUMAN or ANIMAL)",
            example: "HUMAN",
          },
          {
            name: "search",
            in: "query",
            type: "string",
            required: false,
            description: "Search query for patient name or phone",
            example: "Aarav",
          },
        ],
        responses: [
          {
            status: 200,
            description: "List of clinical patient files",
            example: [
              {
                id: "pat-101",
                name: "Aarav Sharma",
                email: "aarav.sharma@example.com",
                dateOfBirth: "1994-06-18",
                subjectType: "HUMAN",
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/patients/{id}",
        summary: "Comprehensive Patient Health Record",
        description: "Detailed electronic medical record, diagnosis history, allergies, and contact details.",
        tag: "Patients & Clinical",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Unique patient identifier",
            example: "pat-101",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Patient record entity",
            example: {
              id: "pat-101",
              name: "Aarav Sharma",
              email: "aarav.sharma@example.com",
              dateOfBirth: "1994-06-18",
              address: "402 Palm Heights, Powai, Mumbai",
              phone: "+91 98201 12345",
              subjectType: "HUMAN",
            },
          },
          { status: 404, description: "Patient not found" },
        ],
      },
      {
        method: "POST",
        path: "/clynic-api/patients",
        summary: "Register New Clinical Patient",
        description: "Admits a human patient or veterinary subject into the electronic healthcare registry.",
        tag: "Patients & Clinical",
        requestBody: {
          contentType: "application/json",
          description: "Patient demographic and clinical intake data",
          example: {
            name: "Ananya Iyer",
            email: "ananya.iyer@example.com",
            phone: "+91 98204 99112",
            dateOfBirth: "1998-03-24",
            address: "Bandra West, Mumbai",
            subjectType: "HUMAN",
          },
        },
        responses: [
          {
            status: 201,
            description: "Patient admitted and assigned unique MRN",
            example: {
              id: "pat-106",
              name: "Ananya Iyer",
              registeredDate: "2026-11-13T03:00:00.000Z",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/clynic-api/appointments",
        summary: "Operating Ward & Consultation Schedule",
        description: "Returns live clinic consultation slots, scheduled surgeries, and practitioner assignments.",
        tag: "Appointments & Wards",
        parameters: [
          {
            name: "facilityId",
            in: "query",
            type: "string",
            required: false,
            description: "Filter by hospital pavilion ID",
            example: "fac-01",
          },
          {
            name: "status",
            in: "query",
            type: "string",
            required: false,
            description: "Filter by status (BOOKED, IN_PROGRESS, COMPLETED)",
            example: "BOOKED",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Array of scheduled appointments",
            example: [
              {
                id: "apt-201",
                patientId: "pat-101",
                practitionerId: "doc-01",
                reason: "Post-op Followup & Cardiac Stent Evaluation",
                status: "BOOKED",
              },
            ],
          },
        ],
      },
      {
        method: "POST",
        path: "/clynic-api/appointments",
        summary: "Schedule Clinical Appointment or Surgery",
        description: "Books an appointment slot with automatic double-booking prevention and gRPC validation.",
        tag: "Appointments & Wards",
        requestBody: {
          contentType: "application/json",
          description: "Appointment scheduling payload",
          example: {
            patientId: "pat-101",
            practitionerId: "doc-01",
            departmentId: "dep-01",
            startTime: "2026-11-14T10:00:00Z",
            endTime: "2026-11-14T10:45:00Z",
            reason: "Cardiac Echo Consultation",
          },
        },
        responses: [
          {
            status: 201,
            description: "Appointment scheduled and ward reserved",
            example: {
              id: "apt-205",
              status: "BOOKED",
            },
          },
        ],
      },
      {
        method: "gRPC",
        path: "billing.BillingService/ProcessInvoice",
        summary: "Zero-Copy gRPC Invoicing RPC",
        description: "High-performance internal binary gRPC contract for clinical invoice clearing.",
        tag: "Internal Microservice Contracts",
        responses: [
          {
            status: 200,
            description: "Protobuf InvoiceResponse message",
            example: { invoiceId: "inv-9821", amount: 14500, status: "CLEARED" },
          },
        ],
      },
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
    liveUrl: process.env.NEXT_PUBLIC_JANMAT_URL || "/janmat",
    backendApiUrl: process.env.NEXT_PUBLIC_JANMAT_API_URL || "https://api.janmat.beingadish.com",
    status: "live",
    stack: [
      "Rust (Tokio + Axum)",
      "React 18",
      "Vite",
      "TailwindCSS",
      "Blake3 Cryptography",
      "Zero-Knowledge Proofs",
      "Redis",
      "PostgreSQL",
      "Docker",
      "NGINX",
    ],
    awsServices: [
      "AWS EC2 (Production Dedicated Ingress)",
      "Amazon ElastiCache Redis",
      "Amazon RDS PostgreSQL",
      "AWS Application Load Balancer",
      "Amazon CloudFront",
    ],
    metrics: [
      { label: "Memory Footprint", value: "1.98 MB RAM", sublabel: "Tokio + Axum microservice" },
      { label: "Vote Commitment", value: "Sub-millisecond", sublabel: "Blake3 cryptographic audit hash" },
      { label: "Privacy Protection", value: "ZK Nullifiers", sublabel: "Anonymous verifiable ballots" },
      { label: "Live Gateway", value: "NGINX Reverse Proxy", sublabel: "Dedicated Ingress Gateway" },
    ],
    architectureHighlights: [
      {
        title: "Ultra-Lightweight Rust Microservice Engine",
        description:
          "Compiled release binary consuming less than 2 MB of resident memory while handling high-throughput concurrent citizen voting with zero garbage collection pauses.",
      },
      {
        title: "Cryptographic Tamper-Proof Audit Commitments",
        description:
          "Every ballot cast produces an immutable Blake3 cryptographic commitment stored in Redis and anchored to an audit ledger, guaranteeing ballot secrecy and verifiability.",
      },
      {
        title: "Real-Time Civic Democracy Console",
        description:
          "React SPA providing citizen identity pseudonyms, public topic creation, real-time vote tallying, and live cryptographic referendum verification.",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/health",
        summary: "Rust Axum Runtime Health",
        description: "Liveness and readiness check reporting Axum microservice status.",
        tag: "System & Health",
        responses: [
          {
            status: 200,
            description: "Service online",
            example: { status: "ok", service: "janmat-api" },
          },
        ],
      },
      {
        method: "GET",
        path: "/pub/constitution",
        summary: "Civic Governance Constitution",
        description: "Fetches constitutional referendum parameters, quorum thresholds, and verification rules.",
        tag: "Governance & Constitution",
        responses: [
          {
            status: 200,
            description: "JanMat constitutional specification",
            example: {
              constitution_version: "1.0",
              quorum_percentage: 15.0,
              min_voting_duration_hours: 48,
              cryptographic_hash: "blake3:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/pub/proposals",
        summary: "Civic Governance Proposals",
        description: "Lists active civic governance proposals open for community deliberation.",
        tag: "Governance & Constitution",
        responses: [
          {
            status: 200,
            description: "Array of governance proposals",
            example: [
              {
                proposal_id: "prop-01",
                title: "Upgrade Civic Quorum Threshold to 20%",
                status: "ACTIVE",
                votes_for: 1420,
                votes_against: 310,
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/pub/t",
        summary: "Public Poll Topics Directory",
        description: "Lists all civic topics, municipal opinion questions, and active voter ballots.",
        tag: "Polls & Referendums",
        responses: [
          {
            status: 200,
            description: "Array of active civic poll topics",
            example: [
              {
                id: "mumbai-metro-line-expansion",
                title: "Prioritize Suburban Rail Air-Conditioning or New Metro Line 14?",
                category: "Urban Infrastructure",
                total_ballots_cast: 18450,
                status: "ACTIVE",
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/pub/t/{id}",
        summary: "Topic Metadata & Current Ballot Tally",
        description: "Retrieves topic details, voting choices, eligibility rules, and Blake3 hash.",
        tag: "Polls & Referendums",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Topic identifier slug",
            example: "mumbai-metro-line-expansion",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Topic entity with choices and tally",
            example: {
              id: "mumbai-metro-line-expansion",
              title: "Suburban Rail AC vs Metro Line 14",
              options: ["Prioritize AC Suburban Trains", "Accelerate Metro Line 14", "Split Budget Equally"],
              total_votes: 18450,
              blake3_commitment: "b845df71029c",
            },
          },
          { status: 404, description: "Topic ID not found" },
        ],
      },
      {
        method: "GET",
        path: "/pub/t/{topic_id}/v/{vote_id}/results",
        summary: "Ballot Verification & Cryptographic Tally",
        description: "Returns audited vote distribution and cryptographic commitment proof chain.",
        tag: "Polls & Referendums",
        parameters: [
          {
            name: "topic_id",
            in: "path",
            type: "string",
            required: true,
            description: "Topic identifier",
            example: "mumbai-metro-line-expansion",
          },
          {
            name: "vote_id",
            in: "path",
            type: "string",
            required: true,
            description: "Ballot ID",
            example: "ballot-42",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Aggregated tally with audit commitment proof",
            example: {
              topic_id: "mumbai-metro-line-expansion",
              vote_id: "ballot-42",
              tally: { "Option A": 9210, "Option B": 7140, "Option C": 2100 },
              verified: true,
              merkle_root: "blake3:7c22e49a88...",
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/citizen/register",
        summary: "Issue Citizen Pseudonym & Credential",
        description: "Registers an anonymous citizen voter identity with zero-knowledge commitment.",
        tag: "Identity & Zero-Knowledge",
        requestBody: {
          contentType: "application/json",
          description: "Citizen registration payload",
          example: {
            username: "civic_voter_mumbai",
            password_hash: "sha256:d54e88a91...",
            identity_commitment: "zk_comm_98a72c...",
          },
        },
        responses: [
          {
            status: 201,
            description: "Citizen registered and voter credential generated",
            example: {
              status: "REGISTERED",
              username: "civic_voter_mumbai",
              credential_id: "cred-99120",
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/citizen/login",
        summary: "Authenticate Citizen Session",
        description: "Verifies voter credential without disclosing underlying identity.",
        tag: "Identity & Zero-Knowledge",
        requestBody: {
          contentType: "application/json",
          description: "Citizen sign-in payload",
          example: {
            username: "civic_voter_mumbai",
            password_hash: "sha256:d54e88a91...",
          },
        },
        responses: [
          {
            status: 200,
            description: "Citizen session established",
            example: {
              session_token: "janmat_sess_8812c9...",
              voting_power: 1,
            },
          },
        ],
      },
      {
        method: "GET",
        path: "/citizen/username/{name}",
        summary: "Check Pseudonym Availability",
        description: "Ensures unique handle allocation across citizen electoral roll.",
        tag: "Identity & Zero-Knowledge",
        parameters: [
          {
            name: "name",
            in: "path",
            type: "string",
            required: true,
            description: "Requested citizen pseudonym",
            example: "civic_voter_42",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Username availability result",
            example: { username: "civic_voter_42", available: true },
          },
        ],
      },
      {
        method: "POST",
        path: "/citizen/v/{id}/cast",
        summary: "Cast Anonymous Encrypted Ballot",
        description: "Submits vote with zero-knowledge nullifier proof preventing double voting.",
        tag: "Voting & Balloting",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Ballot identifier",
            example: "ballot-42",
          },
        ],
        requestBody: {
          contentType: "application/json",
          description: "Zero-knowledge anonymous ballot submission",
          example: {
            nullifier_hash: "blake3:nullifier_78ac991...",
            encrypted_choice: "enc:option_1",
            zk_proof: "snark:proof_data_88a...",
          },
        },
        responses: [
          {
            status: 200,
            description: "Vote commitment accepted into cryptographic block",
            example: {
              status: "BALLOT_ACCEPTED",
              receipt_hash: "blake3:receipt_0192a...",
            },
          },
          { status: 409, description: "Nullifier already spent (double-voting rejected)" },
        ],
      },
    ],
  },

  talkingyt: {
    slug: "talkingyt",
    name: "TalkingYouTube",
    subtitle: "Persistent Semantic RAG System for YouTube Transcripts",
    summary:
      "A persistent semantic RAG system for YouTube transcripts built with Python FastAPI, Google Gemini embeddings, and PostgreSQL with pgvector, retaining sessions, embeddings, and chat history with grounded timestamped citations.",
    timeline: "Oct 2025",
    githubUrl: "https://github.com/beingadish/TalkingYT",
    localPath: "/Users/beingadish/Developer/CODE/LangChain/TalkingYoutube",
    liveUrl: process.env.NEXT_PUBLIC_TALKINGYT_URL || "/talkingyt/",
    backendApiUrl: process.env.NEXT_PUBLIC_TALKINGYT_API_URL || "https://api.talkingyt.beingadish.com",
    status: "live",
    stack: [
      "Python 3.12",
      "FastAPI",
      "Next.js 14",
      "PostgreSQL",
      "pgvector",
      "Google Gemini",
      "Docker",
      "Docker Scout",
    ],
    awsServices: [
      "AWS App Runner",
      "Amazon Aurora PostgreSQL (pgvector)",
      "Amazon S3",
      "AWS CloudFront",
      "AWS Route 53",
    ],
    metrics: [
      { label: "Vector Search P99", value: "< 25ms", sublabel: "768-dim HNSW Cosine" },
      { label: "Vulnerabilities", value: "4 High CVEs", sublabel: "Down from 28 via Scout" },
      { label: "Retrieval Grounding", value: "Timestamped", sublabel: "Direct jump to video segment" },
      { label: "Storage Architecture", value: "Cascading", sublabel: "ON DELETE CASCADE session purge" },
    ],
    architectureHighlights: [
      {
        title: "Persistent Hybrid RAG Architecture",
        description:
          "Multi-tenant video transcription pipeline combining YouTube Transcript API extraction, text chunking with token overlaps, and 768-dimensional Gemini vector indexing in PostgreSQL pgvector.",
      },
      {
        title: "Exact Timestamp Grounding & Citation Links",
        description:
          "Every generated response returns timestamp citations (e.g. 04:12) linking directly to the specific second in the YouTube video stream where the factual claim was made.",
      },
      {
        title: "Container Hardening via Docker Scout",
        description:
          "Multi-stage Docker builds scanned and remediated with Docker Scout, eliminating critical base vulnerabilities.",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/health",
        summary: "RAG Engine Health & Vector Pool",
        description: "Liveness probe reporting Gemini API connection and pgvector connection pool state.",
        tag: "System & Health",
        responses: [
          {
            status: 200,
            description: "FastAPI service status ok",
            example: {
              status: "ok",
              api: "talking-youtube",
              has_google_api_key: true,
              active_sessions: 12,
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/api/sessions",
        summary: "Ingest YouTube Video & Vectorize Transcript",
        description:
          "Fetches YouTube transcript segments, generates 768-dim embeddings, and stores chunks in PostgreSQL pgvector.",
        tag: "Sessions & Ingestion",
        requestBody: {
          contentType: "application/json",
          description: "YouTube video ingestion parameters",
          example: {
            videos: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
            languages: ["en", "hi"],
            title: "Distributed Systems Architecture Talk",
          },
        },
        responses: [
          {
            status: 200,
            description: "Session initialized with chunk vectors indexed",
            example: {
              session_id: "sess-yt-01",
              title: "Distributed Systems Architecture Talk",
              videos_indexed: 1,
              chunks_indexed: 84,
            },
          },
          { status: 422, description: "Transcript extraction error" },
        ],
      },
      {
        method: "GET",
        path: "/api/sessions",
        summary: "List Active Video Sessions",
        description: "Returns all persistent RAG conversation sessions with video counts and timestamps.",
        tag: "Sessions & Ingestion",
        responses: [
          {
            status: 200,
            description: "Array of session summaries",
            example: [
              {
                id: "sess-yt-01",
                title: "Distributed Systems Architecture Talk",
                created_at: "2026-11-13T02:00:00Z",
                video_count: 1,
              },
            ],
          },
        ],
      },
      {
        method: "GET",
        path: "/api/sessions/{session_id}",
        summary: "Retrieve Session Entity & Metadata",
        description: "Fetches session details, indexed videos, and chunk vector counts.",
        tag: "Sessions & Ingestion",
        parameters: [
          {
            name: "session_id",
            in: "path",
            type: "string",
            required: true,
            description: "Unique session UUID",
            example: "sess-yt-01",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Session metadata and video list",
            example: {
              id: "sess-yt-01",
              title: "Distributed Systems Architecture Talk",
              videos: [
                {
                  video_id: "dQw4w9WgXcQ",
                  title: "Keynote: Fault Tolerant Consensus",
                  duration: "42:15",
                },
              ],
            },
          },
          { status: 404, description: "Session not found" },
        ],
      },
      {
        method: "DELETE",
        path: "/api/sessions/{session_id}",
        summary: "Cascading Session & Vector Purge",
        description: "Deletes session, all associated video embeddings, and chat messages via ON DELETE CASCADE.",
        tag: "Sessions & Ingestion",
        parameters: [
          {
            name: "session_id",
            in: "path",
            type: "string",
            required: true,
            description: "Unique session UUID",
            example: "sess-yt-01",
          },
        ],
        responses: [
          { status: 204, description: "Session and vector embeddings purged" },
          { status: 404, description: "Session not found" },
        ],
      },
      {
        method: "POST",
        path: "/api/sessions/{session_id}/videos",
        summary: "Append Videos to Existing Session",
        description: "Indexes additional YouTube videos into an existing conversation session.",
        tag: "Sessions & Ingestion",
        parameters: [
          {
            name: "session_id",
            in: "path",
            type: "string",
            required: true,
            description: "Target session UUID",
            example: "sess-yt-01",
          },
        ],
        requestBody: {
          contentType: "application/json",
          description: "Videos to append",
          example: {
            videos: ["https://www.youtube.com/watch?v=sample2"],
            languages: ["en"],
          },
        },
        responses: [
          {
            status: 200,
            description: "Videos appended and indexed",
            example: { session_id: "sess-yt-01", added_chunks: 42 },
          },
        ],
      },
      {
        method: "GET",
        path: "/api/sessions/{session_id}/messages",
        summary: "Retrieve Session Chat History",
        description: "Fetches historical user questions and grounded model answers with timestamp citations.",
        tag: "Semantic Chat & RAG",
        parameters: [
          {
            name: "session_id",
            in: "path",
            type: "string",
            required: true,
            description: "Session UUID",
            example: "sess-yt-01",
          },
        ],
        responses: [
          {
            status: 200,
            description: "Array of chat messages",
            example: [
              {
                id: "msg-01",
                role: "user",
                content: "How does the Raft consensus algorithm handle leader crashes?",
              },
              {
                id: "msg-02",
                role: "assistant",
                content: "When a leader crashes, follower nodes wait for the election timeout (150-300ms) before transitioning to candidates...",
                citations: [{ timestamp: "14:22", video_id: "dQw4w9WgXcQ" }],
              },
            ],
          },
        ],
      },
      {
        method: "POST",
        path: "/api/chat",
        summary: "Semantic RAG Query with Timestamp Citations",
        description:
          "Generates cosine similarity query against pgvector, retrieves top-k chunks, and queries Gemini for a grounded answer.",
        tag: "Semantic Chat & RAG",
        requestBody: {
          contentType: "application/json",
          description: "RAG query payload",
          example: {
            session_id: "sess-yt-01",
            message: "What is the key takeaway regarding Paxos vs Raft?",
            top_k: 5,
            evaluate: true,
          },
        },
        responses: [
          {
            status: 200,
            description: "Grounded answer with video timestamp citations and RAGAS relevancy score",
            example: {
              answer: "The speaker explains that Raft was specifically designed to be understandable, dividing consensus into leader election, log replication, and safety guarantees [08:14].",
              citations: [
                {
                  timestamp: "08:14",
                  text_snippet: "Raft structures consensus into explicit leader election...",
                },
              ],
              relevancy_score: 0.94,
            },
          },
        ],
      },
    ],
  },
};

export function getProjectShowcase(slug: string): ProjectShowcase | undefined {
  return PROJECT_SHOWCASES[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_SHOWCASES);
}

export function getAllProjects(): ProjectShowcase[] {
  return Object.values(PROJECT_SHOWCASES);
}
