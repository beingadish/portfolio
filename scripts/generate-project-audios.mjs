import fs from "fs";
import path from "path";

const API_KEY = "sk_m5q357zg_STs2tcWJuKwyvq6l53VCosQl";

export const PROJECT_AUDIO_SCRIPTS = {
  aroundu: {
    name: "AroundU",
    brief:
      "AroundU is a high-scale hyperlocal gig discovery and freelancing platform built in Java 21 and Spring Boot 3. It solves the cold-start and latency bottlenecks of local service matching using Redis GEO spatial indexing, achieving sub-5 millisecond radius queries for nearby workers. The platform features an atomic bidding engine, two-phase OTP escrow settlement, and Resilience4j circuit breakers to guarantee zero cascading payment failures under high concurrency. It is containerized and orchestrated on AWS EC2 using a lightweight Kubernetes k3s cluster with automated NGINX ingress routing.",
    detailed:
      "Welcome to the technical architecture deep dive of AroundU. At its core, AroundU is structured as a production-grade modular monolith in Java 21. By grouping domain services around bidding, job state lifecycles, and escrow payments into clean packages, we eliminate distributed network hops while keeping clear architectural boundaries. For spatial search, traditional relational distance queries cause heavy table scans under high query volume. We solved this with a two-tier geospatial indexing strategy: live worker and job coordinates are indexed in Redis GEO sets, allowing radius searches to execute in sub-five milliseconds. The database tier in Amazon RDS PostgreSQL remains the durable source of truth, hydrated on demand. For payments, job funds are held in escrow using a state machine with distributed locking, ensuring that bids and funds cannot be double-allocated during concurrent transactions. Resilience4j circuit breakers and exponential backoff retries isolate third-party payment gateways, ensuring high availability. On the cloud infrastructure side, AroundU runs on AWS EC2 instances running a Kubernetes k3s cluster, with automated Horizontal Pod Autoscaling and NGINX Ingress controllers. Production observability is powered by custom Micrometer aroundu metrics scraped into Prometheus and monitored in real time on Grafana dashboards.",
  },

  clynic: {
    name: "Clynic Microservices",
    brief:
      "Clinic is a domain-driven, multi-tenant digital hospital platform built with Java Spring Boot 3 microservices for human and veterinary care. It features Spring Cloud Gateway for edge routing, realm-per-tenant identity with Keycloak, zero-overhead gRPC binary contracts for high-speed inter-service communication, and Apache Kafka for asynchronous clinical audit and billing settlement streams. The entire cloud infrastructure is defined with AWS CDK and orchestrated locally with Docker and Kubernetes.",
    detailed:
      "Welcome to the architecture walkthrough of Clinic. As modern hospitals scale across multiple facilities and departments, multi-tenant data isolation and low latency become critical requirements. Clinic solves this using a realm-per-tenant security model. At the edge, Spring Cloud Gateway validates incoming JWT tokens, injects a verified TenantContext header, and routes requests to domain-isolated services. Internal communication between the Patient Registry, Appointment Scheduler, and Billing Service does not use heavy HTTP JSON. Instead, we use gRPC over HTTP/2 with Protocol Buffers, achieving sub-eight millisecond inter-service RPC latencies and strict compile-time contract enforcement. For asynchronous workflows, when a patient is discharged, a Kafka event is published to partitioned clinical audit topics. Downstream analytics and invoicing consumers ingest these messages idempotently, guaranteeing that billing batches are processed without blocking clinical staff. The infrastructure is codified using AWS CDK in TypeScript. It provisions Amazon ECS Fargate for serverless container execution, Amazon Aurora PostgreSQL for multi-tenant clinical records, and Amazon MSK for managed Kafka streaming. For local development, Docker Compose and KIND clusters emulate the full AWS environment with LocalStack.",
  },

  janmat: {
    name: "JanMat Platform",
    brief:
      "JanMat is a high-concurrency, privacy-preserving civic democracy and polling platform engineered in Rust using Tokio and Axum. It delivers sub-millisecond atomic vote tallying for over 100,000 concurrent connections. Voters are authenticated via zero-knowledge credential nullifiers, ensuring one citizen, one vote without ever revealing personal identities. Every ballot produces an immutable Blake3 cryptographic commitment, creating a tamper-proof and verifiably auditable voting ledger deployed on AWS App Runner and Vercel.",
    detailed:
      "Welcome to the engineering architecture deep dive of JanMat. In public civic polling and constitutional voting systems, the central engineering challenge is balancing absolute voter anonymity with verifiable anti-tampering and high throughput. JanMat solves this using zero-knowledge identity nullifiers. Powered by RISC Zero zk-SNARK circuits, citizens prove valid voter eligibility derived from credentials, but their personal identity numbers never touch the network. The system stores a unique mathematical nullifier on-chain to guarantee that no user can cast more than one ballot. On the ingestion side, the backend is written in Rust using Tokio's asynchronous runtime and Axum web framework. Handling peak civic voting events requires extreme throughput: votes are batched into an atomic in-memory Redis aggregation layer, achieving sub-millisecond tally latencies before being asynchronously flushed to Amazon Aurora PostgreSQL. Every cast vote generates an immutable Blake3 cryptographic hash commitment. This allows any voter to independently audit that their ballot is included in the final aggregation without revealing their voting choice. For deployment, the Rust container runs serverlessly on AWS App Runner with Amazon ElastiCache Redis, while the reactive voting interface is hosted on Vercel Edge with live WebSocket tally streams.",
  },

  talkingyt: {
    name: "TalkingYouTube",
    brief:
      "TalkingYouTube is a persistent semantic RAG system for YouTube transcripts built with Python FastAPI, Google Gemini embeddings, and PostgreSQL with pgvector. It allows users to chat naturally with long-form video content, producing grounded conversational answers with precise timestamped citations. Sessions, embeddings, and chat histories are permanently retained, and the containerized architecture is hardened to minimal CVEs using Docker Scout.",
    detailed:
      "Welcome to the technical walkthrough of TalkingYouTube. TalkingYouTube delivers grounded conversational retrieval-augmented generation over long-form YouTube video transcripts. When a YouTube video URL is submitted, the ingestion pipeline extracts transcript tracks, chunks the text semantically with sliding windows, and generates 768-dimensional dense vector embeddings using Google's Gemini embedding model. These vectors are stored directly in PostgreSQL using the pgvector extension with Hierarchical Navigable Small World indexing, enabling vector similarity queries to execute in under 25 milliseconds while keeping relational session metadata tightly coupled. When answering questions, the system extracts relevant semantic chunks and formats timestamped citations, allowing the user to click and jump directly to the exact moment in the YouTube video where the topic is discussed. The stack is built with FastAPI and Next.js, containerized with Docker Compose, and hardened using Docker Scout to reduce vulnerabilities from 28 high-severity CVEs down to four. In production, it is deployed across AWS App Runner and Amazon Aurora PostgreSQL.",
  },
};

function splitIntoChunks(text, maxLen = 350) {
  const sentences = text.match(/[^.!?]+[.!?]+|\S+/g) || [text];
  const chunks = [];
  let current = "";
  for (const s of sentences) {
    if ((current + " " + s).trim().length <= maxLen) {
      current = (current + " " + s).trim();
    } else {
      if (current) chunks.push(current);
      current = s.trim();
    }
  }
  if (current) chunks.push(current);
  return chunks.filter((c) => c.length > 0);
}

function findDataChunkOffset(buf) {
  let offset = 36;
  while (offset < buf.length - 8) {
    if (buf.toString("ascii", offset, offset + 4) === "data") {
      return offset;
    }
    const chunkSize = buf.readUInt32LE(offset + 4);
    offset += 8 + chunkSize;
  }
  return -1;
}

function concatWavBuffers(buffers) {
  if (buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  const first = buffers[0];
  const firstDataOffset = findDataChunkOffset(first);
  if (firstDataOffset === -1) return first;

  const header = first.subarray(0, firstDataOffset + 8);
  const dataParts = [];
  let totalDataLength = 0;

  for (const buf of buffers) {
    const dOffset = findDataChunkOffset(buf);
    if (dOffset === -1) continue;
    const dataSize = buf.readUInt32LE(dOffset + 4);
    const audioData = buf.subarray(dOffset + 8, dOffset + 8 + dataSize);
    dataParts.push(audioData);
    totalDataLength += audioData.length;
  }

  const combinedAudio = Buffer.concat(dataParts);
  const result = Buffer.concat([header, combinedAudio]);

  // Update sizes
  result.writeUInt32LE(result.length - 8, 4); // RIFF chunk size
  result.writeUInt32LE(totalDataLength, firstDataOffset + 4); // data chunk size
  return result;
}

function padWavWithSilence(buf, silenceSec = 0.6) {
  const riff = buf.toString("ascii", 0, 4);
  const wave = buf.toString("ascii", 8, 12);
  if (riff !== "RIFF" || wave !== "WAVE") return buf;

  const sampleRate = buf.readUInt32LE(24);
  const channels = buf.readUInt16LE(22);
  const bitsPerSample = buf.readUInt16LE(34);
  const bytesPerSample = (bitsPerSample / 8) * channels;
  const bytesToAdd = Math.floor(sampleRate * bytesPerSample * silenceSec);

  const dataOffset = findDataChunkOffset(buf);
  if (dataOffset === -1) return buf;

  const oldDataSize = buf.readUInt32LE(dataOffset + 4);
  const newDataSize = oldDataSize + bytesToAdd;
  const newChunkSize = buf.readUInt32LE(4) + bytesToAdd;

  const silence = Buffer.alloc(bytesToAdd, 0);
  const newBuf = Buffer.concat([buf, silence]);
  newBuf.writeUInt32LE(newChunkSize, 4);
  newBuf.writeUInt32LE(newDataSize, dataOffset + 4);
  return newBuf;
}

async function synthesizeChunkBatch(chunkBatch) {
  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: chunkBatch,
      target_language_code: "en-IN",
      speaker: "aditya",
      model: "bulbul:v3",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.audios || !data.audios[0]) {
    throw new Error(`No audio returned: ${JSON.stringify(data)}`);
  }

  return Buffer.from(data.audios[0], "base64");
}

async function synthesizeFullText(text) {
  const chunks = splitIntoChunks(text, 350);
  const batches = [];
  // Sarvam Bulbul:v3 allows at most 3 items in inputs array
  for (let i = 0; i < chunks.length; i += 3) {
    batches.push(chunks.slice(i, i + 3));
  }

  const wavParts = [];
  for (const batch of batches) {
    const rawWav = await synthesizeChunkBatch(batch);
    wavParts.push(rawWav);
    await sleep(350);
  }

  const combinedWav = concatWavBuffers(wavParts);
  return padWavWithSilence(combinedWav, 0.6);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const outDir = path.join("public", "audio", "projects");
  fs.mkdirSync(outDir, { recursive: true });

  console.log("Synthesizing Project Audio Briefs & Detailed Walkthroughs (English)...");

  for (const [slug, data] of Object.entries(PROJECT_AUDIO_SCRIPTS)) {
    console.log(`\n=== Project: ${data.name} (${slug}) ===`);

    for (const type of ["brief", "detailed"]) {
      const outFile = path.join(outDir, `${slug}_${type}.wav`);
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
        console.log(`[SKIP] Already exists: ${outFile}`);
        continue;
      }

      console.log(`[SYNTHESIZING] ${slug} -> ${type}`);
      let ok = false;
      let attempts = 0;
      while (attempts < 3 && !ok) {
        attempts++;
        try {
          const buf = await synthesizeFullText(data[type]);
          fs.writeFileSync(outFile, buf);
          const kb = (buf.length / 1024).toFixed(1);
          console.log(`  ✓ Saved ${outFile} (${kb} KB)`);
          ok = true;
          await sleep(400);
        } catch (err) {
          console.error(`  ✗ Attempt ${attempts} failed for ${slug}_${type}:`, err.message);
          await sleep(1500);
        }
      }
    }
  }

  console.log("\n✓ All project audio tracks successfully generated!");
}

main().catch(console.error);
