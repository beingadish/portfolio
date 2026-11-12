export interface ArchitectureNode {
  id: string;
  name: string;
  shortName: string;
  tier: "edge" | "gateway" | "compute" | "messaging" | "database" | "cache";
  service: string;
  protocol: string;
  metricBadge: string;
  description: string;
  technicalDetails: string[];
  connectsTo: string[];
}

export interface ErdColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  nullable?: boolean;
  references?: string;
  description: string;
}

export interface ErdTable {
  name: string;
  category: "core" | "transactional" | "lookup" | "audit" | "vector";
  description: string;
  primaryKey: string;
  columns: ErdColumn[];
  indexes: string[];
}

export interface ErdRelationship {
  id: string;
  fromTable: string;
  toTable: string;
  fromColumn: string;
  toColumn: string;
  type: "1:N" | "N:1" | "1:1" | "N:M";
  description: string;
}

export interface FlowStep {
  step: number;
  actor: string;
  target: string;
  action: string;
  protocol: string;
  latency: string;
  description: string;
  dataPayload?: string;
  resilienceNote?: string;
}

export interface FlowDiagram {
  id: string;
  title: string;
  description: string;
  trigger: string;
  outcome: string;
  steps: FlowStep[];
}

export interface SecuritySpec {
  authModel: string;
  isolationModel: string;
  encryptionInTransit: string;
  encryptionAtRest: string;
  resilienceStrategy: string;
  complianceOrAudit: string;
  keyHighlights: {
    title: string;
    description: string;
  }[];
}

export interface ProjectArchitecture {
  slug: string;
  projectName: string;
  headline: string;
  summary: string;
  infraNodes: ArchitectureNode[];
  erdTables: ErdTable[];
  erdRelationships: ErdRelationship[];
  flows: FlowDiagram[];
  security: SecuritySpec;
}

export const PROJECT_ARCHITECTURES: Record<string, ProjectArchitecture> = {
  aroundu: {
    slug: "aroundu",
    projectName: "AroundU Hyperlocal Platform",
    headline: "Modular Monolith, Redis GEO Geospatial Engine & Resilience4j Escrow Pipeline",
    summary:
      "A high-throughput local freelancing platform engineered in Java 21 with Spring Boot 3. Redis GEO provides sub-4ms radius queries as a secondary cache index, while PostgreSQL acts as the ACID system of record with Resilience4j circuit breakers preventing cascading escrow payment failures.",
    infraNodes: [
      {
        id: "ingress",
        name: "NGINX Reverse Proxy & SSL Termination",
        shortName: "NGINX Ingress",
        tier: "edge",
        service: "Edge Ingress Gateway",
        protocol: "HTTPS / TLS 1.3",
        metricBadge: "< 1.2ms TLS Handshake",
        description: "Public reverse proxy routing incoming mobile and web traffic, enforcing HTTP/2 and CORS headers.",
        technicalDetails: [
          "Terminates TLS 1.3 with ECDHE forward secrecy",
          "Forwards client real IP via X-Forwarded-For headers",
          "Buffers client payloads and compresses JSON responses with gzip/brotli",
        ],
        connectsTo: ["gateway", "static_cdn"],
      },
      {
        id: "gateway",
        name: "Spring Cloud Gateway & Rate Limiter",
        shortName: "API Gateway",
        tier: "gateway",
        service: "Routing & Auth Filter",
        protocol: "HTTP / REST & WebSocket",
        metricBadge: "Token Bucket Rate Limit",
        description: "Validates HMAC-SHA256 JWT tokens, rate limits by client IP/user ID, and dispatches to service modules.",
        technicalDetails: [
          "Stateless JWT extraction and validation filter",
          "Redis-backed token bucket rate limiting (100 req/min per IP)",
          "Cross-cutting correlation ID injection (X-Correlation-Id) for distributed tracing",
        ],
        connectsTo: ["app_monolith", "auth_module"],
      },
      {
        id: "app_monolith",
        name: "Spring Boot 3 Core Modular Monolith",
        shortName: "AroundU Core",
        tier: "compute",
        service: "Business Logic Engine",
        protocol: "Java 21 Virtual Threads",
        metricBadge: "10,000+ Concurrent Virtual Threads",
        description: "Clean architecture modular monolith encapsulating Jobs, Bidding, Escrow, Reviews, and Skills domains.",
        technicalDetails: [
          "Project Loom Virtual Threads for ultra-efficient blocking I/O handling",
          "Domain-Driven Design (DDD) with strictly decoupled package boundaries",
          "Micrometer metrics export for Actuator telemetry monitoring",
        ],
        connectsTo: ["redis_geo", "postgres_rds", "resilience_cb"],
      },
      {
        id: "resilience_cb",
        name: "Resilience4j Circuit Breaker & Retry",
        shortName: "Resilience4j",
        tier: "compute",
        service: "Fault Tolerance Controller",
        protocol: "In-Memory State Machine",
        metricBadge: "CLOSED · 0 Cascading Faults",
        description: "Monitors payment gateway and third-party SMS OTP latency; trips to OPEN on consecutive failures with fallback execution.",
        technicalDetails: [
          "Ring buffer sliding window of 50 calls for failure rate calculation",
          "Exponential backoff retry policy (3 attempts, multiplier 2.0)",
          "Thread-safe atomic transition between CLOSED, OPEN, and HALF_OPEN states",
        ],
        connectsTo: ["postgres_rds"],
      },
      {
        id: "redis_geo",
        name: "Redis GEO In-Memory Spatial Cache",
        shortName: "Redis GEO",
        tier: "cache",
        service: "Secondary Spatial Index",
        protocol: "RESP Protocol (TCP 6379)",
        metricBadge: "< 3.4ms P99 Radius Latency",
        description: "Maintains active gig locations using 52-bit geohash sorted sets for instantaneous radius searching.",
        technicalDetails: [
          "GEOADD / GEORADIUSBYMEMBER commands computing Haversine distances on earth sphere",
          "Volatile-lru eviction policy with TTL synchronized to gig active lifecycle",
          "In-memory Redis mutex distributed locks (SETNX) for concurrent bid reservations",
        ],
        connectsTo: ["postgres_rds"],
      },
      {
        id: "postgres_rds",
        name: "PostgreSQL ACID System of Record",
        shortName: "PostgreSQL",
        tier: "database",
        service: "Relational Persistence",
        protocol: "HikariCP JDBC Pool",
        metricBadge: "Strict ACID & Read committed",
        description: "Stores permanent user records, gig contracts, encrypted bid escrow balances, and immutable audit logs.",
        technicalDetails: [
          "HikariCP optimized connection pool (20 connections, 250ms max lifetime)",
          "PostGIS spatial extensions ready for bounding-box polygon queries",
          "Row-level locking (SELECT ... FOR UPDATE) during escrow fund transfers",
        ],
        connectsTo: [],
      },
    ],
    erdTables: [
      {
        name: "users",
        category: "core",
        description: "Registered platform participants acting as either clients (posters) or workers (contractors).",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "UUID primary key" },
          { name: "phone_number", type: "VARCHAR(20)", description: "Unique E.164 phone number used for OTP login" },
          { name: "full_name", type: "VARCHAR(120)", description: "Display name of client or contractor" },
          { name: "role", type: "VARCHAR(20)", description: "CLIENT, WORKER, or ADMIN" },
          { name: "is_verified", type: "BOOLEAN", description: "Whether national identity / phone OTP is verified" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Account creation timestamp" },
        ],
        indexes: ["idx_users_phone (UNIQUE)", "idx_users_role"],
      },
      {
        name: "gigs_jobs",
        category: "core",
        description: "Hyperlocal tasks posted by clients with geographic coordinates and budget constraints.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Job UUID" },
          { name: "client_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Poster user ID" },
          { name: "title", type: "VARCHAR(200)", description: "Short descriptive job title" },
          { name: "description", type: "TEXT", description: "Detailed requirements and scope of work" },
          { name: "category", type: "VARCHAR(60)", description: "Electrical, Plumbing, Carpentry, Painting, etc." },
          { name: "budget", type: "DECIMAL(10,2)", description: "Client offering budget in INR" },
          { name: "status", type: "VARCHAR(20)", description: "OPEN, IN_PROGRESS, COMPLETED, CANCELLED" },
          { name: "latitude", type: "DOUBLE PRECISION", description: "WGS-84 latitude" },
          { name: "longitude", type: "DOUBLE PRECISION", description: "WGS-84 longitude" },
          { name: "address", type: "VARCHAR(255)", description: "Human readable street and locality address" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Creation timestamp" },
        ],
        indexes: ["idx_gigs_status", "idx_gigs_geo (latitude, longitude)", "idx_gigs_client_id"],
      },
      {
        name: "bids",
        category: "transactional",
        description: "Worker proposals and quotations submitted against open gigs.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Bid UUID" },
          { name: "job_id", type: "VARCHAR(36)", isFk: true, references: "gigs_jobs.id", description: "Target gig ID" },
          { name: "worker_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Bidding contractor ID" },
          { name: "amount", type: "DECIMAL(10,2)", description: "Quoted bid price in INR" },
          { name: "proposal", type: "TEXT", description: "Worker cover message and timeline estimate" },
          { name: "status", type: "VARCHAR(20)", description: "PENDING, ACCEPTED, REJECTED, WITHDRAWN" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Submission timestamp" },
        ],
        indexes: ["idx_bids_job_id", "idx_bids_worker_id", "idx_bids_status"],
      },
      {
        name: "escrow_transactions",
        category: "transactional",
        description: "Isolated financial ledger holding funds in escrow until gig completion is verified.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Transaction UUID" },
          { name: "job_id", type: "VARCHAR(36)", isFk: true, references: "gigs_jobs.id", description: "Associated job" },
          { name: "bid_id", type: "VARCHAR(36)", isFk: true, references: "bids.id", description: "Accepted bid" },
          { name: "client_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Paying client" },
          { name: "worker_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Payee contractor" },
          { name: "amount", type: "DECIMAL(10,2)", description: "Escrow funds held in escrow" },
          { name: "state", type: "VARCHAR(20)", description: "HELD, RELEASED, REFUNDED, DISPUTED" },
          { name: "lock_version", type: "BIGINT", description: "Optimistic concurrency locking version" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Escrow lock timestamp" },
        ],
        indexes: ["idx_escrow_job_id (UNIQUE)", "idx_escrow_state"],
      },
      {
        name: "job_reviews",
        category: "audit",
        description: "Two-way verified ratings and feedback exchanged upon gig completion.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Review UUID" },
          { name: "job_id", type: "VARCHAR(36)", isFk: true, references: "gigs_jobs.id", description: "Completed job" },
          { name: "reviewer_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Author of review" },
          { name: "reviewee_id", type: "VARCHAR(36)", isFk: true, references: "users.id", description: "Target recipient" },
          { name: "rating", type: "INTEGER", description: "Star rating between 1 and 5" },
          { name: "comment", type: "TEXT", description: "Written performance assessment" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Review timestamp" },
        ],
        indexes: ["idx_reviews_job_id", "idx_reviews_reviewee_id"],
      },
    ],
    erdRelationships: [
      {
        id: "rel-1",
        fromTable: "users",
        toTable: "gigs_jobs",
        fromColumn: "id",
        toColumn: "client_id",
        type: "1:N",
        description: "A client can post multiple hyperlocal gigs over time.",
      },
      {
        id: "rel-2",
        fromTable: "gigs_jobs",
        toTable: "bids",
        fromColumn: "id",
        toColumn: "job_id",
        type: "1:N",
        description: "Multiple workers can submit competing bids on a single open gig.",
      },
      {
        id: "rel-3",
        fromTable: "users",
        toTable: "bids",
        fromColumn: "id",
        toColumn: "worker_id",
        type: "1:N",
        description: "A worker submits bids across different gigs in their area.",
      },
      {
        id: "rel-4",
        fromTable: "bids",
        toTable: "escrow_transactions",
        fromColumn: "id",
        toColumn: "bid_id",
        type: "1:1",
        description: "An accepted bid locks into a dedicated 1-to-1 escrow transaction.",
      },
      {
        id: "rel-5",
        fromTable: "gigs_jobs",
        toTable: "job_reviews",
        fromColumn: "id",
        toColumn: "job_id",
        type: "1:N",
        description: "Each completed gig generates client and worker mutual review records.",
      },
    ],
    flows: [
      {
        id: "flow-nearby",
        title: "Sub-4ms Geospatial Gig Discovery",
        description: "How worker mobile devices query nearby gigs within a custom radius using Redis GEO as a high-speed secondary index.",
        trigger: "Worker opens AroundU mobile app or adjusts discovery radius filter.",
        outcome: "Sorted list of nearby gigs returned with exact Haversine distance in under 5ms.",
        steps: [
          {
            step: 1,
            actor: "AroundU Mobile App",
            target: "NGINX Ingress",
            action: "HTTP GET /api/v1/jobs/nearby?lat=19.076&lng=72.8777&radiusKm=15",
            protocol: "HTTPS / TLS 1.3",
            latency: "1.2ms",
            description: "Mobile app transmits GPS coordinates and desired search radius in kilometers.",
          },
          {
            step: 2,
            actor: "NGINX Ingress",
            target: "API Gateway",
            action: "JWT validation & proxy pass",
            protocol: "HTTP/2 Internal",
            latency: "0.4ms",
            description: "Verifies bearer token and routes to Spring Boot jobs microservice module.",
          },
          {
            step: 3,
            actor: "Spring Boot Jobs Module",
            target: "Redis GEO Cluster",
            action: "GEORADIUSBYMEMBER active_jobs_geo 72.8777 19.076 15 km WITHDIST WITHCOORD",
            protocol: "Redis TCP",
            latency: "1.8ms",
            description: "Executes 52-bit geohash radius lookup, returning matching job IDs and calculated distances in memory.",
          },
          {
            step: 4,
            actor: "Spring Boot Jobs Module",
            target: "PostgreSQL Database",
            action: "Batch query job metadata for returned IDs (WHERE id IN (...))",
            protocol: "HikariCP JDBC",
            latency: "1.5ms",
            description: "Hydrates job titles, client ratings, and budget amounts (cache-aside fallback if not cached).",
          },
          {
            step: 5,
            actor: "API Gateway",
            target: "AroundU Mobile App",
            action: "Return JSON payload sorted by ascending proximity",
            protocol: "HTTPS / JSON",
            latency: "0.6ms",
            description: "Device renders interactive map pins and nearby gig cards with live distance indicators.",
          },
        ],
      },
      {
        id: "flow-escrow",
        title: "Atomic Bid Acceptance & Escrow Settlement",
        description: "Transaction pipeline ensuring atomic fund reservation and contract locking with Resilience4j circuit breaker guards.",
        trigger: "Client taps 'Accept Bid' on a selected worker quotation.",
        outcome: "Gig status updated to IN_PROGRESS, funds locked in escrow, worker notified via push notification.",
        steps: [
          {
            step: 1,
            actor: "Client Mobile App",
            target: "API Gateway",
            action: "POST /api/v1/bid/bids/{bidId}/accept",
            protocol: "HTTPS",
            latency: "1.1ms",
            description: "Client authorizes bid price and triggers payment escrow lock.",
          },
          {
            step: 2,
            actor: "Spring Boot Monolith",
            target: "Redis Mutex",
            action: "SET lock:job:{jobId} {clientId} NX EX 10",
            protocol: "Redis SETNX",
            latency: "0.8ms",
            description: "Acquires distributed lock to prevent race conditions from concurrent bid selections.",
          },
          {
            step: 3,
            actor: "Spring Boot Monolith",
            target: "Resilience4j Circuit Breaker",
            action: "Verify payment provider circuit state (CLOSED)",
            protocol: "In-Memory Probe",
            latency: "0.1ms",
            description: "Ensures payment gateway error rate is below threshold before attempting settlement.",
          },
          {
            step: 4,
            actor: "Spring Boot Monolith",
            target: "PostgreSQL Database",
            action: "BEGIN TRANSACTION; UPDATE bids ...; INSERT INTO escrow_transactions ...; COMMIT;",
            protocol: "HikariCP JDBC",
            latency: "4.2ms",
            description: "Executes atomic database transaction locking funds in escrow state and transitioning job to IN_PROGRESS.",
            resilienceNote: "If DB fails, Redis lock is released and transaction rolls back completely.",
          },
          {
            step: 5,
            actor: "Spring Boot Monolith",
            target: "Worker Push Service",
            action: "Dispatches push alert 'Your bid was accepted!'",
            protocol: "Async WebSocket / FCM",
            latency: "2.1ms",
            description: "Contractor receives instant confirmation with job location and contact channel.",
          },
        ],
      },
    ],
    security: {
      authModel: "Stateless JWT (HMAC-SHA256) with Phone OTP Authentication",
      isolationModel: "Role-Based Access Control (RBAC) with client/contractor domain separation",
      encryptionInTransit: "TLS 1.3 enforced on all external endpoints; internal VPC network segmentation",
      encryptionAtRest: "AWS KMS managed encryption on Amazon RDS PostgreSQL and S3 releases bucket",
      resilienceStrategy: "Resilience4j Circuit Breakers (50-call sliding window) + Exponential Backoff Retries",
      complianceOrAudit: "Immutable escrow transaction ledger with optimistic locking (lock_version) and full audit trail",
      keyHighlights: [
        {
          title: "Zero-Downtime Resilience",
          description: "Circuit breaker pattern isolates third-party payment gateway failures, automatically falling back to queued escrow settlement.",
        },
        {
          title: "Distributed Concurrency Locks",
          description: "Redis SETNX distributed mutexes prevent double-booking or simultaneous bid acceptances on the same gig.",
        },
        {
          title: "Phone-Bound Identity",
          description: "Cryptographic phone OTP ensures contractors and clients are verified before bids or payments can be initialized.",
        },
      ],
    },
  },

  clynic: {
    slug: "clynic",
    projectName: "Clynic Multi-Tenant Hospital Platform",
    headline: "Domain-Driven Microservices, Keycloak Realm Isolation, gRPC & Kafka Event Stream",
    summary:
      "An enterprise-scale multi-tenant clinical operating system designed for human and veterinary care networks. Built with Spring Boot 3, Spring Cloud Gateway, Keycloak realm-per-tenant identity, gRPC inter-service contracts, and an Apache Kafka event streaming backbone.",
    infraNodes: [
      {
        id: "ingress",
        name: "Spring Cloud Gateway & Tenant Router",
        shortName: "API Gateway",
        tier: "gateway",
        service: "Tenant Ingress Router",
        protocol: "HTTP/2 & mTLS",
        metricBadge: "< 2.1ms Gateway Routing",
        description: "Inspects X-Tenant-ID headers and Keycloak JWT claims, enforcing cross-tenant isolation and routing to target microservices.",
        technicalDetails: [
          "Dynamic tenant route locator resolving tenant subdomain to virtual schema",
          "Distributed rate limiting with Redis token bucket algorithm",
          "Global CORS, security headers (CSP, HSTS, X-Frame-Options), and request logging",
        ],
        connectsTo: ["keycloak", "patient_service", "appointment_service"],
      },
      {
        id: "keycloak",
        name: "Keycloak Identity & Access Management",
        shortName: "Keycloak IAM",
        tier: "gateway",
        service: "Realm-per-Tenant Auth",
        protocol: "OAuth2 / OIDC",
        metricBadge: "Strict Realm-per-Tenant",
        description: "Manages hospital staff accounts, roles (Doctor, Nurse, Admin), and patient portal credentials in isolated security realms.",
        technicalDetails: [
          "Complete cryptographic isolation between tenant identity realms",
          "Issues short-lived RS256 signed access tokens with custom tenant claims",
          "Multi-Factor Authentication (MFA) and granular RBAC role hierarchy",
        ],
        connectsTo: ["patient_service"],
      },
      {
        id: "patient_service",
        name: "Patient Registry Microservice",
        shortName: "Patient Service",
        tier: "compute",
        service: "Clinical Cohort Registry",
        protocol: "REST & gRPC",
        metricBadge: "Hibernate Multi-Tenancy",
        description: "Manages human and veterinary patient records, medical histories, vaccination schedules, and allergies.",
        technicalDetails: [
          "Hibernate Schema-per-tenant connection provider ensuring 0 cross-tenant data bleed",
          "Dual clinical mode: Human care fields and Veterinary species/breed models",
          "Publishes patient lifecycle events to Kafka topic (clinical.patient.events)",
        ],
        connectsTo: ["kafka_bus", "tenant_postgres"],
      },
      {
        id: "appointment_service",
        name: "Clinical Scheduling & Calendar Engine",
        shortName: "Appointment Service",
        tier: "compute",
        service: "Slot Booking & Allocation",
        protocol: "REST & gRPC",
        metricBadge: "Zero Double-Booking",
        description: "Coordinates doctor timetables, room allocation, patient appointments, and check-in workflows.",
        technicalDetails: [
          "Optimistic locking prevents overlapping doctor appointment reservations",
          "Synchronous gRPC client calling Billing Service for invoice estimation (< 2ms)",
          "Publishes clinical order events (clinical.appointment.created) to Kafka",
        ],
        connectsTo: ["billing_grpc", "kafka_bus", "tenant_postgres"],
      },
      {
        id: "billing_grpc",
        name: "Billing & Claims gRPC Microservice",
        shortName: "Billing gRPC",
        tier: "compute",
        service: "Protobuf Invoice Processor",
        protocol: "gRPC over HTTP/2",
        metricBadge: "< 1.8ms Inter-Service RPC",
        description: "High-performance microservice computing patient treatment invoices, insurance copays, and pharmacy charges.",
        technicalDetails: [
          "Binary Protobuf serialization yielding 5x lower payload size than REST/JSON",
          "Multiplexed HTTP/2 persistent connections between internal services",
          "Strongly typed Protobuf contracts with backward-compatible schema evolution",
        ],
        connectsTo: ["tenant_postgres"],
      },
      {
        id: "kafka_bus",
        name: "Apache Kafka Clinical Event Bus",
        shortName: "Apache Kafka",
        tier: "messaging",
        service: "Event Streaming Backbone",
        protocol: "Kafka Binary Protocol",
        metricBadge: "Partitioned by Tenant ID",
        description: "Decouples microservices through ordered event streams for audit logs, notifications, and analytics pipelines.",
        technicalDetails: [
          "Topics partitioned by tenant_id guaranteeing in-order per-tenant event delivery",
          "Replication factor of 3 for high-durability fault tolerance across availability zones",
          "At-least-once processing semantics with idempotent consumer deduplication",
        ],
        connectsTo: ["tenant_postgres"],
      },
      {
        id: "tenant_postgres",
        name: "PostgreSQL Multi-Tenant Database",
        shortName: "Multi-Tenant DB",
        tier: "database",
        service: "Schema-Isolated Storage",
        protocol: "HikariCP JDBC",
        metricBadge: "Schema-per-Tenant Isolation",
        description: "PostgreSQL cluster separating each hospital organization into its own schema (e.g. tenant_apex, tenant_metro).",
        technicalDetails: [
          "Hibernate CurrentTenantIdentifierResolver automatically setting search_path",
          "Physically separate tables preventing accidental data leakage across hospitals",
          "Encrypted columns for sensitive patient Protected Health Information (PHI)",
        ],
        connectsTo: [],
      },
    ],
    erdTables: [
      {
        name: "tenants",
        category: "core",
        description: "Master catalog of hospital organizations and veterinary clinics registered on Clynic.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Tenant UUID" },
          { name: "slug", type: "VARCHAR(60)", description: "Unique URL slug (e.g. apex-health)" },
          { name: "name", type: "VARCHAR(120)", description: "Hospital or clinic commercial name" },
          { name: "care_mode", type: "VARCHAR(20)", description: "HUMAN or VETERINARY" },
          { name: "plan", type: "VARCHAR(20)", description: "STARTER, PROFESSIONAL, ENTERPRISE" },
          { name: "status", type: "VARCHAR(20)", description: "ACTIVE, SUSPENDED, PROVISIONING" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Onboarding timestamp" },
        ],
        indexes: ["idx_tenants_slug (UNIQUE)", "idx_tenants_status"],
      },
      {
        name: "facilities",
        category: "core",
        description: "Physical clinics, multi-specialty hospitals, or diagnostic labs owned by a tenant.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Facility UUID" },
          { name: "tenant_id", type: "VARCHAR(36)", isFk: true, references: "tenants.id", description: "Owning tenant" },
          { name: "name", type: "VARCHAR(120)", description: "Facility branch name" },
          { name: "type", type: "VARCHAR(30)", description: "HOSPITAL, CLINIC, LAB, VET_SURGERY" },
          { name: "address", type: "VARCHAR(255)", description: "Physical location address" },
        ],
        indexes: ["idx_facilities_tenant_id"],
      },
      {
        name: "departments",
        category: "core",
        description: "Clinical specialized departments operating within hospital facilities.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Department UUID" },
          { name: "tenant_id", type: "VARCHAR(36)", isFk: true, references: "tenants.id", description: "Owning tenant" },
          { name: "facility_id", type: "VARCHAR(36)", isFk: true, references: "facilities.id", description: "Parent facility" },
          { name: "name", type: "VARCHAR(100)", description: "Department name (Cardiology, Orthopedics, Feline Ward)" },
          { name: "code", type: "VARCHAR(20)", description: "Short clinical code (e.g. CARD, ORTHO)" },
        ],
        indexes: ["idx_departments_facility"],
      },
      {
        name: "users_staff",
        category: "core",
        description: "Medical staff, doctors, nurses, and administrative users with tenant-scoped roles.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Staff user UUID" },
          { name: "tenant_id", type: "VARCHAR(36)", isFk: true, references: "tenants.id", description: "Tenant realm ID" },
          { name: "email", type: "VARCHAR(120)", description: "Unique work email" },
          { name: "full_name", type: "VARCHAR(120)", description: "Staff full name" },
          { name: "roles", type: "VARCHAR(100)", description: "TENANT_ADMIN, DOCTOR, NURSE, RECEPTIONIST" },
          { name: "keycloak_sub", type: "VARCHAR(64)", description: "Keycloak identity subject ID" },
        ],
        indexes: ["idx_staff_email_tenant (UNIQUE)", "idx_staff_tenant_id"],
      },
      {
        name: "patients",
        category: "core",
        description: "Patient cohort records supporting both human patients and veterinary animal companions.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Patient UUID" },
          { name: "tenant_id", type: "VARCHAR(36)", isFk: true, references: "tenants.id", description: "Owning tenant" },
          { name: "full_name", type: "VARCHAR(120)", description: "Patient name or pet name" },
          { name: "species", type: "VARCHAR(30)", description: "HUMAN, CANINE, FELINE, EQUINE" },
          { name: "breed", type: "VARCHAR(60)", nullable: true, description: "Breed (for veterinary patients)" },
          { name: "date_of_birth", type: "DATE", description: "Date of birth" },
          { name: "contact_phone", type: "VARCHAR(25)", description: "Emergency contact or owner telephone" },
          { name: "medical_history", type: "JSONB", description: "Chronological diagnoses, allergies, and lab results" },
        ],
        indexes: ["idx_patients_tenant_id", "idx_patients_species"],
      },
      {
        name: "appointments",
        category: "transactional",
        description: "Scheduled consultation appointments between clinical staff and patients.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Appointment UUID" },
          { name: "tenant_id", type: "VARCHAR(36)", isFk: true, references: "tenants.id", description: "Owning tenant" },
          { name: "patient_id", type: "VARCHAR(36)", isFk: true, references: "patients.id", description: "Attending patient" },
          { name: "doctor_id", type: "VARCHAR(36)", isFk: true, references: "users_staff.id", description: "Assigned practitioner" },
          { name: "facility_id", type: "VARCHAR(36)", isFk: true, references: "facilities.id", description: "Clinic location" },
          { name: "scheduled_at", type: "TIMESTAMP WITH TIME ZONE", description: "Appointment start timestamp" },
          { name: "status", type: "VARCHAR(20)", description: "BOOKED, CHECKED_IN, COMPLETED, CANCELLED" },
          { name: "reason", type: "VARCHAR(255)", description: "Clinical complaint or scheduled procedure" },
        ],
        indexes: ["idx_appointments_doctor_date", "idx_appointments_patient"],
      },
    ],
    erdRelationships: [
      {
        id: "clynic-rel-1",
        fromTable: "tenants",
        toTable: "facilities",
        fromColumn: "id",
        toColumn: "tenant_id",
        type: "1:N",
        description: "A tenant organization operates one or more physical healthcare facilities.",
      },
      {
        id: "clynic-rel-2",
        fromTable: "facilities",
        toTable: "departments",
        fromColumn: "id",
        toColumn: "facility_id",
        type: "1:N",
        description: "A facility houses multiple medical departments.",
      },
      {
        id: "clynic-rel-3",
        fromTable: "tenants",
        toTable: "patients",
        fromColumn: "id",
        toColumn: "tenant_id",
        type: "1:N",
        description: "Patients belong exclusively to their registered tenant hospital schema.",
      },
      {
        id: "clynic-rel-4",
        fromTable: "patients",
        toTable: "appointments",
        fromColumn: "id",
        toColumn: "patient_id",
        type: "1:N",
        description: "A patient maintains a historical record of clinic appointments.",
      },
      {
        id: "clynic-rel-5",
        fromTable: "users_staff",
        toTable: "appointments",
        fromColumn: "id",
        toColumn: "doctor_id",
        type: "1:N",
        description: "A doctor is allocated to multiple scheduled patient time slots.",
      },
    ],
    flows: [
      {
        id: "flow-appointment-booking",
        title: "Clinical Appointment Scheduling & gRPC Invoice Preparation",
        description: "End-to-end appointment allocation with doctor schedule collision prevention and gRPC billing synchronization.",
        trigger: "Staff or patient submits appointment reservation request.",
        outcome: "Appointment booked, invoice estimated via gRPC, and event published to Kafka.",
        steps: [
          {
            step: 1,
            actor: "Staff Web App",
            target: "Spring Cloud Gateway",
            action: "POST /clynic-api/appointments (Bearer JWT + Tenant Header)",
            protocol: "HTTPS / TLS 1.3",
            latency: "1.2ms",
            description: "Browser delivers request containing patient ID, doctor ID, and requested slot.",
          },
          {
            step: 2,
            actor: "Spring Cloud Gateway",
            target: "Appointment Service",
            action: "Resolves tenant context & dispatches to Appointment pod",
            protocol: "HTTP/2 Internal",
            latency: "0.5ms",
            description: "Gateway validates tenant realm and sets tenant security context.",
          },
          {
            step: 3,
            actor: "Appointment Service",
            target: "PostgreSQL Tenant Schema",
            action: "Checks doctor slot availability with optimistic lock",
            protocol: "HikariCP JDBC",
            latency: "2.1ms",
            description: "Verifies no overlapping active appointments exist for the designated practitioner.",
          },
          {
            step: 4,
            actor: "Appointment Service",
            target: "Billing Service",
            action: "gRPC EstimateCharges(TenantId, ProcedureCode, CareMode)",
            protocol: "gRPC / Protobuf",
            latency: "1.4ms",
            description: "Synchronous high-speed binary RPC querying fee schedule and copay requirements.",
          },
          {
            step: 5,
            actor: "Appointment Service",
            target: "Apache Kafka",
            action: "Publishes event: clinical.appointment.created (Partition: tenantId)",
            protocol: "Kafka Protocol",
            latency: "1.8ms",
            description: "Emits event consumed by SMS reminder queue and audit logging consumers.",
          },
        ],
      },
    ],
    security: {
      authModel: "Keycloak Realm-per-Tenant OIDC with granular Role-Based Access Control (RBAC)",
      isolationModel: "Physical Schema-per-Tenant separation in PostgreSQL + Spring Gateway tenant routing",
      encryptionInTransit: "mTLS between internal microservices; TLS 1.3 on external public ingress",
      encryptionAtRest: "AWS KMS envelope encryption with AES-256 on databases and Kafka event partitions",
      resilienceStrategy: "Resilience4j gRPC circuit breakers with fallback fee estimation cache",
      complianceOrAudit: "HIPAA and GDPR aligned: comprehensive immutable audit trail in Kafka event log",
      keyHighlights: [
        {
          title: "Realm-per-Tenant IAM",
          description: "Keycloak realms ensure staff and credentials in one hospital cannot authenticate against or discover another hospital's domain.",
        },
        {
          title: "Zero Cross-Tenant Bleed",
          description: "Hibernate's CurrentTenantIdentifierResolver dynamically switches schema at the JDBC connection level before any query executes.",
        },
        {
          title: "High-Speed gRPC Contracts",
          description: "Internal microservices communicate using binary Protobuf payloads, reducing serialization latency to under 2ms.",
        },
      ],
    },
  },

  janmat: {
    slug: "janmat",
    projectName: "JanMat Civic Platform",
    headline: "Rust Tokio Microservice, Zero-Knowledge Nullifiers & Blake3 Cryptographic Ledger",
    summary:
      "A privacy-preserving, tamper-proof direct democracy and civic opinion platform engineered in Rust with Tokio and Axum. Zero-knowledge proof nullifiers guarantee one-citizen-one-vote anonymity, while Blake3 cryptographic hashing produces an immutable, verifiable audit ledger with sub-millisecond commitments.",
    infraNodes: [
      {
        id: "ingress",
        name: "NGINX Edge Proxy & TLS Terminator",
        shortName: "NGINX Proxy",
        tier: "edge",
        service: "Public Gateway",
        protocol: "HTTPS / TLS 1.3",
        metricBadge: "< 0.8ms Proxy Forwarding",
        description: "Accepts client traffic, terminates SSL, enforces security headers, and reverse-proxies directly to Axum.",
        technicalDetails: [
          "Zero-buffering streaming proxy for real-time ballot submission",
          "Hardened CSP headers preventing XSS and cross-origin ballot manipulation",
          "Direct Unix socket or localhost loopback routing to compiled binary",
        ],
        connectsTo: ["axum_engine"],
      },
      {
        id: "axum_engine",
        name: "Rust Tokio + Axum Microservice Engine",
        shortName: "JanMat Engine",
        tier: "compute",
        service: "High-Throughput Ballot Engine",
        protocol: "Compiled Native Rust Binary",
        metricBadge: "1.98 MB Resident RAM",
        description: "Ultra-lean compiled Rust binary handling concurrent ballot ingestion, ZK verification, and quorum calculations.",
        technicalDetails: [
          "Tokio multi-threaded asynchronous runtime running non-blocking async handlers",
          "Zero garbage collection pauses guaranteeing predictable sub-millisecond tail latencies",
          "Memory-safe Rust ownership model preventing data races and memory leaks",
        ],
        connectsTo: ["zk_verifier", "blake3_hasher", "redis_ballot", "postgres_ledger"],
      },
      {
        id: "zk_verifier",
        name: "Zero-Knowledge Nullifier Verifier",
        shortName: "ZK Verifier",
        tier: "compute",
        service: "Cryptographic Anonymity Guard",
        protocol: "In-Memory Rust Math Crate",
        metricBadge: "1-Person-1-Vote Anonymity",
        description: "Validates cryptographic nullifiers and blind signatures without revealing the citizen's real identity.",
        technicalDetails: [
          "Verifies cryptographic proof that voter possesses a valid credential without disclosing public key",
          "Generates unique nullifier hash deterministic per (voter, topic) to prevent double-voting",
          "Cryptographically unlinkable: impossible to correlate multiple votes cast by the same citizen",
        ],
        connectsTo: ["redis_ballot"],
      },
      {
        id: "blake3_hasher",
        name: "Blake3 Cryptographic Audit Hasher",
        shortName: "Blake3 Hasher",
        tier: "compute",
        service: "Tamper-Proof Commitment",
        protocol: "SIMD Accelerated Hashing",
        metricBadge: "> 10 GB/s Hashing Throughput",
        description: "Computes cryptographic Merkle tree audit commitments for every cast vote and civic rule change.",
        technicalDetails: [
          "Tree-based hash structure providing instant inclusion proofs for public verification",
          "AVX-512 / NEON hardware SIMD acceleration on x86/ARM CPUs",
          "Produces 256-bit tamper-evident fingerprint chained into current civic block height",
        ],
        connectsTo: ["postgres_ledger"],
      },
      {
        id: "redis_ballot",
        name: "Redis High-Speed Nullifier Cache",
        shortName: "Redis Cache",
        tier: "cache",
        service: "Double-Vote Prevention",
        protocol: "RESP Protocol",
        metricBadge: "< 0.4ms Nullifier Check",
        description: "In-memory Bloom filter and Set tracking consumed nullifier hashes for instant duplicate rejection.",
        technicalDetails: [
          "SADD nullifiers:{topic_id} {nullifier_hash} returns 0 if already cast",
          "Provides sub-millisecond gatekeeper rejection before touching persistent database",
          "Real-time counter caching for live vote tally telemetry",
        ],
        connectsTo: ["postgres_ledger"],
      },
      {
        id: "postgres_ledger",
        name: "PostgreSQL Immutable Audit Ledger",
        shortName: "Audit Ledger",
        tier: "database",
        service: "Append-Only Ballot Storage",
        protocol: "sqlx Async Connection Pool",
        metricBadge: "Append-Only Tamper-Proof",
        description: "Immutable append-only database storing cryptographic vote commitments, proposals, and governance rules.",
        technicalDetails: [
          "Strictly append-only permissions on ballots table (no UPDATE or DELETE privileges)",
          "sqlx compile-time checked SQL queries verified against database schema at build time",
          "Cryptographic hash chaining: each block stores hash of previous block",
        ],
        connectsTo: [],
      },
    ],
    erdTables: [
      {
        name: "citizen_credentials",
        category: "core",
        description: "Cryptographic blind credentials issued to verified citizens during onboarding.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Credential UUID" },
          { name: "blind_sig_token", type: "VARCHAR(255)", description: "Blinded cryptographic signature token" },
          { name: "kyc_level", type: "VARCHAR(20)", description: "BASIC, VERIFIED_RESIDENT, MUNICIPAL" },
          { name: "is_active", type: "BOOLEAN", description: "Whether credential is in good standing" },
          { name: "issued_at_block", type: "BIGINT", description: "Civic ledger block height when credential was minted" },
        ],
        indexes: ["idx_cred_token (UNIQUE)"],
      },
      {
        name: "communities",
        category: "core",
        description: "Civic forums organized around geographic infrastructure, transport, and municipal policy.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Community UUID" },
          { name: "slug", type: "VARCHAR(60)", description: "Identifier (e.g. j/infrastructure, j/transport)" },
          { name: "name", type: "VARCHAR(120)", description: "Community title" },
          { name: "description", type: "TEXT", description: "Charter and municipal scope" },
          { name: "moderator_count", type: "INTEGER", description: "Current count of elected moderators (max 2)" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Creation timestamp" },
        ],
        indexes: ["idx_communities_slug (UNIQUE)"],
      },
      {
        name: "civic_proposals",
        category: "core",
        description: "Proposals and referendums submitted by citizens for community voting.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Proposal UUID" },
          { name: "community_id", type: "VARCHAR(36)", isFk: true, references: "communities.id", description: "Parent community" },
          { name: "title", type: "VARCHAR(200)", description: "Proposal headline" },
          { name: "content", type: "TEXT", description: "Full draft proposal text" },
          { name: "proposal_type", type: "VARCHAR(30)", description: "REGULAR (50.1% quorum) or CONSTITUTIONAL (67% quorum)" },
          { name: "status", type: "VARCHAR(20)", description: "DRAFT, ACTIVE, PASSED, REJECTED" },
          { name: "votes_for", type: "BIGINT", description: "Count of verified affirmative ballots" },
          { name: "votes_against", type: "BIGINT", description: "Count of verified negative ballots" },
          { name: "created_at_block", type: "BIGINT", description: "Block height when voting opened" },
          { name: "deadline_block", type: "BIGINT", description: "Block height when ballot box closes" },
        ],
        indexes: ["idx_proposals_community", "idx_proposals_status"],
      },
      {
        name: "ballots_ledger",
        category: "audit",
        description: "Immutable cryptographic ballots cast by citizens with zero-knowledge nullifiers.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Ballot UUID" },
          { name: "proposal_id", type: "VARCHAR(36)", isFk: true, references: "civic_proposals.id", description: "Target proposal" },
          { name: "nullifier_hash", type: "VARCHAR(64)", description: "Unique deterministic ZK nullifier preventing double-voting" },
          { name: "blake3_commitment", type: "VARCHAR(64)", description: "Blake3 cryptographic commitment hash" },
          { name: "choice", type: "VARCHAR(15)", description: "FOR, AGAINST, ABSTAIN" },
          { name: "block_height", type: "BIGINT", description: "Sequential audit block height" },
          { name: "cast_at", type: "TIMESTAMP WITH TIME ZONE", description: "Ballot inclusion timestamp" },
        ],
        indexes: ["idx_ballots_nullifier_proposal (UNIQUE)", "idx_ballots_proposal_id"],
      },
      {
        name: "constitution_rules",
        category: "lookup",
        description: "Immutable governance parameters and quorum thresholds enacted by citizen consensus.",
        primaryKey: "rule_key",
        columns: [
          { name: "rule_key", type: "VARCHAR(60)", isPk: true, description: "e.g. quorum.regular, quorum.constitutional" },
          { name: "rule_value", type: "VARCHAR(120)", description: "Enacted value (e.g. 0.501, 0.67)" },
          { name: "enacted_at_block", type: "BIGINT", description: "Block height when rule was codified" },
          { name: "enacted_by_proposal", type: "VARCHAR(36)", description: "Proposal UUID that enacted this rule" },
        ],
        indexes: [],
      },
    ],
    erdRelationships: [
      {
        id: "janmat-rel-1",
        fromTable: "communities",
        toTable: "civic_proposals",
        fromColumn: "id",
        toColumn: "community_id",
        type: "1:N",
        description: "A community hosts multiple public civic proposals and policy referendums.",
      },
      {
        id: "janmat-rel-2",
        fromTable: "civic_proposals",
        toTable: "ballots_ledger",
        fromColumn: "id",
        toColumn: "proposal_id",
        type: "1:N",
        description: "Each proposal collects immutable, cryptographically hashed citizen ballots.",
      },
      {
        id: "janmat-rel-3",
        fromTable: "civic_proposals",
        toTable: "constitution_rules",
        fromColumn: "id",
        toColumn: "enacted_by_proposal",
        type: "1:N",
        description: "Passed constitutional proposals codify new governance rules in the constitution ledger.",
      },
    ],
    flows: [
      {
        id: "flow-anonymous-vote",
        title: "Zero-Knowledge Anonymous Ballot Casting",
        description: "How a citizen submits an untraceable yet verifiable ballot without exposing identity or allowing double voting.",
        trigger: "Citizen clicks 'Vote FOR' or 'Vote AGAINST' on an active proposal.",
        outcome: "Nullifier checked in Redis, Blake3 commitment generated, ballot appended to ledger in under 2ms.",
        steps: [
          {
            step: 1,
            actor: "Citizen Browser",
            target: "JanMat Axum Engine",
            action: "POST /api/citizen/v/{proposalId}/cast (Nullifier + ZK Proof + Choice)",
            protocol: "HTTPS / TLS 1.3",
            latency: "0.8ms",
            description: "Citizen client computes local ZK nullifier and delivers proof alongside choice.",
          },
          {
            step: 2,
            actor: "JanMat Axum Engine",
            target: "Redis Nullifier Set",
            action: "SADD nullifiers:{proposalId} {nullifier_hash}",
            protocol: "Redis TCP",
            latency: "0.4ms",
            description: "Instant in-memory check to verify this nullifier has not cast a ballot previously on this proposal.",
            resilienceNote: "If SADD returns 0, returns HTTP 409 Conflict (Duplicate Ballot Detected).",
          },
          {
            step: 3,
            actor: "JanMat Axum Engine",
            target: "ZK Verifier Crate",
            action: "Verify zk_proof matches active civic credential commitment",
            protocol: "In-Memory Rust SIMD",
            latency: "0.3ms",
            description: "Verifies voter eligibility mathematically without knowing the voter's identity.",
          },
          {
            step: 4,
            actor: "JanMat Axum Engine",
            target: "Blake3 Hasher",
            action: "blake3::hash(prev_hash + proposalId + nullifier + choice)",
            protocol: "CPU Native SIMD",
            latency: "0.1ms",
            description: "Generates cryptographic commitment linking ballot into current block height.",
          },
          {
            step: 5,
            actor: "JanMat Axum Engine",
            target: "PostgreSQL Ledger",
            action: "INSERT INTO ballots_ledger (...) VALUES (...)",
            protocol: "sqlx Async Pool",
            latency: "1.2ms",
            description: "Appends ballot to the immutable audit table and increments proposal tally counters.",
          },
        ],
      },
    ],
    security: {
      authModel: "Zero-Knowledge Proof Nullifiers + Blind Cryptographic Signatures (No passwords or plain tokens)",
      isolationModel: "Complete voter anonymity: nullifier hash is mathematically decoupled from citizen real identity",
      encryptionInTransit: "TLS 1.3 with forward secrecy enforced on all ingress endpoints",
      encryptionAtRest: "PostgreSQL encrypted storage + hardware Blake3 Merkle tree validation",
      resilienceStrategy: "Rust zero-cost abstractions, zero garbage collection pauses, in-memory Redis deduplication",
      complianceOrAudit: "100% public cryptographic auditability: any citizen can verify Merkle inclusion of their vote",
      keyHighlights: [
        {
          title: "Mathematical Anonymity",
          description: "Zero-knowledge nullifiers prove a vote came from an eligible citizen without revealing which citizen cast it.",
        },
        {
          title: "Double-Vote Immunity",
          description: "A deterministic nullifier per (citizen, topic) pair guarantees exactly one vote per person while preserving secrecy.",
        },
        {
          title: "Ultra-Lightweight Footprint",
          description: "Compiled release binary requires less than 2 MB resident RAM to handle thousands of concurrent cryptographic ballots.",
        },
      ],
    },
  },

  talkingyt: {
    slug: "talkingyt",
    projectName: "TalkingYouTube Semantic RAG",
    headline: "FastAPI Async Engine, pgvector Cosine Retrieval & Gemini Multimodal Synthesizer",
    summary:
      "A persistent semantic retrieval-augmented generation (RAG) platform built with Python 3.12, FastAPI, PostgreSQL pgvector, and Google Gemini. Ingests video transcripts, generates 1536-dimensional vector embeddings, and performs cosine distance retrieval to answer user queries with grounded, timestamped citations.",
    infraNodes: [
      {
        id: "ingress",
        name: "FastAPI REST Gateway & CORS Controller",
        shortName: "FastAPI Gateway",
        tier: "gateway",
        service: "API Interface",
        protocol: "HTTP/2 & REST",
        metricBadge: "Asynchronous ASGI",
        description: "Manages session lifecycles, chat interactions, and transcript ingestion requests with Pydantic validation.",
        technicalDetails: [
          "Asyncio event loop running non-blocking coroutines",
          "Pydantic v2 schemas providing high-speed C-based payload validation",
          "Full CORS support and streaming response generation for real-time model answers",
        ],
        connectsTo: ["transcript_engine", "gemini_embeddings", "pgvector_db", "gemini_chat"],
      },
      {
        id: "transcript_engine",
        name: "YouTube Transcript Ingestion & Chunker",
        shortName: "Transcript Engine",
        tier: "compute",
        service: "Document Processor",
        protocol: "Async HTTPS",
        metricBadge: "500-Token Overlapping Chunks",
        description: "Extracts timed subtitles from YouTube and partitions text into overlapping semantic segments.",
        technicalDetails: [
          "RecursiveCharacterTextSplitter with 500-token chunk size and 50-token overlap",
          "Preserves exact start and end timestamps (e.g. 08:14) for citation anchoring",
          "Cleans non-semantic artifacts (music notes, automated filler words)",
        ],
        connectsTo: ["gemini_embeddings"],
      },
      {
        id: "gemini_embeddings",
        name: "Google Gemini Text Embedding API",
        shortName: "Gemini Embedding",
        tier: "compute",
        service: "Vector Feature Extractor",
        protocol: "gRPC / HTTPS REST",
        metricBadge: "text-embedding-004 · 1536d",
        description: "Transforms transcript chunks and user questions into dense 1536-dimensional semantic vector spaces.",
        technicalDetails: [
          "Batch vectorization handling up to 100 chunks per API invocation",
          "Normalized L2 embeddings for direct cosine similarity calculation",
          "Task-specific embedding instructions (RETRIEVAL_DOCUMENT vs RETRIEVAL_QUERY)",
        ],
        connectsTo: ["pgvector_db"],
      },
      {
        id: "pgvector_db",
        name: "PostgreSQL with pgvector Extension",
        shortName: "pgvector Database",
        tier: "database",
        service: "Vector & Relational Storage",
        protocol: "asyncpg Connection Pool",
        metricBadge: "< 6.2ms HNSW Vector Search",
        description: "Stores relational session metadata alongside vector embeddings, executing approximate nearest neighbor searches.",
        technicalDetails: [
          "HNSW (Hierarchical Navigable Small World) index for sub-10ms nearest neighbor queries",
          "Cosine distance operator (<=>) retrieving top-k most semantically relevant chunks",
          "Foreign key cascades ensuring complete session deletion purges all associated vector records",
        ],
        connectsTo: ["gemini_chat"],
      },
      {
        id: "gemini_chat",
        name: "Google Gemini 1.5 Pro Generator & RAGAS",
        shortName: "Gemini 1.5 Pro",
        tier: "compute",
        service: "Semantic Synthesizer",
        protocol: "Streaming HTTPS",
        metricBadge: "Grounded Citations + RAGAS",
        description: "Synthesizes conversational responses strictly grounded in the retrieved transcript excerpts with exact timestamp links.",
        technicalDetails: [
          "Strict system prompt preventing hallucinations and enforcing source attribution",
          "RAGAS (Retrieval Augmented Generation Assessment) answer relevancy scoring",
          "Preserves multi-turn conversation memory within active session scope",
        ],
        connectsTo: [],
      },
    ],
    erdTables: [
      {
        name: "chat_sessions",
        category: "core",
        description: "Top-level conversation sessions holding grouped YouTube video transcripts and chat threads.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Session UUID" },
          { name: "title", type: "VARCHAR(200)", description: "User-defined or auto-generated session topic title" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Session start timestamp" },
          { name: "updated_at", type: "TIMESTAMP WITH TIME ZONE", description: "Last message timestamp" },
        ],
        indexes: ["idx_sessions_created_at"],
      },
      {
        name: "videos",
        category: "core",
        description: "YouTube videos ingested and indexed into an active conversation session.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Internal video UUID" },
          { name: "session_id", type: "VARCHAR(36)", isFk: true, references: "chat_sessions.id", description: "Parent session" },
          { name: "youtube_video_id", type: "VARCHAR(32)", description: "11-character YouTube video identifier (e.g. dQw4w9WgXcQ)" },
          { name: "title", type: "VARCHAR(255)", description: "YouTube video title" },
          { name: "duration_seconds", type: "INTEGER", description: "Total video running time in seconds" },
          { name: "language", type: "VARCHAR(10)", description: "Language code of ingested transcript (e.g. en, hi)" },
          { name: "status", type: "VARCHAR(20)", description: "PROCESSING, INDEXED, FAILED" },
        ],
        indexes: ["idx_videos_session_id", "idx_videos_yt_id"],
      },
      {
        name: "transcript_chunks",
        category: "vector",
        description: "Segmented text excerpts with corresponding 1536-dimensional vector embeddings and timestamps.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Chunk UUID" },
          { name: "video_id", type: "VARCHAR(36)", isFk: true, references: "videos.id", description: "Source video" },
          { name: "session_id", type: "VARCHAR(36)", isFk: true, references: "chat_sessions.id", description: "Parent session" },
          { name: "content", type: "TEXT", description: "Raw spoken transcript text segment" },
          { name: "start_timestamp", type: "DOUBLE PRECISION", description: "Beginning timestamp in seconds" },
          { name: "end_timestamp", type: "DOUBLE PRECISION", description: "Ending timestamp in seconds" },
          { name: "embedding", type: "vector(1536)", description: "pgvector 1536-dimensional dense embedding vector" },
        ],
        indexes: ["idx_chunks_session_id", "idx_chunks_hnsw_embedding (HNSW cosine)"],
      },
      {
        name: "messages",
        category: "transactional",
        description: "Historical conversation messages between the user and the grounded AI assistant.",
        primaryKey: "id",
        columns: [
          { name: "id", type: "VARCHAR(36)", isPk: true, description: "Message UUID" },
          { name: "session_id", type: "VARCHAR(36)", isFk: true, references: "chat_sessions.id", description: "Parent session" },
          { name: "role", type: "VARCHAR(20)", description: "USER or ASSISTANT" },
          { name: "content", type: "TEXT", description: "Full message content" },
          { name: "ragas_score", type: "DECIMAL(4,3)", nullable: true, description: "RAGAS answer relevancy score (0.000 to 1.000)" },
          { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", description: "Message timestamp" },
        ],
        indexes: ["idx_messages_session_id"],
      },
    ],
    erdRelationships: [
      {
        id: "yt-rel-1",
        fromTable: "chat_sessions",
        toTable: "videos",
        fromColumn: "id",
        toColumn: "session_id",
        type: "1:N",
        description: "A chat session can aggregate multiple YouTube videos for cross-video semantic comparison.",
      },
      {
        id: "yt-rel-2",
        fromTable: "videos",
        toTable: "transcript_chunks",
        fromColumn: "id",
        toColumn: "video_id",
        type: "1:N",
        description: "Each video transcript is partitioned into dozens of timed vector chunks.",
      },
      {
        id: "yt-rel-3",
        fromTable: "chat_sessions",
        toTable: "messages",
        fromColumn: "id",
        toColumn: "session_id",
        type: "1:N",
        description: "A session maintains an ongoing multi-turn conversational history.",
      },
    ],
    flows: [
      {
        id: "flow-rag-query",
        title: "Semantic Vector Search & Timestamp-Grounded Synthesis",
        description: "How user questions are transformed into vector embeddings, retrieved via pgvector cosine distance, and answered with citations.",
        trigger: "User posts a question in an active video session.",
        outcome: "Synthesized model response delivered with exact YouTube timestamp links and RAGAS score.",
        steps: [
          {
            step: 1,
            actor: "User Web UI",
            target: "FastAPI Gateway",
            action: "POST /api/chat (sessionId, message, top_k=5)",
            protocol: "HTTPS / JSON",
            latency: "1.1ms",
            description: "User submits semantic question regarding the indexed YouTube video.",
          },
          {
            step: 2,
            actor: "FastAPI Gateway",
            target: "Gemini Embedding API",
            action: "text-embedding-004(task_type='RETRIEVAL_QUERY', text=message)",
            protocol: "HTTPS REST",
            latency: "85ms",
            description: "Generates 1536-dimensional query vector matching the mathematical embedding space.",
          },
          {
            step: 3,
            actor: "FastAPI Gateway",
            target: "pgvector PostgreSQL",
            action: "SELECT content, start_timestamp FROM transcript_chunks WHERE session_id = $1 ORDER BY embedding <=> $2 LIMIT 5",
            protocol: "asyncpg TCP",
            latency: "5.8ms",
            description: "HNSW index conducts cosine distance search, retrieving top 5 most relevant timed excerpts.",
          },
          {
            step: 4,
            actor: "FastAPI Gateway",
            target: "Gemini 1.5 Pro",
            action: "Synthesize response with strict prompt: 'Cite timestamps [MM:SS] for all claims'",
            protocol: "Streaming HTTPS",
            latency: "420ms",
            description: "Gemini synthesizes a coherent explanation referencing exact seconds in the video.",
          },
          {
            step: 5,
            actor: "FastAPI Gateway",
            target: "User Web UI",
            action: "Streams formatted markdown answer with clickable timestamp chips",
            protocol: "HTTPS / SSE",
            latency: "12ms",
            description: "User clicks citation chip (e.g. [14:22]) to jump the video directly to the cited moment.",
          },
        ],
      },
    ],
    security: {
      authModel: "API Key Authentication + Per-Session Vector Namespace Isolation",
      isolationModel: "Strict session boundary: pgvector queries are always filtered by session_id",
      encryptionInTransit: "TLS 1.3 enforced for all client and Google Gemini AI API communication",
      encryptionAtRest: "PostgreSQL encrypted volume storage; pgvector tables encrypted at rest",
      resilienceStrategy: "Asynchronous retry with exponential backoff on Gemini API rate limits (HTTP 429)",
      complianceOrAudit: "Zero persistent storage of user credentials; cascading foreign keys ensure complete data deletion",
      keyHighlights: [
        {
          title: "Session Vector Isolation",
          description: "All vector distance queries strictly enforce `WHERE session_id = :sid` at the database level, preventing any cross-session data leakage.",
        },
        {
          title: "Grounded Citation Defense",
          description: "System instructions strictly forbid speculative answers: the model must cite an extracted transcript timestamp or decline to answer.",
        },
        {
          title: "pgvector HNSW Indexing",
          description: "Native in-database vector indexing eliminates the complexity and cost of external third-party vector databases.",
        },
      ],
    },
  },
};
