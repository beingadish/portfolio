export type LanguageCode =
  | "en"
  | "hi"
  | "sa"
  | "kn"
  | "ta"
  | "te"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa"
  | "or";

export type LanguageMeta = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  bcp47: string;
};

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", script: "Latin", bcp47: "en-IN" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari", bcp47: "hi-IN" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", script: "Devanagari", bcp47: "sa-IN" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada", bcp47: "kn-IN" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil", bcp47: "ta-IN" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu", bcp47: "te-IN" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam", bcp47: "ml-IN" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari", bcp47: "mr-IN" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali", bcp47: "bn-IN" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati", bcp47: "gu-IN" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", script: "Gurmukhi", bcp47: "pa-IN" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", script: "Odia", bcp47: "or-IN" },
];

export type TranslationDictionary = {
  meta: LanguageMeta;
  nav: {
    about: string;
    showcase: string;
    experience: string;
    projects: string;
    skills: string;
    writing: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    location: string;
    summary: string;
    pitch: string;
    chips: {
      backend: string;
      distributed: string;
      reliability: string;
    };
    downloadResume: string;
    viewProjects: string;
    sessionTitle: string;
    sessionChip: string;
    terminal: {
      init: string;
      roleLine: string;
      buildingLine: string;
    };
  };
  focusInsights: Array<{
    title: string;
    description: string;
  }>;
  about: {
    eyebrow: string;
    title: string;
    copy: string;
    highlights: string[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    copy: string;
    openProfile: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    copy: string;
    liveBadge: string;
    roles: Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      bullets: string[];
    }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{
      name: string;
      timeline: string;
      summary: string;
      bullets: string[];
    }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    copy: string;
    languageCollections: string;
  };
  writing: {
    eyebrow: string;
    title: string;
    copy: string;
    readArticle: string;
  };
  achievements: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  education: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    resumeBtn: string;
    emailBtn: string;
  };
};

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    meta: { code: "en", name: "English", nativeName: "English", script: "Latin", bcp47: "en-IN" },
    nav: {
      about: "About",
      showcase: "Showcase",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      writing: "Writing",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Software Engineer Portfolio",
      name: "Aadarsh Pandey",
      role: "Software Engineer | Backend, Distributed Systems & Gen AI",
      location: "Bengaluru, Karnataka, India",
      summary:
        "Backend engineer focused on building fast, reliable systems at scale. I currently work on transit and fleet telemetry infrastructure, and actively build Gen AI projects around retrieval and semantic search.",
      pitch:
        "I design production-grade APIs, event pipelines, and mobile-backed integrations that handle real-world traffic with strong reliability. My work focuses on backend systems, distributed workflows, and production readiness.",
      chips: {
        backend: "Backend Engineering",
        distributed: "Distributed Systems",
        reliability: "Production Readiness",
      },
      downloadResume: "Download Resume",
      viewProjects: "View Projects",
      sessionTitle: "Session",
      sessionChip: "~/portfolio",
      terminal: {
        init: "INITIALIZING PORTFOLIO... [OK]",
        roleLine: "BACKEND | MOBILE | AI ENGINEER",
        buildingLine: "BUILDING SCALABLE SYSTEMS AND INTELLIGENT SOLUTIONS.",
      },
    },
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
        description: "Strong understanding of backend execution systems, async workflows, and distributed architectures.",
      },
    ],
    about: {
      eyebrow: "About",
      title: "Building reliable products with a people-first engineering approach.",
      copy: "Backend engineer focused on building fast, reliable systems at scale.",
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
    },
    showcase: {
      eyebrow: "Showcase",
      title: "Engineering profile snapshots",
      copy: "Live public snapshots from pinned GitHub repositories and LeetCode activity.",
      openProfile: "Open Profile",
    },
    experience: {
      eyebrow: "Experience",
      title: "Production engineering with measurable performance impact.",
      copy: "I work across backend APIs, data pipelines, Android integrations, and cloud delivery to ship resilient systems.",
      liveBadge: "LIVE",
      roles: [
        {
          title: "Software Engineer",
          company: "Accenture",
          location: "Bengaluru, India",
          period: "June 2026 - Present",
          bullets: [
            "Working on a large-scale fleet telemetry consumption and processing system that generates insights from heavy machinery.",
            "Contributing to backend and cloud development across Java, Spring Boot, MQTT, AWS IoT Core, Lambda, Kinesis, DynamoDB, and ECS.",
            "Building resilient telemetry flows for intermittent connectivity, retries, idempotency, data validation, and observability.",
          ],
        },
        {
          title: "Associate Software Engineer",
          company: "Accenture",
          location: "Bengaluru, India",
          period: "Oct 2024 - May 2026",
          bullets: [
            "Built and improved Java Spring Boot REST APIs processing 100,000+ daily transit transactions across 10+ agencies.",
            "Reduced payment API latency by 35% using Redis caching, indexing, and query tuning.",
            "Delivered Android UI features in Java/Kotlin with MVVM architecture and Retrofit integrations.",
            "Debugged NFC readers, QR scanners, and thermal printer SDK edge cases with 99%+ transaction success rate.",
            "Maintained Kafka-based event pipelines handling 200K+ events/day with JWT-secured microservice endpoints.",
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
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Systems and products built outside day-to-day work.",
      copy: "I build hands-on projects that mirror real production concerns: architecture, throughput, observability, and maintainability.",
      items: [
        {
          name: "TalkingYoutube",
          timeline: "Active Project",
          summary: "A multimodal AI system for querying YouTube videos via semantic search, RAG, and transcript embedding.",
          bullets: [
            "Built retrieval pipeline with LangChain, FAISS, and custom vector embeddings for timestamp-accurate video search.",
            "Integrated asynchronous audio processing and LLM summarization with streaming answers.",
          ],
        },
        {
          name: "KubeTransit Microservices",
          timeline: "Production Demo",
          summary: "A resilient transit ticketing and validation microservice platform running on Kubernetes k3s.",
          bullets: [
            "Implemented rate limiting with Bucket4j, circuit breaking with Resilience4j, and Kafka event streaming.",
            "Built complete observability dashboards with Prometheus, Grafana, and Micrometer.",
          ],
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "A practical toolkit for backend, mobile, and AI-driven features.",
      copy: "I focus on technologies that deliver measurable performance and reliable developer workflows.",
      languageCollections: "Language & Collections",
    },
    writing: {
      eyebrow: "Writing",
      title: "Medium Articles",
      copy: "A selection of my published writing on backend engineering and system design.",
      readArticle: "Read Article",
    },
    achievements: {
      eyebrow: "Achievements",
      title: "Milestones",
      copy: "Selected certifications and outcomes that reflect consistency in learning and execution.",
    },
    education: {
      eyebrow: "Education",
      title: "Academic Foundation",
      copy: "Core computer science fundamentals and practical problem-solving through engineering coursework.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us build something meaningful.",
      copy: "Open to impactful software engineering opportunities across backend systems, distributed architecture, and product engineering.",
      resumeBtn: "Resume",
      emailBtn: "Email",
    },
  },

  hi: {
    meta: { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari", bcp47: "hi-IN" },
    nav: {
      about: "परिचय",
      showcase: "शोकेस",
      experience: "अनुभव",
      projects: "प्रोजेक्ट्स",
      skills: "कौशल",
      writing: "लेखन",
      contact: "संपर्क",
    },
    hero: {
      eyebrow: "सॉफ्टवेयर इंजीनियर पोर्टफोलियो",
      name: "आदर्श पाण्डेय",
      role: "सॉफ्टवेयर इंजीनियर | बैकएंड, डिस्ट्रिब्यूटेड सिस्टम्स एवं जेन एआई",
      location: "बेंगलुरु, कर्नाटक, भारत",
      summary:
        "स्केलेबल, तीव्र एवं भरोसेमंद बैकएंड सिस्टम बनाने वाले इंजीनियर। वर्तमान में मैं ट्रांजिट और फ्लीट टेलीमेट्री इंफ्रास्ट्रक्चर पर कार्य कर रहा हूँ, और सेमेंटिक सर्च व जेन एआई पर प्रोजेक्ट्स बनाता हूँ।",
      pitch:
        "मैं प्रोडक्शन-ग्रेड एपीआई, इवेंट पाइपलाइन्स और मोबाइल इंटीग्रेशन डिजाइन करता हूँ जो भारी ट्रैफिक को उच्च स्थिरता के साथ संभालते हैं।",
      chips: {
        backend: "बैकएंड इंजीनियरिंग",
        distributed: "डिस्ट्रिब्यूटेड सिस्टम्स",
        reliability: "प्रोडक्शन तत्परता",
      },
      downloadResume: "रेज़्यूमे डाउनलोड करें",
      viewProjects: "प्रोजेक्ट्स देखें",
      sessionTitle: "सत्र",
      sessionChip: "~/portfolio",
      terminal: {
        init: "पोर्टफोलियो प्रारंभ हो रहा है... [सफल]",
        roleLine: "बैकएंड | मोबाइल | एआई इंजीनियर",
        buildingLine: "स्केलेबल सिस्टम और आधुनिक समाधानों का निर्माण।",
      },
    },
    focusInsights: [
      {
        title: "व्यावसायिक फोकस",
        description: "बैकएंड इंजीनियरिंग, डिस्ट्रिब्यूटेड सर्विसेज और प्रोडक्शन विश्वसनीयता।",
      },
      {
        title: "इंजीनियरिंग सोच",
        description: "स्पष्टता, सिस्टम थिंकिंग और लंबे समय तक चलने वाला कोड।",
      },
      {
        title: "पहचान",
        description: "मजबूत एज-केस हैंडलिंग और स्थिर एपीआई तैयार करना।",
      },
      {
        title: "कार्यशैली",
        description: "व्यावहारिक निष्पादन, साझा डिबगिंग और गुणवत्ता-केंद्रित डिलीवरी।",
      },
      {
        title: "इंफ्रास्ट्रक्चर शक्ति",
        description: "कुबेरनेट्स (k3s), कंटेनराइजेशन, ऑटो-स्केलिंग और सिस्टम मॉनिटरिंग।",
      },
      {
        title: "सिस्टम थिंकिंग",
        description: "एसिंक वर्कफ़्लो, वितरित प्रणालियाँ और बैकएंड आर्किटेक्चर की गहरी समझ।",
      },
    ],
    about: {
      eyebrow: "परिचय",
      title: "मानव-केंद्रित दृष्टिकोण के साथ विश्वसनीय उत्पादों का निर्माण।",
      copy: "बड़े पैमाने पर तीव्र और विश्वसनीय सिस्टम बनाने के प्रति समर्पित बैकएंड इंजीनियर।",
      highlights: [
        "उच्च ट्रैफिक वाले ट्रांजिट परिवेश के लिए जावा स्प्रिंग बूट एपीआई का विकास व रखरखाव।",
        "एमवीवीएम आर्किटेक्चर और हार्डवेयर एसडीके के साथ एंड्रॉइड ऐप सुविधाएं तैयार कीं।",
        "काफ़्का, जीआरपीसी और जेडब्ल्यूटी प्रमाणीकरण के साथ इवेंट-ड्रिवन माइक्रोसर्विसेज बनाईं।",
        "आरएजी पाइपलाइन, एफएआईएसएस वेक्टर सर्च और लैंगचेन के साथ जेन एआई की खोज।",
        "कुबेरनेट्स (k3s) पर ऑटो-स्केलिंग के साथ प्रोडक्शन-ग्रेड बैकएंड परिनियोजन।",
        "प्रोमेथियस, ग्राफाना और माइक्रोमीटर से रीयल-टाइम मॉनिटरिंग पाइपलाइन बनाई।",
      ],
    },
    showcase: {
      eyebrow: "शोकेस",
      title: "इंजीनियरिंग प्रोफाइल स्नैपशॉट",
      copy: "गिटहब और लीडकोड गतिविधियों के सीधे सार्वजनिक स्नैपशॉट।",
      openProfile: "प्रोफ़ाइल खोलें",
    },
    experience: {
      eyebrow: "अनुभव",
      title: "मापने योग्य प्रदर्शन प्रभाव के साथ प्रोडक्शन इंजीनियरिंग।",
      copy: "मजबूत सिस्टम बनाने हेतु मैं बैकएंड एपीआई, डेटा पाइपलाइनों, एंड्रॉइड और क्लाउड में कार्य करता हूँ।",
      liveBadge: "सक्रिय",
      roles: [
        {
          title: "सॉफ्टवेयर इंजीनियर",
          company: "एक्सेंचर",
          location: "बेंगलुरु, भारत",
          period: "जून 2026 - वर्तमान",
          bullets: [
            "भारी मशीनरी से अंतर्दृष्टि उत्पन्न करने वाले बड़े पैमाने के फ्लीट टेलीमेट्री सिस्टम पर कार्य।",
            "जावा, स्प्रिंग बूट, एमक्यूटीटी, एडब्ल्यूएस आईओटी कोर, लैम्ब्डा, काइनेसिस और डायनेमोडीबी में योगदान।",
            "अनियमित कनेक्टिविटी, पुनः प्रयास और डेटा सत्यापन के लिए लचीले टेलीमेट्री प्रवाह का निर्माण।",
          ],
        },
        {
          title: "एसोसिएट सॉफ्टवेयर इंजीनियर",
          company: "एक्सेंचर",
          location: "बेंगलुरु, भारत",
          period: "अक्टूबर 2024 - मई 2026",
          bullets: [
            "प्रतिदिन 100,000+ ट्रांजिट लेनदेन संभालने वाले जावा स्प्रिंग बूट रेस्ट एपीआई का निर्माण किया।",
            "रेडिस कैशिंग और क्वेरी ट्यूनिंग से भुगतान एपीआई लेटेंसी में 35% सुधार किया।",
            "एनएफसी रीडर, क्यूआर स्कैनर और थर्मल प्रिंटर एसडीके के साथ 99%+ सफलता दर सुनिश्चित की।",
          ],
        },
        {
          title: "सॉफ्टवेयर डेवलपमेंट इंजीनियर इंटर्न",
          company: "ऑस्टेलो इंडिया प्राइवेट लिमिटेड",
          location: "रिमोट",
          period: "मार्च 2024 - मई 2024",
          bullets: [
            "रिवरपॉड स्टेट मैनेजमेंट के साथ फ्लटर ऐप को एमवीवीएम में पुनर्गठित किया।",
            "कैशिंग और यूआई अनुकूलन के माध्यम से ऐप लोड समय को 78% घटाया।",
          ],
        },
        {
          title: "सॉफ्टवेयर डेवलपमेंट इंजीनियर इंटर्न",
          company: "ब्लूपएक्स इंडिया प्राइवेट लिमिटेड",
          location: "रिमोट",
          period: "सितंबर 2023 - मार्च 2024",
          bullets: [
            "रीयल-टाइम फायरबेस एकीकरण के साथ सुरक्षित कैब-बुकिंग प्रवाह बनाया।",
            "गूगल मैप्स और रेज़रपे भुगतान गेटवे को जेडब्ल्यूटी प्रमाणीकरण के साथ जोड़ा।",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "प्रोजेक्ट्स",
      title: "स्वतंत्र रूप से निर्मित सिस्टम और उत्पाद।",
      copy: "मैं ऐसे प्रोजेक्ट्स बनाता हूँ जो प्रोडक्शन चिंताओं जैसे थ्रूपुट, विश्वसनीयता और ऑब्जर्वेबिलिटी को प्रतिबिंबित करते हैं।",
      items: [
        {
          name: "टॉकिंगयूट्यूब (TalkingYoutube)",
          timeline: "सक्रिय प्रोजेक्ट",
          summary: "सेमेंटिक खोज और आरएजी के माध्यम से यूट्यूब वीडियो से संवाद करने वाला मल्टीमॉडल एआई सिस्टम।",
          bullets: [
            "लैंगचेन और एफएआईएसएस वेक्टर एम्बेडिंग के साथ सटीक वीडियो खोज पाइपलाइन बनाई।",
            "स्ट्रीमिंग उत्तरों के साथ ऑडियो प्रोसेसिंग और एलएलएम सारांशीकरण को एकीकृत किया।",
          ],
        },
        {
          name: "क्यूबट्रांजिट माइक्रोसर्विसेज",
          timeline: "प्रोडक्शन डेमो",
          summary: "कुबेरनेट्स k3s पर चलने वाला ट्रांजिट टिकटिंग और सत्यापन माइक्रोसर्विस प्लेटफॉर्म।",
          bullets: [
            "बकेट4जे और रेजिलिएंस4जे के साथ रेट लिमिटिंग व सर्किट ब्रेकिंग लागू की।",
            "प्रोमेथियस और ग्राफाना के साथ संपूर्ण मॉनिटरिंग डैशबोर्ड तैयार किए।",
          ],
        },
      ],
    },
    skills: {
      eyebrow: "कौशल",
      title: "बैकएंड, मोबाइल और एआई सुविधाओं के लिए एक व्यावहारिक टूलकिट।",
      copy: "मैं ऐसी तकनीकों पर ध्यान केंद्रित करता हूँ जो मापने योग्य प्रदर्शन प्रदान करती हैं।",
      languageCollections: "भाषाएं और कलेक्शन्स",
    },
    writing: {
      eyebrow: "लेखन",
      title: "मीडियम लेख",
      copy: "बैकएंड इंजीनियरिंग और सिस्टम डिज़ाइन पर मेरे प्रकाशित तकनीकी लेखों का चयन।",
      readArticle: "लेख पढ़ें",
    },
    achievements: {
      eyebrow: "उपलब्धियां",
      title: "मील के पत्थर",
      copy: "सीखने और क्रियान्वयन में निरंतरता को दर्शाने वाले प्रमाण पत्र।",
    },
    education: {
      eyebrow: "शिक्षा",
      title: "शैक्षणिक आधार",
      copy: "कंप्यूटर विज्ञान के मौलिक सिद्धांत और इंजीनियरिंग पाठ्यक्रम।",
    },
    contact: {
      eyebrow: "संपर्क",
      title: "आइए मिलकर कुछ सार्थक बनाएं।",
      copy: "बैकएंड सिस्टम, डिस्ट्रिब्यूटेड आर्किटेक्चर और प्रोडक्ट इंजीनियरिंग के अवसरों के लिए स्वागत है।",
      resumeBtn: "रेज़्यूमे",
      emailBtn: "ईमेल भेजें",
    },
  },

  sa: {
    meta: { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", script: "Devanagari", bcp47: "sa-IN" },
    nav: {
      about: "परिचयः",
      showcase: "प्रदर्शनम्",
      experience: "अनुभवः",
      projects: "प्रकल्पाः",
      skills: "कौशलानि",
      writing: "लेखाः",
      contact: "सम्पर्कः",
    },
    hero: {
      eyebrow: "तन्त्रांश अभियन्तृ-विवरणम्",
      name: "आदर्श पाण्डेयः",
      role: "तन्त्रांश-अभियन्ता | पश्चभाग-व्यवस्था, वितरिताः प्रणाल्यः च नूतन-कृत्रिमबुद्धिः",
      location: "बेङ्गलूरु, कर्णाटकम्, भारतम्",
      summary:
        "द्रुताः विश्‍वसनीयाः च प्रणाल्यः निर्मातुं समर्पितः पश्चभाग-अभियन्ता। अधुना अहं यानानां दूरमापन-संविधाने कार्यं करोमि, कृत्रिमबुद्धेः च नूतनान् प्रकल्पान् रचयामि।",
      pitch:
        "अहं उत्पादन-स्तरीय-एपीआई, घटना-प्रवाहाः तथा चलदूरभाष-सङ्कलनं रचयामि ये उच्च-यातायातं दृढ-विश्वसनीयतया चालयन्ति।",
      chips: {
        backend: "पश्चभाग-अभियान्त्रिकी",
        distributed: "वितरिताः प्रणाल्यः",
        reliability: "उत्पादन-सज्जता",
      },
      downloadResume: "विवरणपत्रं प्राप्नुवन्तु",
      viewProjects: "प्रकल्पान् पश्यन्तु",
      sessionTitle: "सत्रम्",
      sessionChip: "~/portfolio",
      terminal: {
        init: "विवरणं प्रारभ्यते... [सफलम्]",
        roleLine: "पश्चभाग | चलभाष | कृत्रिमबुद्धि अभियन्ता",
        buildingLine: "विस्तारणीयानां दृढानां च प्रणालीनं निर्माणम्।",
      },
    },
    focusInsights: [
      {
        title: "व्यावसायिकं लक्ष्यम्",
        description: "पश्चभाग-अभियान्त्रिकी, वितरिताः सेवाः, उत्पादन-विश्वसनीयता च।",
      },
      {
        title: "अभियान्त्रिकी-दृष्टिः",
        description: "स्पष्टता-सहितं कार्यं, प्रणाली-चिन्तनं तथा दीर्घस्थायी कूटम्।",
      },
      {
        title: "प्रसिद्धिः",
        description: "स्थिर-सुविधानां रचना, दृढ-दोष-निवारणं च।",
      },
      {
        title: "कार्य-शैली",
        description: "व्यावहारिकी सिद्धिः, सहयोगेन दोषशोधनं तथा गुणवत्ता-युक्ता सेवा।",
      },
      {
        title: "मूलसंरचना-सामर्थ्यम्",
        description: "कुबेरनेटीस् (k3s), पात्रकीकरणं, स्वयमेव-विस्तारः तथा प्रणाल्याः निरीक्षणम्।",
      },
      {
        title: "प्रणाली-चिन्तनम्",
        description: "अतुल्यकालिक-कार्यप्रवाहाणां वितरितानां च प्रणालीनं गभीरं ज्ञानम्।",
      },
    ],
    about: {
      eyebrow: "परिचयः",
      title: "मानव-कल्याणाय विश्वसनीयानां प्रणालीनं निर्माणम्।",
      copy: "तीव्रगत्या कार्यकुशलानां प्रणालीनं निर्माणे समर्पितः पश्चभाग-अभियन्ता।",
      highlights: [
        "उच्च-व्यवहार-युक्ताय गमनागमन-परिवेशाय जावा स्प्रिंग बूट एपीआई निर्माणम्।",
        "एमवीवीएम रीत्या एण्ड्रोइड्-अनुप्रयोग-सुविधानां रचना।",
        "काफ्का तथा जीआरपीसी द्वारा घटना-प्रवर्तितानां सूक्ष्म-सेवानां निर्माणम्।",
        "आरएजी तथा एफएआईएसएस सदिश-अन्वेषणेन सह नूतन-कृत्रिमबुद्धेः अनुसंधानम्।",
      ],
    },
    showcase: {
      eyebrow: "प्रदर्शनम्",
      title: "अभियान्त्रिकी-चित्राणि",
      copy: "गिटहब् तथा लीटकूट् कार्याणां साक्षात् चित्राणि।",
      openProfile: "विवरणं उद्घाटयतु",
    },
    experience: {
      eyebrow: "अनुभवः",
      title: "मापनीय-प्रभाव-युक्ता उत्पादन-अभियान्त्रिकी।",
      copy: "विश्वसनीय-प्रणाली-निर्माणाय अहं पश्चभाग-एपीआई, दत्तांश-प्रवाहेषु, क्लाउड-सेवायां च कार्यं करोमि।",
      liveBadge: "सक्रियम्",
      roles: [
        {
          title: "तन्त्रांश-अभियन्ता",
          company: "एक्सेंचर (Accenture)",
          location: "बेङ्गलूरु, भारतम्",
          period: "जून २०२६ - अद्यपर्यन्तम्",
          bullets: [
            "यन्त्राणां दूरमापन-दत्तांश-संसाधन-प्रणाल्यां प्रमुखं योगदानम्।",
            "जावा, स्प्रिंग बूट, एडब्ल्यूएस आईओटी कोर तथा काइनेसिस मध्ये विकास-कार्यम्।",
            "पुनः प्रयासानां दत्तांश-प्रमाणीकरणस्य च दृढ-प्रवाह-निर्माणम्।",
          ],
        },
        {
          title: "सहयोगी तन्त्रांश-अभियन्ता",
          company: "एक्सेंचर",
          location: "बेङ्गलूरु, भारतम्",
          period: "अक्टूबर २०२४ - मई २०२६",
          bullets: [
            "प्रतिदिनं लक्षाधिक-व्यवहार-साधकाः जावा स्प्रिंग बूट एपीआई प्रणाल्यः सज्जीकृताः।",
            "रेडिस-सञ्चयेन विलम्बतायां ३५% परिमितः हासः कृतः।",
          ],
        },
        {
          title: "तन्त्रांश-अभियन्ता प्रशिक्षुः",
          company: "ऑस्टेलो इण्डिया",
          location: "दूरस्थम्",
          period: "मार्च २०२४ - मई २०२४",
          bullets: ["फ्लटर-अनुप्रयोगस्य गतिवर्धनं तथा संरचना-सुधारः।"],
        },
        {
          title: "तन्त्रांश-अभियन्ता प्रशिक्षुः",
          company: "ब्लूपएक्स इण्डिया",
          location: "दूरस्थम्",
          period: "सितम्बर २०२३ - मार्च २०२४",
          bullets: ["सुरक्षित-यान-आरक्षण-प्रणाल्याः निर्माणम्।"],
        },
      ],
    },
    projects: {
      eyebrow: "प्रकल्पाः",
      title: "स्वतन्त्रतया निर्मिताः प्रणाल्यः।",
      copy: "वास्तविक-उत्पादन-सम्बन्धीनां चिन्तानां समाधानार्थं निर्मिताः प्रकल्पाः।",
      items: [
        {
          name: "टाकिंगयूट्यूब (TalkingYoutube)",
          timeline: "सक्रिय-प्रकल्पः",
          summary: "यूट्यूब-दृश्यश्रव्येभ्यः अर्थपूर्ण-संवाद-समर्था कृत्रिमबुद्धि-प्रणाली।",
          bullets: ["लैंगचेन तथा एफएआईएसएस द्वारा सटीक-अन्वेषण-पाइपलाइन-निर्माणम्।"],
        },
        {
          name: "क्यूबट्रांजिट् (KubeTransit)",
          timeline: "उत्पादन-प्रदर्शनम्",
          summary: "कुबेरनेटीस् उपरि सञ्चालिता टिकिट्-प्रमाणीकरण-सूक्ष्मसेवा।",
          bullets: ["बकेट4जे तथा रेजिलिएन्स4जे द्वारा वेग-नियन्त्रणं परिपथ-विच्छेदश्च।"],
        },
      ],
    },
    skills: {
      eyebrow: "कौशलानि",
      title: "पश्चभाग-मोबाइल-कृत्रिमबुद्धि-निमित्तं व्यावहारिकं साधनम्।",
      copy: "मापनीय-परिणाम-दायकेषु तन्त्रज्ञानेषु मम दृष्टिः।",
      languageCollections: "भाषाः सङ्ग्रहाश्च",
    },
    writing: {
      eyebrow: "लेखनम्",
      title: "मीडियम्-लेखाः",
      copy: "पश्चभाग-अभियान्त्रिक्याः उपरि मया लिखिताः प्रकाशिताश्च लेखाः।",
      readArticle: "लेखं पठतु",
    },
    achievements: {
      eyebrow: "सिद्धिः",
      title: "प्रमाणपत्राणि",
      copy: "निरन्तर-परिश्रमं दर्शयन्तः मानदण्डाः।",
    },
    education: {
      eyebrow: "शिक्षा",
      title: "विद्या-पीठिका",
      copy: "सङ्गणक-विज्ञानस्य मूलभूताः सिद्धान्ताः।",
    },
    contact: {
      eyebrow: "सम्पर्कः",
      title: "आगच्छन्तु, वयं सार्थकं किञ्चित् रचयाम।",
      copy: "पश्चभाग-प्रणालीषु वितरितासु च व्यवस्थासु नूतनावसरेभ्यः स्वागतम्।",
      resumeBtn: "विवरणपत्रम्",
      emailBtn: "विद्युत्पत्रम्",
    },
  },

  kn: {
    meta: { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada", bcp47: "kn-IN" },
    nav: {
      about: "ಪರಿಚಯ",
      showcase: "ಶೋಕೇಸ್",
      experience: "ಅನುಭವ",
      projects: "ಯೋಜನೆಗಳು",
      skills: "ಕೌಶಲ್ಯಗಳು",
      writing: "ಬರವಣಿಗೆ",
      contact: "ಸಂಪರ್ಕ",
    },
    hero: {
      eyebrow: "ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ",
      name: "ಆದರ್ಶ್ ಪಾಂಡೆ",
      role: "ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್ | ಬ್ಯಾಕೆಂಡ್, ಡಿಸ್ಟ್ರಿಬ್ಯೂಟೆಡ್ ಸಿಸ್ಟಮ್ಸ್ & ಜೆನ್ ಎಐ",
      location: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ",
      summary:
        "ದೊಡ್ಡ ಪ್ರಮಾಣದಲ್ಲಿ ವೇಗವಾದ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಬ್ಯಾಕೆಂಡ್ ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಿರ್ಮಿಸುವ ಇಂಜಿನಿಯರ್. ಪ್ರಸ್ತುತ ನಾನು ಸಾರಿಗೆ ಮತ್ತು ವಾಹನ ಟೆಲಿಮೆಟ್ರಿ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ.",
      pitch:
        "ನಾನು ನೈಜ-ಜಗತ್ತಿನ ಹೆಚ್ಚಿನ ದಟ್ಟಣೆಯನ್ನು ಸ್ಥಿರವಾಗಿ ನಿರ್ವಹಿಸುವ ಪ್ರೊಡಕ್ಷನ್-ಗ್ರೇಡ್ ಎಪಿಐಗಳು, ಈವೆಂಟ್ ಪೈಪ್‌ಲೈನ್‌ಗಳು ಮತ್ತು ಮೊಬೈಲ್ ಏಕೀಕರಣಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುತ್ತೇನೆ.",
      chips: {
        backend: "ಬ್ಯಾಕೆಂಡ್ ಇಂಜಿನಿಯರಿಂಗ್",
        distributed: "ಡಿಸ್ಟ್ರಿಬ್ಯೂಟೆಡ್ ಸಿಸ್ಟಮ್ಸ್",
        reliability: "ಪ್ರೊಡಕ್ಷನ್ ಸನ್ನದ್ಧತೆ",
      },
      downloadResume: "ರೆಸ್ಯೂಮೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      viewProjects: "ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      sessionTitle: "ಸೆಷನ್",
      sessionChip: "~/portfolio",
      terminal: {
        init: "ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ... [ಯಶಸ್ವಿ]",
        roleLine: "ಬ್ಯಾಕೆಂಡ್ | ಮೊಬೈಲ್ | ಎಐ ಇಂಜಿನಿಯರ್",
        buildingLine: "ಸ್ಕೇಲೆಬಲ್ ಸಿಸ್ಟಮ್‌ಗಳು ಮತ್ತು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳ ನಿರ್ಮಾಣ.",
      },
    },
    focusInsights: [
      {
        title: "ವೃತ್ತಿಪರ ಗಮನ",
        description: "ಬ್ಯಾಕೆಂಡ್ ಇಂಜಿನಿಯರಿಂಗ್, ಡಿಸ್ಟ್ರಿಬ್ಯೂಟೆಡ್ ಸೇವೆಗಳು ಮತ್ತು ಪ್ರೊಡಕ್ಷನ್ ವಿಶ್ವಾಸಾರ್ಹತೆ.",
      },
      {
        title: "ಇಂಜಿನಿಯರಿಂಗ್ ಚಿಂತನೆ",
        description: "ಸ್ಪಷ್ಟತೆ, ಸಿಸ್ಟಮ್ ಚಿಂತನೆ ಮತ್ತು ದೀರ್ಘಕಾಲಿಕ ಕೋಡಿಂಗ್.",
      },
      {
        title: "ಗುರುತಿಸುವಿಕೆ",
        description: "ಸ್ಥಿರ ವೈಶಿಷ್ಟ್ಯಗಳ ವಿನ್ಯಾಸ ಮತ್ತು ಕಠಿಣ ಎಡ್ಜ್-ಕೇಸ್ ನಿರ್ವಹಣೆ.",
      },
      {
        title: "ಕಾರ್ಯಶೈಲಿ",
        description: "ಪ್ರಾಯೋಗಿಕ ಅನುಷ್ಠಾನ, ಸಹಯೋಗದ ದೋಷನಿವಾರಣೆ ಮತ್ತು ಗುಣಮಟ್ಟ.",
      },
      {
        title: "ಮೂಲಸೌಕರ್ಯ ಬಲ",
        description: "ಕುಬರ್ನೆಟಿಸ್ (k3s), ಕಂಟೈನರೈಸೇಶನ್, ಆಟೋಸ್ಕೇಲಿಂಗ್ ಮತ್ತು ಮಾನಿಟರಿಂಗ್.",
      },
      {
        title: "ಸಿಸ್ಟಮ್ ಚಿಂತನೆ",
        description: "ಅಸಮಕಾಲಿಕ ಕೆಲಸದ ಹರಿವುಗಳು ಮತ್ತು ಬ್ಯಾಕೆಂಡ್ ಆರ್ಕಿಟೆಕ್ಚರ್‌ನ ಆಳವಾದ ಜ್ಞಾನ.",
      },
    ],
    about: {
      eyebrow: "ಪರಿಚಯ",
      title: "ಜನಕೇಂದ್ರಿತ ವಿಧಾನದೊಂದಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಉತ್ಪನ್ನಗಳ ನಿರ್ಮಾಣ.",
      copy: "ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದಲ್ಲಿ ವೇಗವಾದ, ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಿರ್ಮಿಸುವಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ಬ್ಯಾಕೆಂಡ್ ಎಂಜಿನಿಯರ್.",
      highlights: [
        "ಹೆಚ್ಚಿನ ಟ್ರಾಫಿಕ್ ಸಾರಿಗೆ ಪರಿಸರಕ್ಕಾಗಿ ಜಾವಾ ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಎಪಿಐಗಳನ್ನು ನಿರ್ಮಿಸಿ ನಿರ್ವಹಿಸಲಾಗಿದೆ.",
        "ಎಂವಿವಿಎಂ ಆರ್ಕಿಟೆಕ್ಚರ್ ಮತ್ತು ಹಾರ್ಡ್‌ವೇರ್ ಎಸ್‌ಡಿಕೆ ಜೊತೆ ಆಂಡ್ರಾಯ್ಡ್ ವೈಶಿಷ್ಟ್ಯಗಳ ವಿತರಣೆ.",
        "ಕಾಫ್ಕಾ, ಜಿಆರ್‌ಪಿಸಿ ಮತ್ತು ಜೆಡಬ್ಲ್ಯೂಟಿ ಬಳಸಿಕೊಂಡು ಈವೆಂಟ್-ಚಾಲಿತ ಮೈಕ್ರೋಸರ್ವಿಸ್‌ಗಳು.",
        "ಆರ್‌ಎಜಿ ಪೈಪ್‌ಲೈನ್, ಎಫ್‌ಎಐಎಸ್‌ಎಸ್ ವೆಕ್ಟರ್ ಹುಡುಕಾಟದೊಂದಿಗೆ ಜೆನ್ ಎಐ ಪರಿಶೋಧನೆ.",
      ],
    },
    showcase: {
      eyebrow: "ಶೋಕೇಸ್",
      title: "ಇಂಜಿನಿಯರಿಂಗ್ ಪ್ರೊಫೈಲ್ ಚಿತ್ರಣಗಳು",
      copy: "ಗಿಟ್‌ಹಬ್ ಮತ್ತು ಲೀಟ್‌ಕೋಡ್ ಚಟುವಟಿಕೆಗಳ ನೇರ ಚಿತ್ರಣಗಳು.",
      openProfile: "ಪ್ರೊಫೈಲ್ ತೆರೆಯಿರಿ",
    },
    experience: {
      eyebrow: "ಅನುಭವ",
      title: "ಅಳೆಯಬಹುದಾದ ಕಾರ್ಯಕ್ಷಮತೆಯ ಪ್ರಭಾವದೊಂದಿಗೆ ಪ್ರೊಡಕ್ಷನ್ ಇಂಜಿನಿಯರಿಂಗ್.",
      copy: "ಸ್ಥಿರ ಸಿಸ್ಟಮ್‌ಗಳನ್ನು ತಲುಪಿಸಲು ನಾನು ಬ್ಯಾಕೆಂಡ್ ಎಪಿಐಗಳು, ಡೇಟಾ ಪೈಪ್‌ಲೈನ್‌ಗಳು ಮತ್ತು ಕ್ಲೌಡ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತೇನೆ.",
      liveBadge: "ಲೈವ್",
      roles: [
        {
          title: "ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್",
          company: "ಅಕ್ಸೆಂ Run / ಅಕ್ಸೆಂಚರ್ (Accenture)",
          location: "ಬೆಂಗಳೂರು, ಭಾರತ",
          period: "ಜೂನ್ 2026 - ಪ್ರಸ್ತುತ",
          bullets: [
            "ಭಾರೀ ಯಂತ್ರೋಪಕರಣಗಳಿಂದ ಒಳನೋಟಗಳನ್ನು ನೀಡುವ ಬೃಹತ್ ಫ್ಲೀಟ್ ಟೆಲಿಮೆಟ್ರಿ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಣೆ.",
            "ಜಾವಾ, ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್, ಎಂಕ್ಯೂಟಿಟಿ, ಎಡಬ್ಲ್ಯೂಎಸ್ ಐಒಟಿ ಕೋರ್, ಲ್ಯಾಂಬ್ಡಾ ಮತ್ತು ಕೈನೆಸಿಸ್ ಅಭಿವೃದ್ಧಿ.",
            "ವಿಶ್ವಾಸಾರ್ಹ ಟೆಲಿಮೆಟ್ರಿ ಹರಿವು, ಪುನರಾವರ್ತನೆ ಮತ್ತು ಡೇಟಾ ಮೌಲ್ಯೀಕರಣದ ನಿರ್ಮಾಣ.",
          ],
        },
        {
          title: "ಅಸೋಸಿಯೇಟ್ ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್",
          company: "ಅಕ್ಸೆಂಚರ್",
          location: "ಬೆಂಗಳೂರು, ಭಾರತ",
          period: "ಅಕ್ಟೋಬರ್ 2024 - ಮೇ 2026",
          bullets: [
            "ಪ್ರತಿದಿನ 1,00,000+ ಸಾರಿಗೆ ವಹಿವಾಟುಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವ ಜಾವಾ ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಎಪಿಐಗಳನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ.",
            "ರೆಡಿಸ್ ಕ್ಯಾಶಿಂಗ್ ಮೂಲಕ ಪಾವತಿ ಎಪಿಐ ಲೇಟೆನ್ಸಿಯನ್ನು 35% ಕಡಿಮೆ ಮಾಡಲಾಗಿದೆ.",
          ],
        },
        {
          title: "ಸಾಫ್ಟ್‌ವೇರ್ ಡೆವಲಪ್‌ಮೆಂಟ್ ಇಂಜಿನಿಯರ್ ಇಂಟರ್ನ್",
          company: "ಓಸ್ಟೆಲ್ಲೊ ಇಂಡಿಯಾ",
          location: "ರಿಮೋಟ್",
          period: "ಮಾರ್ಚ್ 2024 - ಮೇ 2024",
          bullets: ["ಫ್ಲಟರ್ ಆ್ಯಪ್ ಅನ್ನು ರಿವರ್‌ಪಾಡ್ ಸ್ಟೇಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್‌ನೊಂದಿಗೆ ಎಂವಿವಿಎಂಗೆ ಮರು-ರಚಿಸಲಾಗಿದೆ."],
        },
        {
          title: "ಸಾಫ್ಟ್‌ವೇರ್ ಡೆವಲಪ್‌ಮೆಂಟ್ ಇಂಜಿನಿಯರ್ ಇಂಟರ್ನ್",
          company: "ಬ್ಲೂಪ್‌ಎಕ್ಸ್ ಇಂಡಿಯಾ",
          location: "ರಿಮೋಟ್",
          period: "ಸೆಪ್ಟೆಂಬರ್ 2023 - ಮಾರ್ಚ್ 2024",
          bullets: ["ಫೈರ್‌ಬೇಸ್ ಏಕೀಕರಣದೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಕ್ಯಾಬ್-ಬುಕಿಂಗ್ ಹರಿವನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ."],
        },
      ],
    },
    projects: {
      eyebrow: "ಯೋಜನೆಗಳು",
      title: "ದೈನಂದಿನ ಕೆಲಸದ ಹೊರಗೆ ನಿರ್ಮಿಸಲಾದ ವ್ಯವಸ್ಥೆಗಳು.",
      copy: "ಕಾರ್ಯಕ್ಷಮತೆ, ಸ್ಥಿರತೆ ಮತ್ತು ನಿರ್ವಹಣೆಯನ್ನು ಬಿಂಬಿಸುವ ನೈಜ ಯೋಜನೆಗಳು.",
      items: [
        {
          name: "ಟಾಕಿಂಗ್ ಯೂಟ್ಯೂಬ್ (TalkingYoutube)",
          timeline: "ಸಕ್ರಿಯ ಯೋಜನೆ",
          summary: "ಸೆಮ್ಯಾಂಟಿಕ್ ಹುಡುಕಾಟ ಮತ್ತು ಆರ್‌ಎಜಿ ಮೂಲಕ ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊಗಳೊಂದಿಗೆ ಸಂವಾದ ನಡೆಸುವ ಎಐ ವ್ಯವಸ್ಥೆ.",
          bullets: ["ಲ್ಯಾಂಗ್‌ಚೈನ್ ಮತ್ತು ಎಫ್‌ಎಐಎಸ್‌ಎಸ್ ಮೂಲಕ ನಿಖರವಾದ ವೀಡಿಯೊ ಹುಡುಕಾಟ ಪೈಪ್‌ಲೈನ್ ನಿರ್ಮಿಸಲಾಗಿದೆ."],
        },
        {
          name: "ಕ್ಯೂಬ್‌ಟ್ರಾನ್ಸಿಟ್ ಮೈಕ್ರೋಸರ್ವಿಸಸ್",
          timeline: "ಪ್ರೊಡಕ್ಷನ್ ಡೆಮೊ",
          summary: "ಕುಬರ್ನೆಟಿಸ್ k3s ನಲ್ಲಿ ಚಾಲನೆಯಾಗುವ ಸಾರಿಗೆ ಟಿಕೆಟಿಂಗ್ ಮತ್ತು ಮೌಲ್ಯೀಕರಣ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್.",
          bullets: ["ಬಕೆಟ್4ಜೆ ಮತ್ತು ರೆಸಿಲಿಯನ್ಸ್4ಜೆ ನೊಂದಿಗೆ ದರ ಮಿತಿ ಮತ್ತು ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕಿಂಗ್ ಅಳವಡಿಕೆ."],
        },
      ],
    },
    skills: {
      eyebrow: "ಕೌಶಲ್ಯಗಳು",
      title: "ಬ್ಯಾಕೆಂಡ್, ಮೊಬೈಲ್ ಮತ್ತು ಎಐ ವೈಶಿಷ್ಟ್ಯಗಳಿಗಾಗಿ ಪ್ರಾಯೋಗಿಕ ಟೂಲ್‌ಕಿಟ್.",
      copy: "ಅಳೆಯಬಹುದಾದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ನೀಡುವ ತಂತ್ರಜ್ಞಾನಗಳ ಮೇಲೆ ನನ್ನ ಗಮನವಿದೆ.",
      languageCollections: "ಭಾಷೆಗಳು ಮತ್ತು ಕಲೆಕ್ಷನ್ಸ್",
    },
    writing: {
      eyebrow: "ಬರವಣಿಗೆ",
      title: "ಮೀಡಿಯಂ ಲೇಖನಗಳು",
      copy: "ಬ್ಯಾಕೆಂಡ್ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಸಿಸ್ಟಮ್ ವಿನ್ಯಾಸದ ಕುರಿತು ನನ್ನ ತಾಂತ್ರಿಕ ಲೇಖನಗಳು.",
      readArticle: "ಲೇಖನವನ್ನು ಓದಿ",
    },
    achievements: {
      eyebrow: "ಸಾಧನೆಗಳು",
      title: "ಮೈಲಿಗಲ್ಲುಗಳು",
      copy: "ಕಲಿಕೆ ಮತ್ತು ಅನುಷ್ಠಾನದಲ್ಲಿ ಸ್ಥಿರತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಪ್ರಮಾಣಪತ್ರಗಳು.",
    },
    education: {
      eyebrow: "ಶಿಕ್ಷಣ",
      title: "ಶೈಕ್ಷಣಿಕ ಅಡಿಪಾಯ",
      copy: "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಮೂಲಭೂತ ತತ್ವಗಳು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಇಂಜಿನಿಯರಿಂಗ್.",
    },
    contact: {
      eyebrow: "ಸಂಪರ್ಕ",
      title: "ನಾವು ಒಟ್ಟಾಗಿ ಅರ್ಥಪೂರ್ಣವಾದುದನ್ನು ನಿರ್ಮಿಸೋಣ.",
      copy: "ಬ್ಯಾಕೆಂಡ್ ಸಿಸ್ಟಮ್‌ಗಳು, ಡಿಸ್ಟ್ರಿಬ್ಯೂಟೆಡ್ ಆರ್ಕಿಟೆಕ್ಚರ್ ಮತ್ತು ಉತ್ಪನ್ನ ಇಂಜಿನಿಯರಿಂಗ್ ಅವಕಾಶಗಳಿಗೆ ಸ್ವಾಗತ.",
      resumeBtn: "ರೆಸ್ಯೂಮೆ",
      emailBtn: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
    },
  },

  ta: {
    meta: { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil", bcp47: "ta-IN" },
    nav: {
      about: "அறிமுகம்",
      showcase: "காட்சி",
      experience: "அனுபவம்",
      projects: "திட்டங்கள்",
      skills: "திறன்கள்",
      writing: "எழுத்துக்கள்",
      contact: "தொடர்பு",
    },
    hero: {
      eyebrow: "மென்பொருள் பொறியாளர் போர்ட்ஃபோலியோ",
      name: "ஆதர்ஷ் பாண்டே",
      role: "மென்பொருள் பொறியாளர் | பின்தள வடிவமைப்பு, விநியோகிக்கப்பட்ட அமைப்புகள் & ஜென் ஏஐ",
      location: "பெங்களூரு, கர்நாடகா, இந்தியா",
      summary:
        "அளவிடக்கூடிய, வேகமான மற்றும் நம்பகமான பின்தள அமைப்புகளை உருவாக்குவதில் கவனம் செலுத்தும் பொறியாளர். தற்போது போக்குவரத்து மற்றும் வாகன டெலிமெட்ரி உள்கட்டமைப்பில் பணியாற்றுகிறேன்.",
      pitch:
        "உண்மையான அதிக போக்குவரத்து நெரிசலைத் தாங்கும் உற்பத்தி நிலை ஏபிஐகள், நிகழ்வு பைப்லைன்கள் மற்றும் மொபைல் இணைப்புகளை வடிவமைக்கிறேன்.",
      chips: {
        backend: "பின்தளப் பொறியியல்",
        distributed: "விநியோகிக்கப்பட்ட அமைப்புகள்",
        reliability: "உற்பத்தி தயார்நிலை",
      },
      downloadResume: "சுயவிவரக்குறிப்பு பதிவிறக்குக",
      viewProjects: "திட்டங்களைக் காண்க",
      sessionTitle: "அமர்வு",
      sessionChip: "~/portfolio",
      terminal: {
        init: "போர்ட்ஃபோலியோ துவங்குகிறது... [வெற்றி]",
        roleLine: "பின்தளம் | மொபைல் | ஏஐ பொறியாளர்",
        buildingLine: "அளவிடக்கூடிய அமைப்புகள் மற்றும் நுண்ணறிவு தீர்வுகள்.",
      },
    },
    focusInsights: [
      {
        title: "தொழில்முறை கவனம்",
        description: "பின்தளப் பொறியியல், விநியோகிக்கப்பட்ட சேவைகள் மற்றும் கணினி நம்பகத்தன்மை.",
      },
      {
        title: "பொறியியல் மனப்பான்மை",
        description: "தெளிவான திட்டமிடல், அமைப்பு சிந்தனை மற்றும் நீண்டகால நிரலாக்கம்.",
      },
      {
        title: "அடையாளம்",
        description: "நிலையான செயல்திறன் மற்றும் பிழையற்ற ஏபிஐ வடிவமைப்பு.",
      },
      {
        title: "வேலை செய்யும் விதம்",
        description: "நடைமுறை செயல்படுத்தல் மற்றும் தரமான சேவை வழங்கல்.",
      },
      {
        title: "உள்கட்டமைப்பு வலிமை",
        description: "குபர்நெட்டீஸ் (k3s), கன்டெய்னர்கள், தானியங்கி அளவிடுதல் மற்றும் கண்காணிப்பு.",
      },
      {
        title: "அமைப்பு சிந்தனை",
        description: "ஒத்திசைவற்ற பணிப்பாய்வுகள் மற்றும் விநியோகிக்கப்பட்ட கட்டமைப்புகளின் ஆழமான அறிவு.",
      },
    ],
    about: {
      eyebrow: "அறிமுகம்",
      title: "மக்கள் மைய அணுகுமுறையுடன் நம்பகமான அமைப்புகளை உருவாக்குதல்.",
      copy: "பெரிய அளவில் அதிவேகமான மற்றும் நம்பகமான அமைப்புகளை உருவாக்குவதில் நிபுணத்துவம்.",
      highlights: [
        "அதிக பரிவர்த்தனை போக்குவரத்து சூழலுக்காக ஜாவா ஸ்பிரிங் பூட் ஏபிஐகள் உருவாக்கம்.",
        "எம்விவிஎம் கட்டமைப்பு மற்றும் வன்பொருள் எஸ்டிகே உடன் ஆண்ட்ராய்டு அம்சங்கள்.",
        "காஃப்கா, ஜிஆர்பிசி மற்றும் ஜெடபிள்யூடி பயன்படுத்தி நிகழ்வு சார்ந்த மைக்ரோசர்வீசஸ்.",
        "ஆர்ஏஜி மற்றும் எஃப்ஏஐஎஸ்எஸ் மூலம் ஜென் ஏஐ ஆய்வு.",
      ],
    },
    showcase: {
      eyebrow: "காட்சி",
      title: "பொறியியல் சுயவிவர படங்கள்",
      copy: "கிட்ஹப் மற்றும் லீட்கோட் செயல்பாடுகளின் நேரடி ஸ்னாப்ஷாட்கள்.",
      openProfile: "சுயவிவரத்தைத் திறக்கவும்",
    },
    experience: {
      eyebrow: "அனுபவம்",
      title: "அளவிடக்கூடிய செயல்திறன் தாக்கத்துடன் உற்பத்திப் பொறியியல்.",
      copy: "வலுவான அமைப்புகளை வழங்க நான் பின்தள ஏபிஐகள், தரவு பைப்லைன்கள் மற்றும் கிளவுடில் பணியாற்றுகிறேன்.",
      liveBadge: "நேரலை",
      roles: [
        {
          title: "மென்பொருள் பொறியாளர்",
          company: "அக்சென்ச்சர் (Accenture)",
          location: "பெங்களூரு, இந்தியா",
          period: "ஜூன் 2026 - தற்போது",
          bullets: [
            "கனரக இயந்திரங்களின் தரவுகளை ஆய்வு செய்யும் பெரிய அளவிலான டெலிமெட்ரி அமைப்பில் பணி.",
            "ஜாவா, ஸ்பிரிங் பூட், எம்கியூடிடி, ஏடபிள்யூஎஸ் ஐஓடி கோர் மற்றும் கைனிசிஸ் மேம்பாடு.",
            "தடையில்லா இணைப்பு மற்றும் தரவு சரிபார்ப்புக்கான வலுவான பைப்லைன்கள்.",
          ],
        },
        {
          title: "இணை மென்பொருள் பொறியாளர்",
          company: "அக்சென்ச்சர்",
          location: "பெங்களூரு, இந்தியா",
          period: "அக்டோபர் 2024 - மே 2026",
          bullets: [
            "தினசரி 1,00,000+ பரிவர்த்தனைகளைக் கையாளும் ஜாவா ஸ்பிரிங் பூட் ஏபிஐகளை உருவாக்கினேன்.",
            "ரெடிஸ் தற்காலிக சேமிப்பு மூலம் கட்டண ஏபிஐ தாமதத்தை 35% குறைத்தேன்.",
          ],
        },
        {
          title: "மென்பொருள் உருவாக்குநர் இன்டர்ன்",
          company: "ஆஸ்டெல்லோ இந்தியா",
          location: "தொலைதூரப் பணி",
          period: "மார்ச் 2024 - மே 2024",
          bullets: ["ஃப்ளட்டர் செயலியை ரிவர்பாட் மூலம் எம்விவிஎம் கட்டமைப்பிற்கு மாற்றினேன்."],
        },
        {
          title: "மென்பொருள் உருவாக்குநர் இன்டர்ன்",
          company: "ப்ளூப்எக்ஸ் இந்தியா",
          location: "தொலைதூரப் பணி",
          period: "செப்டம்பர் 2023 - மார்ச் 2024",
          bullets: ["ஃபயர்பேஸ் ஒருங்கிணைப்புடன் பாதுகாப்பான டாக்ஸி முன்பதிவு அமைப்பை உருவாக்கினேன்."],
        },
      ],
    },
    projects: {
      eyebrow: "திட்டங்கள்",
      title: "தனிப்பட்ட முறையில் உருவாக்கப்பட்ட அமைப்புகள்.",
      copy: "உற்பத்தி நிலை சிக்கல்களைத் தீர்க்கும் நடைமுறை திட்டங்கள்.",
      items: [
        {
          name: "டாக்கிங் யூடியூப் (TalkingYoutube)",
          timeline: "செயலில் உள்ள திட்டம்",
          summary: "செம್ಯಾಂಟிக் தேடல் மூலம் யூடியூப் வீடியோக்களுடன் உரையாடும் ஏஐ அமைப்பு.",
          bullets: ["லாங்செயின் மற்றும் எஃப்ஏஐஎஸ்எஸ் மூலம் துல்லியமான தேடல் அமைப்பு."],
        },
        {
          name: "கியூப்ட்ரான்சிட் மைக்ரோசர்வீசஸ்",
          timeline: "உற்பத்தி மாதிரி",
          summary: "குபர்நெட்டீஸ் k3s இல் இயங்கும் போக்குவரத்து பயணச்சீட்டு அமைப்பு.",
          bullets: ["பக்கெட்4ஜே மூலம் வேகக் கட்டுப்பாடு மற்றும் பாதுகாப்பு அம்சங்கள்."],
        },
      ],
    },
    skills: {
      eyebrow: "திறன்கள்",
      title: "பின்தளம், மொபைல் மற்றும் ஏஐ அம்சங்களுக்கான நடைமுறை கருவிகள்.",
      copy: "அளவிடக்கூடிய செயல்திறனை வழங்கும் தொழில்நுட்பங்களில் எனது கவனம் உள்ளது.",
      languageCollections: "மொழிகள் மற்றும் தொகுப்புகள்",
    },
    writing: {
      eyebrow: "எழுத்துக்கள்",
      title: "மீடியம் கட்டுரைகள்",
      copy: "பின்தளப் பொறியியல் மற்றும் கணினி வடிவமைப்பு பற்றிய எனது தொழில்நுட்பக் கட்டுரைகள்.",
      readArticle: "கட்டுரையைப் படிக்கவும்",
    },
    achievements: {
      eyebrow: "சாதனைகள்",
      title: "மைல்கற்கள்",
      copy: "தொடர்ச்சியான கற்றல் மற்றும் செயல்பாட்டை வெளிப்படுத்தும் சான்றிதழ்கள்.",
    },
    education: {
      eyebrow: "கல்வி",
      title: "கல்வி அடித்தளம்",
      copy: "கணினி அறிவியல் அடிப்படைகள் மற்றும் பொறியியல் கல்வி.",
    },
    contact: {
      eyebrow: "தொடர்பு",
      title: "வாருங்கள், பயனுள்ள ஒன்றை உருவாக்குவோம்.",
      copy: "பின்தள அமைப்புகள் மற்றும் விநியோகிக்கப்பட்ட கட்டமைப்புகளில் புதிய வாய்ப்புகளுக்கு வரவேற்கிறேன்.",
      resumeBtn: "சுயவிவரக்குறிப்பு",
      emailBtn: "மின்னஞ்சல் அனுப்பவும்",
    },
  },

  te: {
    meta: { code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu", bcp47: "te-IN" },
    nav: {
      about: "పరిచయం",
      showcase: "షోకేస్",
      experience: "అనుభవం",
      projects: "ప్రాజెక్ట్‌లు",
      skills: "నైపుణ్యాలు",
      writing: "రచనలు",
      contact: "సంప్రదించండి",
    },
    hero: {
      eyebrow: "సాఫ్ట్‌వేర్ ఇంజనీర్ పోర్ట్‌ఫోలియో",
      name: "ఆదర్శ్ పాండే",
      role: "సాఫ్ట్‌వేర్ ఇంజనీర్ | బ్యాకెండ్, డిస్ట్రిబ్యూటెడ్ సిస్టమ్స్ & జెన్ ఏఐ",
      location: "బెంగళూరు, కర్ణాటక, భారతదేశం",
      summary:
        "పెద్ద ఎత్తున వేగవంతమైన మరియు నమ్మదగిన బ్యాకెండ్ సిస్టమ్‌లను నిర్మించడంపై దృష్టి సారించిన ఇంజనీర్. ప్రస్తుతం నేను రవాణా మరియు వెహికల్ టెలిమెట్రీ ఇన్‌ఫ్రాస్ట్రక్చర్‌లో పని చేస్తున్నాను.",
      pitch:
        "నేను అధిక ట్రాఫిక్‌ను సులభంగా నిర్వహించే ప్రొడక్షన్-గ్రేడ్ ఏపీఐలు, ఈవెంట్ పైప్‌లైన్‌లు మరియు మొబైల్ ఇంటిగ్రేషన్‌లను రూపొందిస్తాను.",
      chips: {
        backend: "బ్యాకెండ్ ఇంజనీరింగ్",
        distributed: "డిస్ట్రిబ్యూటెడ్ సిస్టమ్స్",
        reliability: "ప్రొడక్షన్ సంసిద్ధత",
      },
      downloadResume: "రెజ్యూమె డౌన్‌లోడ్ చేయండి",
      viewProjects: "ప్రాజెక్ట్‌లను చూడండి",
      sessionTitle: "సెషన్",
      sessionChip: "~/portfolio",
      terminal: {
        init: "పోర్ట్‌ఫోలియో ప్రారంభమవుతోంది... [విజయవంతం]",
        roleLine: "బ్యాకెండ్ | మొబైల్ | ఏఐ ఇంజనీర్",
        buildingLine: "స్కేలబుల్ సిస్టమ్స్ మరియు ఆధునిక సాంకేతికతల నిర్మాణం.",
      },
    },
    focusInsights: [
      {
        title: "వృత్తిపరమైన లక్ష్యం",
        description: "బ్యాకెండ్ ఇంజనీరింగ్, డిస్ట్రిబ్యూటెడ్ సర్వీసెస్ మరియు సిస్టమ్ విశ్వసనీయత.",
      },
      {
        title: "ఇంజనీరింగ్ ఆలోచన",
        description: "స్పష్టమైన అమలు, సిస్టమ్ థింకింగ్ మరియు సుదీర్ఘకాలం పనిచేసే కోడ్.",
      },
      {
        title: "గుర్తింపు",
        description: "స్థిరమైన ఫీచర్లు మరియు బలమైన ఎడ్జ్-కేస్ హ్యాండ్లింగ్.",
      },
      {
        title: "పనితీరు",
        description: "ఆచరణాత్మక అమలు మరియు నాణ్యమైన ఫలితాల డెలివరీ.",
      },
      {
        title: "ఇన్‌ఫ్రాస్ట్రక్చర్ బలం",
        description: "కుబెర్నెటిస్ (k3s), కంటెయినరైజేషన్, ఆటోస్కేలింగ్ మరియు మానిటరింగ్.",
      },
      {
        title: "సిస్టమ్ థింకింగ్",
        description: "అసమకాలిక వర్క్‌ఫ్లోలు మరియు డిస్ట్రిబ్యూటెడ్ ఆర్కిటెక్చర్‌ల లోతైన పరిజ్ఞానం.",
      },
    ],
    about: {
      eyebrow: "పరిచయం",
      title: "ప్రజల-కేంద్రీకృత విధానంతో విశ్వసనీయ ఉత్పత్తుల నిర్మాణం.",
      copy: "పెద్ద ఎత్తున వేగవంతమైన మరియు నమ్మదగిన వ్యవస్థలను నిర్మించడంలో నిపుణత కలిగిన బ్యాకెండ్ ఇంజనీర్.",
      highlights: [
        "అధిక ట్రాఫిక్ గల రవాణా వ్యవస్థల కోసం జావా స్ప్రింగ్ బూట్ ఏపీఐలను అభివృద్ధి చేసి నిర్వహించాను.",
        "ఎంవీవీఎం ఆర్కిటెక్చర్‌తో ఆండ్రాయిడ్ యాప్ ఫీచర్లు మరియు హార్డ్‌వేర్ ఎస్‌డీకేల అనుసంధానం.",
        "కాఫ్కా, జీఆర్‌పీసీ మరియు జేడబ్ల్యూటీలతో ఈవెంట్-ఆధారిత మైక్రోసర్వీసెస్ రూపకల్పన.",
        "ఆర్‌ఏజీ పైప్‌లైన్, ఎఫ్‌ఏఐఎస్‌ఎస్ వెక్టర్ సెర్చ్‌తో జెన్ ఏఐ పరిశోధన.",
      ],
    },
    showcase: {
      eyebrow: "షోకేస్",
      title: "ఇంజనీరింగ్ ప్రొఫైల్ స్నాప్‌షాట్‌లు",
      copy: "గిట్‌హబ్ మరియు లీట్‌కోడ్ కార్యకలాపాల నుండి ప్రత్యక్ష స్నాప్‌షాట్‌లు.",
      openProfile: "ప్రొఫైల్ తెరవండి",
    },
    experience: {
      eyebrow: "అనుభవం",
      title: "కొలవగల పనితీరు ప్రభావంతో ప్రొడక్షన్ ఇంజనీరింగ్.",
      copy: "బలమైన సిస్టమ్‌లను అందించడానికి నేను బ్యాకెండ్ ఏపీఐలు, డేటా పైప్‌లైన్‌లు మరియు క్లౌడ్‌లో పని చేస్తాను.",
      liveBadge: "లైవ్",
      roles: [
        {
          title: "సాఫ్ట్‌వేర్ ఇంజనీర్",
          company: "యాక్సెంట్చర్ (Accenture)",
          location: "బెంగళూరు, భారతదేశం",
          period: "జూన్ 2026 - ప్రస్తుతం",
          bullets: [
            "భారీ యంత్రాల నుండి డేటాను విశ్లేషించే పెద్ద ఎత్తున ఫ్లీట్ టెలిమెట్రీ వ్యవస్థలో పని.",
            "జావా, స్ప్రింగ్ బూట్, ఎంక్యూటీటీ, ఏడబ్ల్యూఎస్ ఐఓటీ కోర్ మరియు కైనెసిస్‌లలో సహకారం.",
            "అంతరాయం లేని కనెక్టివిటీ మరియు డేటా ధృవీకరణ కోసం బలమైన పైప్‌లైన్‌ల నిర్మాణం.",
          ],
        },
        {
          title: "అసోసియేట్ సాఫ్ట్‌వేర్ ఇంజనీర్",
          company: "యాక్సెంట్చర్",
          location: "బెంగళూరు, భారతదేశం",
          period: "అక్టోబర్ 2024 - మే 2026",
          bullets: [
            "రోజుకు 1,00,000+ రవాణా లావాదేవీలను ప్రాసెస్ చేసే జావా స్ప్రింగ్ బూట్ ఏపీఐలను నిర్మించాను.",
            "రెడిస్ క్యాషింగ్ ద్వారా చెల్లింపు ఏపీఐ ఆలస్యాన్ని 35% తగ్గించాను.",
          ],
        },
        {
          title: "సాఫ్ట్‌వేర్ డెవలప్‌మెంట్ ఇంజనీర్ ఇంటర్న్",
          company: "ఓస్టెల్లో ఇండియా",
          location: "రిమోట్",
          period: "మార్చి 2024 - మే 2024",
          bullets: ["ఫ్లట్టర్ యాప్‌ను రివర్‌పాడ్ స్టేట్ మేనేజ్‌మెంట్‌తో ఎంవీవీఎంకి రీ-ఆర్కిటెక్ట్ చేశాను."],
        },
        {
          title: "సాఫ్ట్‌వేర్ డెవలప్‌మెంట్ ఇంజనీర్ ఇంటర్న్",
          company: "బ్లూప్‌ఎక్స్ ఇండియా",
          location: "రిమోట్",
          period: "సెప్టెంబర్ 2023 - మార్చి 2024",
          bullets: ["ఫైర్‌బేస్ అనుసంధానంతో సురక్షితమైన క్యాబ్-బుకింగ్ వర్క్‌ఫ్లోను రూపొందించాను."],
        },
      ],
    },
    projects: {
      eyebrow: "ప్రాజెక్ట్‌లు",
      title: "స్వతంత్రంగా నిర్మించిన వ్యవస్థలు.",
      copy: "నిజమైన ఉత్పత్తి సవాళ్లను ప్రతిబింబించే ప్రాజెక్ట్‌లు.",
      items: [
        {
          name: "టాకింగ్ యూట్యూబ్ (TalkingYoutube)",
          timeline: "యాక్టివ్ ప్రాజెక్ట్",
          summary: "సెమాంటిక్ శోధన మరియు ఆర్‌ఏజీ ద్వారా యూట్యూబ్ వీడియోలతో సంభాషించే ఏఐ సిస్టమ్.",
          bullets: ["లాంగ్‌చెయిన్ మరియు ఎఫ్‌ఏఐఎస్‌ఎస్ ఉపయోగించి ఖచ్చితమైన వీడియో శోధన వ్యవస్థ."],
        },
        {
          name: "క్యూబ్‌ట్రాన్సిట్ మైక్రోసర్వీసెస్",
          timeline: "ప్రొడక్షన్ డెమో",
          summary: "కుబెర్నెటిస్ k3s లో నడిచే రవాణా టికెటింగ్ మరియు ధృవీకరణ వేదిక.",
          bullets: ["బకెట్4జే మరియు రెసిలియన్స్4జే ద్వారా రేట్ లిమిటింగ్ మరియు రక్షణ చర్యలు."],
        },
      ],
    },
    skills: {
      eyebrow: "నైపుణ్యాలు",
      title: "బ్యాకెండ్, మొబైల్ మరియు ఏఐ ఫీచర్ల కోసం ఆచరణాత్మక టూల్‌కిట్.",
      copy: "కొలవగల పనితీరును అందించే సాంకేతికతలపైనే నా దృష్టి.",
      languageCollections: "భాషలు మరియు కలెక్షన్స్",
    },
    writing: {
      eyebrow: "రచనలు",
      title: "మీడియం కథనాలు",
      copy: "బ్యాకెండ్ ఇంజనీరింగ్ మరియు సిస్టమ్ డిజైన్‌పై నా సాంకేతిక కథనాలు.",
      readArticle: "కథనాన్ని చదవండి",
    },
    achievements: {
      eyebrow: "విజయాలు",
      title: "మైలురాళ్ళు",
      copy: "నిరంతర అభ్యాసం మరియు కృషిని సూచించే ధృవీకరణ పత్రాలు.",
    },
    education: {
      eyebrow: "విద్య",
      title: "విద్యా పునాది",
      copy: "కంప్యూటర్ సైన్స్ ప్రాథమిక అంశాలు మరియు ఇంజనీరింగ్ కోర్సులు.",
    },
    contact: {
      eyebrow: "సంప్రదించండి",
      title: "రండి, అర్థవంతమైనదాన్ని నిర్మిద్దాం.",
      copy: "బ్యాకెండ్ సిస్టమ్స్ మరియు డిస్ట్రిబ్యూటెడ్ ఆర్కిటెక్చర్‌లో కొత్త అవకాశాల కోసం స్వాగతం.",
      resumeBtn: "రెజ్యూమె",
      emailBtn: "ఈమెయిల్ పంపండి",
    },
  },

  ml: {
    meta: { code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam", bcp47: "ml-IN" },
    nav: {
      about: "ആമുഖം",
      showcase: "ഷോകേസ്",
      experience: "പരിചയം",
      projects: "പ്രോജക്ടുകൾ",
      skills: "കഴിവുകൾ",
      writing: "ലേഖനങ്ങൾ",
      contact: "ബന്ധപ്പെടുക",
    },
    hero: {
      eyebrow: "സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ പോർട്ട്‌ഫോളിയോ",
      name: "ആദർശ് പാണ്ഡെ",
      role: "സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ | ബാക്കെൻഡ്, ഡിസ്ട്രിബ്യൂട്ടഡ് സിസ്റ്റംസ് & ജെൻ എഐ",
      location: "ബെംഗളൂരു, കർണാടക, ഇന്ത്യ",
      summary:
        "ഉയർന്ന കാര്യക്ഷമതയും വിശ്വാസ്യതയുമുള്ള ബാക്കെൻഡ് സിസ്റ്റങ്ങൾ നിർമ്മിക്കുന്നതിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന എഞ്ചിനീയർ. നിലവിൽ ട്രാൻസിറ്റ്, വെഹിക്കിൾ ടെലിമെട്രി ഇൻഫ്രാസ്ട്രക്ചറിൽ പ്രവർത്തിക്കുന്നു.",
      pitch:
        "യഥാർത്ഥ ട്രാഫിക്കിനെ കൈകാര്യം ചെയ്യുന്ന പ്രൊഡക്ഷൻ-ഗ്രേഡ് എപിഐകൾ, ഇവന്റ് പൈപ്പ്‌ലൈനുകൾ, മൊബൈൽ ഇന്റഗ്രേഷനുകൾ എന്നിവ ഞാൻ രൂപകൽപ്പന ചെയ്യുന്നു.",
      chips: {
        backend: "ബാക്കെൻഡ് എഞ്ചിനീയറിംഗ്",
        distributed: "ഡിസ്ട്രിബ്യൂട്ടഡ് സിസ്റ്റംസ്",
        reliability: "പ്രൊഡക്ഷൻ സന്നദ്ധത",
      },
      downloadResume: "റെസ്യൂം ഡൗൺലോഡ് ചെയ്യുക",
      viewProjects: "പ്രോജക്ടുകൾ കാണുക",
      sessionTitle: "സെഷൻ",
      sessionChip: "~/portfolio",
      terminal: {
        init: "പോർട്ട്‌ഫോളിയോ ആരംഭിക്കുന്നു... [വിജയം]",
        roleLine: "ബാക്കെൻഡ് | മൊബൈൽ | എഐ എഞ്ചിനീയർ",
        buildingLine: "സ്കേലബിൾ സിസ്റ്റങ്ങളും നൂതന സാങ്കേതികവിദ്യകളും.",
      },
    },
    focusInsights: [
      {
        title: "തൊഴിൽപരമായ ലക്ഷ്യം",
        description: "ബാക്കെൻഡ് എഞ്ചിനീയറിംഗ്, ഡിസ്ട്രിബ്യൂട്ടഡ് സേവനങ്ങൾ, സിസ്റ്റം വിശ്വാസ്യത.",
      },
      {
        title: "എഞ്ചിനീയറിംഗ് മനോഭാവം",
        description: "വ്യക്തത, സിസ്റ്റം ചിന്ത, ദീർഘകാല കോഡിംഗ്.",
      },
      {
        title: "അംഗീകാരം",
        description: "സുസ്ഥിരമായ ഫീച്ചറുകളും പിഴവുകളില്ലാത്ത എപിഐ ഡിസൈനും.",
      },
      {
        title: "പ്രവർത്തന ശൈലി",
        description: "പ്രായോഗിക നിർവ്വഹണവും ഗുണനിലവാരമുള്ള സേവനവും.",
      },
      {
        title: "ഇൻഫ്രാസ്ട്രക്ചർ കരുത്ത്",
        description: "കുബർനെറ്റിസ് (k3s), കണ്ടെയ്നറൈസേഷൻ, ഓട്ടോസ്കെയിലിംഗ്, മോണിറ്ററിംഗ്.",
      },
      {
        title: "സിസ്റ്റം ചിന്ത",
        description: "അസിൻക്രണസ് വർക്ക്ഫ്ലോകളെക്കുറിച്ചും ബാക്കെൻഡ് ആർക്കിടെക്ചറുകളെക്കുറിച്ചുമുള്ള ആഴത്തിലുള്ള അറിവ്.",
      },
    ],
    about: {
      eyebrow: "ആമുഖം",
      title: "മനുഷ്യകേന്ദ്രീകൃത സമീപനത്തോടെ വിശ്വസനീയമായ ഉൽപ്പന്നങ്ങൾ നിർമ്മിക്കുന്നു.",
      copy: "വലിയ തോതിൽ അതിവേഗവും വിശ്വസനീയവുമായ സംവിധാനങ്ങൾ നിർമ്മിക്കുന്നതിൽ വിദഗ്ദ്ധനായ ബാക്കെൻഡ് എഞ്ചിനീയർ.",
      highlights: [
        "ഉയർന്ന ഇടപാടുകളുള്ള ട്രാൻസിറ്റ് പരിതസ്ഥിതിക്കായി ജാവ സ്പ്രിംഗ് ബൂട്ട് എപിഐകൾ നിർമ്മിച്ചു.",
        "എംവിവിഎം ആർക്കിടെക്ചറും ഹാർഡ്‌വെയർ എസ്ഡികെയും ഉപയോഗിച്ച് ആൻഡ്രോയിഡ് ആപ്പ് ഫീച്ചറുകൾ.",
        "കാഫ്ക, ജിആർപിസി, ജെഡബ്ല്യുടി എന്നിവ ഉപയോഗിച്ച് ഇവന്റ്-അധിഷ്ഠിത മൈക്രോസർവീസുകൾ.",
        "ആർഎജി പൈപ്പ്‌ലൈനും എഫ്എഐഎസ്എസ് വെക്റ്റർ തിരയലും ഉപയോഗിച്ച് ജെൻ എഐ പര്യവേക്ഷണം.",
      ],
    },
    showcase: {
      eyebrow: "ഷോകേസ്",
      title: "എഞ്ചിനീയറിംഗ് പ്രൊഫൈൽ സ്നാപ്പ്ഷോട്ടുകൾ",
      copy: "ഗിറ്റ്ഹബ്, ലീറ്റ്കോഡ് പ്രവർത്തനങ്ങളിൽ നിന്നുള്ള തത്സമയ വിവരങ്ങൾ.",
      openProfile: "പ്രൊഫൈൽ തുറക്കുക",
    },
    experience: {
      eyebrow: "പരിചയം",
      title: "അളക്കാവുന്ന പ്രകടന സ്വാധീനമുള്ള പ്രൊഡക്ഷൻ എഞ്ചിനീയറിംഗ്.",
      copy: "ശക്തമായ സിസ്റ്റങ്ങൾ വിതരണം ചെയ്യുന്നതിനായി ഞാൻ ബാക്കെൻഡ് എപിഐകളിലും ക്ലൗഡിലും പ്രവർത്തിക്കുന്നു.",
      liveBadge: "തത്സമയം",
      roles: [
        {
          title: "സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ",
          company: "ആക്‌സെഞ്ചർ (Accenture)",
          location: "ബെംഗളൂരു, ഇന്ത്യ",
          period: "ജൂൺ 2026 - നിലവിൽ",
          bullets: [
            "വൻകിട യന്ത്രങ്ങളിൽ നിന്നുള്ള വിവരങ്ങൾ വിശകലനം ചെയ്യുന്ന ടെലിമെട്രി സിസ്റ്റത്തിൽ ജോലി.",
            "ജാവ, സ്പ്രിംഗ് ബൂട്ട്, എംക്യുടിടി, എഡബ്ല്യുഎസ് ഐഒടി കോർ, കൈനെസിസ് എന്നിവയിലെ വികസനം.",
            "ഡാറ്റാ പരിശോധനയ്ക്കും തടസ്സമില്ലാത്ത കണക്റ്റിവിറ്റിക്കുമുള്ള ശക്തമായ പൈപ്പ്‌ലൈനുകൾ.",
          ],
        },
        {
          title: "അസോസിയേറ്റ് സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ",
          company: "ആക്‌സെഞ്ചർ",
          location: "ബെംഗളൂരു, ഇന്ത്യ",
          period: "ഒക്ടോബർ 2024 - മെയ് 2026",
          bullets: [
            "പ്രതിദിനം 1,00,000+ ഇടപാടുകൾ പ്രോസസ്സ് ചെയ്യുന്ന ജാവ സ്പ്രിംഗ് ബൂട്ട് എപിഐകൾ നിർമ്മിച്ചു.",
            "റെഡിസ് കാഷിംഗ് വഴി പേയ്‌മെന്റ് എപിഐ ലേറ്റൻസി 35% കുറച്ചു.",
          ],
        },
        {
          title: "സോഫ്റ്റ്‌വെയർ ഡെവലപ്പർ ഇന്റേൺ",
          company: "ഓസ്റ്റെല്ലോ ഇന്ത്യ",
          location: "റിമോട്ട്",
          period: "മാർച്ച് 2024 - മെയ് 2024",
          bullets: ["ഫ്ലട്ടർ ആപ്പ് റിവർപോഡ് സ്റ്റേറ്റ് മാനേജ്‌മെന്റിലേക്ക് പരിവർത്തനം ചെയ്തു."],
        },
        {
          title: "സോഫ്റ്റ്‌വെയർ ഡെവലപ്പർ ഇന്റേൺ",
          company: "ബ്ലൂപ്എക്സ് ഇന്ത്യ",
          location: "റിമോട്ട്",
          period: "സെപ്റ്റംബർ 2023 - മാർച്ച് 2024",
          bullets: ["ഫയർബേസ് ഉപയോഗിച്ച് സുരക്ഷിതമായ ക്യാബ് ബുക്കിംഗ് വർക്ക്ഫ്ലോ നിർമ്മിച്ചു."],
        },
      ],
    },
    projects: {
      eyebrow: "പ്രോജക്ടുകൾ",
      title: "സ്വതന്ത്രമായി വികസിപ്പിച്ച സിസ്റ്റങ്ങൾ.",
      copy: "യഥാർത്ഥ പ്രൊഡക്ഷൻ വെല്ലുവിളികൾ പ്രതിഫലിപ്പിക്കുന്ന പ്രോജക്ടുകൾ.",
      items: [
        {
          name: "ടോക്കിംഗ് യൂട്യൂബ് (TalkingYoutube)",
          timeline: "സജീവ പ്രോജക്റ്റ്",
          summary: "സെമാന്റിക് തിരയലിലൂടെ യൂട്യൂബ് വീഡിയോകളുമായി സംവദിക്കുന്ന എഐ സിസ്റ്റം.",
          bullets: ["ലാംഗ്ചെയിനും എഫ്എഐഎസ്എസും ഉപയോഗിച്ചുള്ള കൃത്യമായ വീഡിയോ തിരയൽ സിസ്റ്റം."],
        },
        {
          name: "ക്യൂബ്‌ട്രാൻസിറ്റ് മൈക്രോസർവീസസ്",
          timeline: "പ്രൊഡക്ഷൻ ഡെമോ",
          summary: "കുബർനെറ്റിസ് k3s-ൽ പ്രവർത്തിക്കുന്ന ട്രാൻസിറ്റ് ടിക്കറ്റിംഗ് പ്ലാറ്റ്‌ഫോം.",
          bullets: ["ബക്കറ്റ്4ജെ വഴി റേറ്റ് ലിമിറ്റിംഗും സംരക്ഷണ സംവിധാനങ്ങളും."],
        },
      ],
    },
    skills: {
      eyebrow: "കഴിവുകൾ",
      title: "ബാക്കെൻഡ്, മൊബൈൽ, എഐ സവിശേഷതകൾക്കായുള്ള ടൂൾകിറ്റ്.",
      copy: "അളക്കാവുന്ന പ്രകടനം നൽകുന്ന സാങ്കേതികവിദ്യകളിലാണ് എന്റെ ശ്രദ്ധ.",
      languageCollections: "ഭാഷകളും ശേഖരങ്ങളും",
    },
    writing: {
      eyebrow: "ലേഖനങ്ങൾ",
      title: "മീഡിയം ലേഖനങ്ങൾ",
      copy: "ബാക്കെൻഡ് എഞ്ചിനീയറിംഗിനെക്കുറിച്ചുള്ള എന്റെ സാങ്കേതിക ലേഖനങ്ങൾ.",
      readArticle: "ലേഖനം വായിക്കുക",
    },
    achievements: {
      eyebrow: "നേട്ടങ്ങൾ",
      title: "നാഴികക്കല്ലുകൾ",
      copy: "തുടർച്ചയായ പഠനവും പ്രവർത്തന മികവും തെളിയിക്കുന്ന സർട്ടിഫിക്കേഷനുകൾ.",
    },
    education: {
      eyebrow: "വിദ്യാഭ്യാസം",
      title: "വിദ്യാഭ്യാസ അടിത്തറ",
      copy: "കമ്പ്യൂട്ടർ സയൻസ് അടിസ്ഥാന തത്വങ്ങളും എഞ്ചിനീയറിംഗ് കോഴ്സുകളും.",
    },
    contact: {
      eyebrow: "ബന്ധപ്പെടുക",
      title: "നമുക്ക് അർത്ഥവത്തായ ഒന്ന് നിർമ്മിക്കാം.",
      copy: "ബാക്കെൻഡ് സിസ്റ്റങ്ങളിലും ഡിസ്ട്രിബ്യൂട്ടഡ് ആർക്കിടെക്ചറിലുമുള്ള പുതിയ അവസരങ്ങളെ സ്വാഗതം ചെയ്യുന്നു.",
      resumeBtn: "റെസ്യൂം",
      emailBtn: "ഇമെയിൽ അയക്കുക",
    },
  },

  mr: {
    meta: { code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari", bcp47: "mr-IN" },
    nav: {
      about: "परिचय",
      showcase: "शोकेस",
      experience: "अनुभव",
      projects: "प्रकल्प",
      skills: "कौशल्ये",
      writing: "लेखन",
      contact: "संपर्क",
    },
    hero: {
      eyebrow: "सॉफ्टवेअर इंजिनिअर पोर्टफोलिओ",
      name: "आदर्श पाण्डेय",
      role: "सॉफ्टवेअर इंजिनिअर | बॅकएंड, डिस्ट्रिब्युटेड सिस्टीम्स आणि जनरेटिव्ह एआय",
      location: "बंगळुरू, कर्नाटक, भारत",
      summary:
        "मोठ्या प्रमाणावर वेगवान आणि विश्वासार्ह बॅकएंड सिस्टीम तयार करणारे इंजिनिअर. सध्या मी ट्रान्झिट आणि व्हेईकल टेलिमेट्री इन्फ्रास्ट्रक्चरवर कार्यरत आहे.",
      pitch:
        "मी प्रॉडक्शन-ग्रेड एपीआय, इव्हेंट पाइपलाइन आणि मोबाइल इंटिग्रेशन डिझाइन करतो जे जास्त रहदारी स्थिरपणे हाताळतात.",
      chips: {
        backend: "बॅकएंड इंजिनिअरिंग",
        distributed: "डिस्ट्रिब्युटेड सिस्टीम्स",
        reliability: "प्रॉडक्शन सज्जता",
      },
      downloadResume: "बायोडेटा डाउनलोड करा",
      viewProjects: "प्रकल्प पहा",
      sessionTitle: "सत्र",
      sessionChip: "~/portfolio",
      terminal: {
        init: "पोर्टफोलिओ सुरू होत आहे... [यशस्वी]",
        roleLine: "बॅकएंड | मोबाइल | एआय इंजिनिअर",
        buildingLine: "स्केलेबल सिस्टीम आणि आधुनिक उपायांची निर्मिती.",
      },
    },
    focusInsights: [
      {
        title: "व्यावसायिक उद्दिष्ट",
        description: "बॅकएंड इंजिनिअरिंग, डिस्ट्रिब्युटेड सर्व्हिसेस आणि प्रॉडक्शन विश्वासार्हता.",
      },
      {
        title: "इंजिनिअरिंग दृष्टिकोन",
        description: "स्पष्टता, सिस्टीम थिंकिंग आणि दीर्घकाळ टिकणारा कोड.",
      },
      {
        title: "ओळख",
        description: "स्थिर कार्यक्षमता आणि मजबूत एज-केस हाताळणी.",
      },
      {
        title: "कार्यशैली",
        description: "व्यावहारिक अंमलबजावणी आणि दर्जेदार सेवा वितरण.",
      },
      {
        title: "इन्फ्रास्ट्रक्चर सामर्थ्य",
        description: "कुबरनेट्स (k3s), कंटेनरायझेशन, ऑटो-स्केलिंग आणि सिस्टीम मॉनिटरिंग.",
      },
      {
        title: "सिस्टीम थिंकिंग",
        description: "असिंक्रोनस वर्कफ्लो आणि डिस्ट्रिब्युटेड आर्किटेक्चरचे सखोल ज्ञान.",
      },
    ],
    about: {
      eyebrow: "परिचय",
      title: "मानव-केंद्रित दृष्टिकोनातून विश्वासार्ह उत्पादनांची निर्मिती.",
      copy: "मोठ्या प्रमाणावर वेगवान आणि विश्वासार्ह सिस्टीम तयार करण्यासाठी समर्पित बॅकएंड इंजिनिअर.",
      highlights: [
        "उच्च रहदारी असलेल्या ट्रान्झिट वातावरणासाठी जावा स्प्रिंग बूट एपीआय तयार केले.",
        "एमव्हीव्हीएम आर्किटेक्चरसह अँड्रॉइड ॲप वैशिष्ट्ये आणि हार्डवेअर एसडीके एकत्रीकरण.",
        "काफ्का, जीआरपीसी आणि जेडब्ल्यूटीसह इव्हेंट-चालित मायक्रो सर्व्हिसेस.",
        "आरएजी पाइपलाइन आणि एफएआयएसएस व्हेक्टर शोधासह जेन एआय एक्सप्लोरेशन.",
      ],
    },
    showcase: {
      eyebrow: "शोकेस",
      title: "इंजिनिअरिंग प्रोफाइल स्नॅपशॉट्स",
      copy: "गिटहब आणि लीटकोड क्रियाकलापांचे थेट स्नॅपशॉट्स.",
      openProfile: "प्रोफाइल उघडा",
    },
    experience: {
      eyebrow: "अनुभव",
      title: "मोजता येण्याजोग्या कार्यप्रदर्शन प्रभावासह प्रॉडक्शन इंजिनिअरिंग.",
      copy: "मजबूत प्रणाली तयार करण्यासाठी मी बॅकएंड एपीआय, डेटा पाइपलाइन आणि क्लाउडवर काम करतो.",
      liveBadge: "सक्रिय",
      roles: [
        {
          title: "सॉफ्टवेअर इंजिनिअर",
          company: "अ‍ॅक्सेंचर (Accenture)",
          location: "बंगळुरू, भारत",
          period: "जून २०२६ - सध्या",
          bullets: [
            "जड मशिनरीमधून डेटा विश्लेषण करणाऱ्या मोठ्या प्रमाणातील फ्लीट टेलिमेट्री सिस्टीमवर काम.",
            "जावा, स्प्रिंग बूट, एमक्यूटीटी, एडब्ल्यूएस आयओटी कोर आणि कायनेसिसमध्ये विकास.",
            "डेटा प्रमाणीकरण आणि अखंड कनेक्टिव्हिटीसाठी लवचिक प्रवाह तयार करणे.",
          ],
        },
        {
          title: "असोसिएट सॉफ्टवेअर इंजिनिअर",
          company: "अ‍ॅक्सेंचर",
          location: "बंगळुरू, भारत",
          period: "ऑक्टोबर २०२४ - मे २०२६",
          bullets: [
            "दररोज १,००,०००+ ट्रान्झिट व्यवहार हाताळणारे जावा स्प्रिंग बूट एपीआय विकसित केले.",
            "रेडिस कॅशिंगद्वारे पेमेंट एपीआय लेटन्सी ३५% कमी केली.",
          ],
        },
        {
          title: "सॉफ्टवेअर डेव्हलपमेंट इंजिनिअर इंटर्न",
          company: "ऑस्टेलो इंडिया",
          location: "रिमोट",
          period: "मार्च २०२४ - मे २०२४",
          bullets: ["फ्लटर ॲपला रिव्हरपॉड स्टेट मॅनेजमेंटसह एमव्हीव्हीएममध्ये पुनर्रचित केले."],
        },
        {
          title: "सॉफ्टवेअर डेव्हलपमेंट इंजिनिअर इंटर्न",
          company: "ब्लूपएक्स इंडिया",
          location: "रिमोट",
          period: "सप्टेंबर २०२३ - मार्च २०२४",
          bullets: ["फायरबेस एकत्रीकरणासह सुरक्षित कॅब-बुकिंग वर्कफ्लो तयार केला."],
        },
      ],
    },
    projects: {
      eyebrow: "प्रकल्प",
      title: "स्वतंत्रपणे तयार केलेल्या प्रणाली.",
      copy: "वास्तविक उत्पादनातील आव्हाने हाताळणारे प्रकल्प.",
      items: [
        {
          name: "टॉकिंग यूट्यूब (TalkingYoutube)",
          timeline: "सक्रिय प्रकल्प",
          summary: "सिमेंटिक शोध आणि आरएजी द्वारे यूट्यूब व्हिडिओंसोबत संवाद साधणारी एआय प्रणाली.",
          bullets: ["लँगचेन आणि एफएआयएसएस सह अचूक व्हिडिओ शोध पाइपलाइन."],
        },
        {
          name: "क्यूबट्रान्झिट मायक्रो सर्व्हिसेस",
          timeline: "प्रॉडक्शन डेमो",
          summary: "कुबरनेट्स k3s वर चालणारे ट्रान्झिट तिकीट प्लॅटफॉर्म.",
          bullets: ["बकेट4जे द्वारे दर नियंत्रण आणि सुरक्षा उपाय."],
        },
      ],
    },
    skills: {
      eyebrow: "कौशल्ये",
      title: "बॅकएंड, मोबाइल आणि एआय वैशिष्ट्यांसाठी व्यावहारिक टूलकिट.",
      copy: "मोजता येण्याजोगे कार्यप्रदर्शन देणाऱ्या तंत्रज्ञानावर माझा भर आहे.",
      languageCollections: "भाषा आणि संग्रह",
    },
    writing: {
      eyebrow: "लेखन",
      title: "मीडियम लेख",
      copy: "बॅकएंड इंजिनिअरिंग आणि सिस्टीम डिझाइनवरील माझे तांत्रिक लेख.",
      readArticle: "लेख वाचा",
    },
    achievements: {
      eyebrow: "यश",
      title: "महत्त्वाचे टप्पे",
      copy: "सातत्यपूर्ण शिक्षण आणि अंमलबजावणी दर्शवणारी प्रमाणपत्रे.",
    },
    education: {
      eyebrow: "शिक्षण",
      title: "शैक्षणिक पाया",
      copy: "संगणक शास्त्राची मूलभूत तत्त्वे आणि इंजिनिअरिंग अभ्यासक्रम.",
    },
    contact: {
      eyebrow: "संपर्क",
      title: "चला, एकत्र मिळून काहीतरी अर्थपूर्ण बनवूया.",
      copy: "बॅकएंड सिस्टीम आणि डिस्ट्रिब्युटेड आर्किटेक्चरमधील नवीन संधींसाठी स्वागत आहे.",
      resumeBtn: "बायोडेटा",
      emailBtn: "ईमेल पाठवा",
    },
  },

  bn: {
    meta: { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali", bcp47: "bn-IN" },
    nav: {
      about: "পরিচিতি",
      showcase: "শোকেস",
      experience: "অভিজ্ঞতা",
      projects: "প্রকল্প",
      skills: "দক্ষতা",
      writing: "লেখালেখি",
      contact: "যোগাযোগ",
    },
    hero: {
      eyebrow: "সফটওয়্যার ইঞ্জিনিয়ার পোর্টফোলিও",
      name: "আদর্শ পান্ডে",
      role: "সফটওয়্যার ইঞ্জিনিয়ার | ব্যাকএন্ড, ডিস্ট্রিবিউটেড সিস্টেমস এবং জেন এআই",
      location: "বেঙ্গালুরু, কর্ণাটক, ভারত",
      summary:
        "বৃহৎ পরিসরে দ্রুত ও নির্ভরযোগ্য ব্যাকএন্ড সিস্টেম তৈরিতে নিবেদিত একজন ইঞ্জিনিয়ার। বর্তমানে ট্রানজিট এবং ভেহিকল টেলিমেট্রি পরিকাঠামোয় কাজ করছি।",
      pitch:
        "আমি প্রোডাকশন-গ্রেড এপিআই, ইভেন্ট পাইপলাইন এবং মোবাইল ইন্টিগ্রেশন ডিজাইন করি যা ভারী ট্রাফিককে দৃঢ়ভাবে পরিচালনা করে।",
      chips: {
        backend: "ব্যাকএন্ড ইঞ্জিনিয়ারিং",
        distributed: "ডিস্ট্রিবিউটেড সিস্টেমস",
        reliability: "প্রোডাকশন প্রস্তুতি",
      },
      downloadResume: "রিজিউমে ডাউনলোড করুন",
      viewProjects: "প্রকল্পগুলো দেখুন",
      sessionTitle: "সেশন",
      sessionChip: "~/portfolio",
      terminal: {
        init: "পোর্টফোলিও চালু হচ্ছে... [সফল]",
        roleLine: "ব্যাকএন্ড | মোবাইল | এআই ইঞ্জিনিয়ার",
        buildingLine: "স্কেলেবল সিস্টেম এবং বুদ্ধিদীপ্ত সমাধান তৈরি।",
      },
    },
    focusInsights: [
      {
        title: "পেশাদার লক্ষ্য",
        description: "ব্যাকএন্ড ইঞ্জিনিয়ারিং, ডিস্ট্রিবিউটেড সার্ভিসেস এবং সিস্টেমের স্থায়িত্ব।",
      },
      {
        title: "ইঞ্জিনিয়ারিং মানসিকতা",
        description: "স্পষ্ট বাস্তবায়ন, সিস্টেম চিন্তাভাবনা এবং টেকসই কোড।",
      },
      {
        title: "পরিচিতি",
        description: "স্থিতিশীল ফিচার তৈরি এবং নির্ভুল এজ-কেস হ্যান্ডলিং।",
      },
      {
        title: "কাজের ধারা",
        description: "বাস্তবধর্মী সম্পাদন এবং মানসম্মত ফলাফল প্রদান।",
      },
      {
        title: "পরিকাঠামো শক্তি",
        description: "কুবারনেটিস (k3s), কন্টেইনারাইজেশন, অটো-স্কেলিং এবং সিস্টেম পর্যবেক্ষণ।",
      },
      {
        title: "সিস্টেম থিঙ্কিং",
        description: "অ্যাসিঙ্ক্রোনাস ওয়ার্কফ্লো এবং ব্যাকএন্ড আর্কিটেকচারের গভীর জ্ঞান।",
      },
    ],
    about: {
      eyebrow: "পরিচিতি",
      title: "মানব-কেন্দ্রিক দৃষ্টিভঙ্গির মাধ্যমে নির্ভরযোগ্য পণ্য তৈরি।",
      copy: "বৃহৎ পরিসরে দ্রুত এবং নির্ভরযোগ্য সিস্টেম তৈরিতে প্রতিশ্রুতিবদ্ধ ব্যাকএন্ড ইঞ্জিনিয়ার।",
      highlights: [
        "উচ্চ ট্রাফিকযুক্ত ট্রানজিট পরিবেশের জন্য জাভা স্প্রিং বুট এপিআই তৈরি ও পরিচালনা।",
        "এমভিভিএম আর্কিটেকচার এবং হার্ডওয়্যার এসডিকে সহ অ্যান্ড্রয়েড অ্যাপ ফিচার সরবরাহ।",
        "কাফকা, জিআরপিসি এবং জেডব্লিউটি সহ ইভেন্ট-চালিত মাইক্রোসার্ভিসেস ডিজাইন।",
        "আরএজি পাইপলাইন এবং এফএআইএসএস ভেক্টর অনুসন্ধানের মাধ্যমে জেন এআই গবেষণা।",
      ],
    },
    showcase: {
      eyebrow: "শোকেস",
      title: "ইঞ্জিনিয়ারিং প্রোফাইল স্ন্যাপশট",
      copy: "গিটহাব এবং লিটকোট কার্যক্রমের সরাসরি স্ন্যাপশট।",
      openProfile: "প্রোফাইল খুলুন",
    },
    experience: {
      eyebrow: "অভিজ্ঞতা",
      title: "পরিমাপযোগ্য কর্মক্ষমতা প্রভাব সহ প্রোডাকশন ইঞ্জিনিয়ারিং।",
      copy: "দৃঢ় সিস্টেম তৈরি করতে আমি ব্যাকএন্ড এপিআই, ডেটা পাইপলাইন এবং ক্লাউডে কাজ করি।",
      liveBadge: "লাইভ",
      roles: [
        {
          title: "সফটওয়্যার ইঞ্জিনিয়ার",
          company: "অ্যাকসেন্টার (Accenture)",
          location: "বেঙ্গালুরু, ভারত",
          period: "জুন ২০২৬ - বর্তমান",
          bullets: [
            "ভারী যন্ত্রপাতির তথ্য বিশ্লেষণকারী বৃহৎ টেলিমেট্রি সিস্টেমে কাজ।",
            "জাভা, স্প্রিং বুট, এমকিউটিটি, এডব্লিউএস আইওটি কোর এবং কাইনেসিসে অবদান।",
            "তথ্য যাচাইকরণ এবং নির্বিঘ্ন সংযোগের জন্য মজবুত পাইপলাইন নির্মাণ।",
          ],
        },
        {
          title: "অ্যাসোসিয়েট সফটওয়্যার ইঞ্জিনিয়ার",
          company: "অ্যাকসেন্টার",
          location: "বেঙ্গালুরু, ভারত",
          period: "অক্টোবর ২০২৪ - মে ২০২৬",
          bullets: [
            "প্রতিদিন ১,০০,০০০+ ট্রানজিট লেনদেন পরিচালনাকারী জাভা স্প্রিং বুট এপিআই তৈরি করেছি।",
            "রেডিস ক্যাশিং ব্যবহার করে পেমেন্ট এপিআই লেটেন্সি ৩৫% কমিয়েছি।",
          ],
        },
        {
          title: "সফটওয়্যার ডেভেলপমেন্ট ইঞ্জিনিয়ার ইন্টার্ন",
          company: "অস্টেলো ইন্ডিয়া",
          location: "রিমোট",
          period: "মার্চ ২০২৪ - মে ২০২৪",
          bullets: ["রিভারপড স্টেট ম্যানেজমেন্ট সহ ফ্লাটার অ্যাপকে এমভিভিএমে পুনর্গঠন করেছি।"],
        },
        {
          title: "সফটওয়্যার ডেভেলপমেন্ট ইঞ্জিনিয়ার ইন্টার্ন",
          company: "ব্লুপএক্স ইন্ডিয়া",
          location: "রিমোট",
          period: "সেপ্টেম্বর ২০২৩ - মার্চ ২০২৪",
          bullets: ["ফায়ারবেস ইন্টিগ্রেশনের মাধ্যমে নিরাপদ ক্যাব-বুকিং সিস্টেম তৈরি করেছি।"],
        },
      ],
    },
    projects: {
      eyebrow: "প্রকল্প",
      title: "স্বাধীনভাবে নির্মিত সিস্টেম ও সমাধান।",
      copy: "বাস্তব প্রোডাকশন চ্যালেঞ্জ মোকাবেলা করে নির্মিত প্রকল্প।",
      items: [
        {
          name: "টকিং ইউটিউব (TalkingYoutube)",
          timeline: "সক্রিয় প্রকল্প",
          summary: "শব্দার্থিক অনুসন্ধান এবং আরএজি দ্বারা ইউটিউব ভিডিওর সাথে কথোপকথনকারী এআই ব্যবস্থা।",
          bullets: ["ল্যাংচেন এবং এফএআইএসএস দিয়ে সুনির্দিষ্ট ভিডিও অনুসন্ধান পাইপলাইন।"],
        },
        {
          name: "কিউবট্রানজিট মাইক্রোসার্ভিসেস",
          timeline: "প্রোডাকশন ডেমো",
          summary: "কুবারনেটিস k3s-এ পরিচালিত ট্রানজিট টিকিটিং প্ল্যাটফর্ম।",
          bullets: ["বাকেট4জে দ্বারা রেট লিমিটিং ও নিরাপত্তা নিশ্চিতকরণ।"],
        },
      ],
    },
    skills: {
      eyebrow: "দক্ষতা",
      title: "ব্যাকএন্ড, মোবাইল এবং এআই সমাধানের জন্য ব্যবহারিক টুলকিট।",
      copy: "পরিমাপযোগ্য কর্মক্ষমতা প্রদানকারী প্রযুক্তিতেই আমার মনোযোগ।",
      languageCollections: "ভাষা এবং সংগ্রহ",
    },
    writing: {
      eyebrow: "লেখালেখি",
      title: "মিডিয়াম নিবন্ধ",
      copy: "ব্যাকএন্ড ইঞ্জিনিয়ারিং এবং সিস্টেম ডিজাইনের ওপর আমার প্রকাশিত প্রযুক্তিগত লেখা।",
      readArticle: "নিবন্ধ পড়ুন",
    },
    achievements: {
      eyebrow: "অর্জন",
      title: "মাইলফলক",
      copy: "ধারাবাহিক শিক্ষা এবং কর্মদক্ষতা প্রমাণকারী প্রশংসাপত্র।",
    },
    education: {
      eyebrow: "শিক্ষা",
      title: "শিক্ষাগত ভিত্তি",
      copy: "কম্পিউটার সায়েন্সের মৌলিক বিষয় এবং ইঞ্জিনিয়ারিং পাঠ্যক্রম।",
    },
    contact: {
      eyebrow: "যোগাযোগ",
      title: "আসুন, একসাথে অর্থবহ কিছু তৈরি করি।",
      copy: "ব্যাকএন্ড সিস্টেম এবং ডিস্ট্রিবিউটেড আর্কিটেকচারের নতুন সুযোগের জন্য আমন্ত্রণ রইল।",
      resumeBtn: "রিজিউমে",
      emailBtn: "ইমেইল পাঠান",
    },
  },

  gu: {
    meta: { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati", bcp47: "gu-IN" },
    nav: {
      about: "પરિચય",
      showcase: "શોકેસ",
      experience: "અનુભવ",
      projects: "પ્રોજેક્ટ્સ",
      skills: "કુશળતા",
      writing: "લેખો",
      contact: "સંપર્ક",
    },
    hero: {
      eyebrow: "સોફ્ટવેર એન્જિનિયર પોર્ટફોલિયો",
      name: "આદર્શ પાંડે",
      role: "સોફ્ટવેર એન્જિનિયર | બેકએન્ડ, ડિસ્ટ્રિબ્યુટેડ સિસ્ટમ્સ અને જેન એઆઈ",
      location: "બેંગલુરુ, કર્ણાટક, ભારત",
      summary:
        "મોટા પાયે ઝડપી અને વિશ્વસનીય બેકએન્ડ સિસ્ટમ્સ બનાવવા પર ધ્યાન કેન્દ્રિત કરનાર એન્જિનિયર. હાલમાં હું ટ્રાન્ઝિટ અને વ્હીકલ ટેલિમેટ્રી ઇન્ફ્રાસ્ટ્રક્ચર પર કામ કરી રહ્યો છું.",
      pitch:
        "હું પ્રોડક્શન-ગ્રેડ એપીઆઈ, ઇવેન્ટ પાઇપલાઇન્સ અને મોબાઇલ ઇન્ટિગ્રેશન ડિઝાઇન કરું છું જે ભારે ટ્રાફિકને મજબૂત રીતે સંભાળે છે.",
      chips: {
        backend: "બેકએન્ડ એન્જિનિયરિંગ",
        distributed: "ડિસ્ટ્રિબ્યુટેડ સિસ્ટમ્સ",
        reliability: "પ્રોડક્શન તૈયારી",
      },
      downloadResume: "બાયોડેટા ડાઉનલોડ કરો",
      viewProjects: "પ્રોજેક્ટ્સ જુઓ",
      sessionTitle: "સત્ર",
      sessionChip: "~/portfolio",
      terminal: {
        init: "પોર્ટફોલિયો શરૂ થઈ રહ્યો છે... [સફળ]",
        roleLine: "બેકએન્ડ | મોબાઇલ | એઆઈ એન્જિનિયર",
        buildingLine: "સ્કેલેબલ સિસ્ટમ્સ અને આધુનિક ઉકેલોનું નિર્માણ.",
      },
    },
    focusInsights: [
      {
        title: "વ્યાવસાયિક લક્ષ્ય",
        description: "બેકએન્ડ એન્જિનિયરિંગ, ડિસ્ટ્રિબ્યુટેડ સર્વિસિસ અને સિસ્ટમ વિશ્વસનીયતા.",
      },
      {
        title: "એન્જિનિયરિંગ વિચારસરણી",
        description: "સ્પષ્ટતા, સિસ્ટમ થિંકિંગ અને લાંબા સમય સુધી ચાલે તેવો કોડ.",
      },
      {
        title: "ઓળખ",
        description: "સ્થિર સુવિધાઓ અને સચોટ એજ-કેસ હેન્ડલિંગ.",
      },
      {
        title: "કાર્યશૈલી",
        description: "વ્યવહારુ અમલીકરણ અને ગુણવત્તાયુક્ત પરિણામો.",
      },
      {
        title: "ઇન્ફ્રાસ્ટ્રક્ચર શક્તિ",
        description: "કુબરનેટિસ (k3s), કન્ટેનરાઇઝેશન, ઓટોસ્કેલિંગ અને સિસ્ટમ મોનિટરિંગ.",
      },
      {
        title: "સિસ્ટમ થિંકિંગ",
        description: "અસિંક્રોનસ વર્કફ્લો અને બેકએન્ડ આર્કિટેક્ચરનું ઊંડું જ્ઞાન.",
      },
    ],
    about: {
      eyebrow: "પરિચય",
      title: "લોક-કેન્દ્રિત અભિગમ સાથે વિશ્વસનીય ઉત્પાદનોનું નિર્માણ.",
      copy: "મોટા પાયે ઝડપી અને વિશ્વસનીય સિસ્ટમ્સ બનાવવા માટે સમર્પિત બેકએન્ડ એન્જિનિયર.",
      highlights: [
        "ઉચ્ચ ટ્રાફિકવાળા ટ્રાન્ઝિટ વાતાવરણ માટે જાવા સ્પ્રિંગ બૂટ એપીઆઈ વિકસાવી.",
        "એમવીવીએમ આર્કિટેક્ચર સાથે એન્ડ્રોઇડ એપ ફીચર્સ અને હાર્ડવેર એસડીકે સંકલન.",
        "કાફકા, જીઆરપીસી અને જેડબલ્યુટી સાથે ઇવેન્ટ-સંચાલિત માઇક્રોસર્વિસિસ.",
        "આરએજી પાઇપલાઇન અને એફએઆઈએસએસ વેક્ટર સર્ચ સાથે જેન એઆઈ સંશોધન.",
      ],
    },
    showcase: {
      eyebrow: "શોકેસ",
      title: "એન્જિનિયરિંગ પ્રોફાઇલ સ્નેપશોટ",
      copy: "ગિટહબ અને લીટકોડ પ્રવૃત્તિઓના સીધા સ્નેપશોટ.",
      openProfile: "પ્રોફાઇલ ખોલો",
    },
    experience: {
      eyebrow: "અનુભવ",
      title: "માપી શકાય તેવા પ્રદર્શન પ્રભાવ સાથે પ્રોડક્શન એન્જિનિયરિંગ.",
      copy: "મજબૂત સિસ્ટમ્સ બનાવવા માટે હું બેકએન્ડ એપીઆઈ, ડેટા પાઇપલાઇન અને ક્લાઉડ પર કામ કરું છું.",
      liveBadge: "લાઇવ",
      roles: [
        {
          title: "સોફ્ટવેર એન્જિનિયર",
          company: "એક્સેન્ચર (Accenture)",
          location: "બેંગલુરુ, ભારત",
          period: "જૂન ૨૦૨૬ - હાલમાં",
          bullets: [
            "ભારે મશીનરીમાંથી ડેટા વિશ્લેષણ કરતી મોટી ફ્લીટ ટેલિમેટ્રી સિસ્ટમ પર કાર્ય.",
            "જાવા, સ્પ્રિંગ બૂટ, એમક્યુટીટી, એડબલ્યુએસ આઈઓટી કોર અને કાઇનેસિસમાં યોગદાન.",
            "ડેટા ચકાસણી અને અવિરત કનેક્ટિવિટી માટે મજબૂત પાઇપલાઇન્સનું નિર્માણ.",
          ],
        },
        {
          title: "એસોસિયેટ સોફ્ટવેર એન્જિનિયર",
          company: "એક્સેન્ચર",
          location: "બેંગલુરુ, ભારત",
          period: "ઓક્ટોબર ૨૦૨૪ - મે ૨૦૨૬",
          bullets: [
            "દરરોજ ૧,૦૦,૦૦૦+ ટ્રાન્ઝિટ વ્યવહારો સંભાળતી જાવા સ્પ્રિંગ બૂટ એપીઆઈ બનાવી.",
            "રેડિસ કેશિંગ દ્વારા પેમેન્ટ એપીઆઈ લેટન્સી ૩૫% ઘટાડી.",
          ],
        },
        {
          title: "સોફ્ટવેર ડેવલપમેન્ટ એન્જિનિયર ઇન્ટર્ન",
          company: "ઓસ્ટેલો ઇન્ડિયા",
          location: "રીમોટ",
          period: "માર્ચ ૨૦૨૪ - મે ૨૦૨૪",
          bullets: ["ફ્લટર એપને રિવરપોડ સ્ટેટ મેનેજમેન્ટ સાથે એમવીવીએમમાં રૂપાંતરિત કરી."],
        },
        {
          title: "સોફ્ટવેર ડેવલપમેન્ટ એન્જિનિયર ઇન્ટર્ન",
          company: "બ્લૂપએક્સ ઇન્ડિયા",
          location: "રીમોટ",
          period: "સપ્ટેમ્બર ૨૦૨૩ - માર્ચ ૨૦૨૪",
          bullets: ["ફાયરબેઝ ઇન્ટિગ્રેશન સાથે સુરક્ષિત કેબ-બુકિંગ સિસ્ટમ બનાવી."],
        },
      ],
    },
    projects: {
      eyebrow: "પ્રોજેક્ટ્સ",
      title: "સ્વતંત્ર રીતે બનાવેલ સિસ્ટમ્સ.",
      copy: "વાસ્તવિક પ્રોડક્શન પડકારોને ધ્યાનમાં રાખીને બનાવેલ પ્રોજેક્ટ્સ.",
      items: [
        {
          name: "ટોકિંગ યુટ્યુબ (TalkingYoutube)",
          timeline: "સક્રિય પ્રોજેક્ટ",
          summary: "સિમેન્ટિક સર્ચ અને આરએજી દ્વારા યુટ્યુબ વિડીયો સાથે વાતચીત કરતી એઆઈ સિસ્ટમ.",
          bullets: ["લેંગચેઇન અને એફએઆઈએસએસ સાથે સચોટ વિડીયો સર્ચ પાઇપલાઇન."],
        },
        {
          name: "ક્યુબટ્રાન્ઝિટ માઇક્રોસર્વિસિસ",
          timeline: "પ્રોડક્શન ડેમો",
          summary: "કુબરનેટિસ k3s પર ચાલતું ટ્રાન્ઝિટ ટિકિટિંગ પ્લેટફોર્મ.",
          bullets: ["બકેટ4જે દ્વારા રેટ લિમિટિંગ અને સુરક્ષા સુવિધાઓ."],
        },
      ],
    },
    skills: {
      eyebrow: "કુશળતા",
      title: "બેકએન્ડ, મોબાઇલ અને એઆઈ સુવિધાઓ માટે વ્યવહારુ ટૂલકિટ.",
      copy: "માપી શકાય તેવું પ્રદર્શન આપતી ટેકનોલોજી પર મારું ધ્યાન છે.",
      languageCollections: "ભાષાઓ અને સંગ્રહો",
    },
    writing: {
      eyebrow: "લેખો",
      title: "મીડિયમ લેખો",
      copy: "બેકએન્ડ એન્જિનિયરિંગ અને સિસ્ટમ ડિઝાઇન પર મારા પ્રકાશિત ટેકનિકલ લેખો.",
      readArticle: "લેખ વાંચો",
    },
    achievements: {
      eyebrow: "સિદ્ધિઓ",
      title: "માઇલસ્ટોન્સ",
      copy: "સતત શીખવાની અને કામ કરવાની ક્ષમતા દર્શાવતા પ્રમાણપત્રો.",
    },
    education: {
      eyebrow: "શિક્ષણ",
      title: "શૈક્ષણિક પાયો",
      copy: "કમ્પ્યુટર સાયન્સના પાયાના સિદ્ધાંતો અને એન્જિનિયરિંગ અભ્યાસ.",
    },
    contact: {
      eyebrow: "સંપર્ક",
      title: "ચાલો, સાથે મળીને કંઈક અર્થપૂર્ણ બનાવીએ.",
      copy: "બેકએન્ડ સિસ્ટમ્સ અને ડિસ્ટ્રિબ્યુટેડ આર્કિટેક્ચરમાં નવી તકો માટે સ્વાગત છે.",
      resumeBtn: "બાયોડેટા",
      emailBtn: "ઇમેઇલ મોકલો",
    },
  },

  pa: {
    meta: { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", script: "Gurmukhi", bcp47: "pa-IN" },
    nav: {
      about: "ਜਾਣ-ਪਛਾਣ",
      showcase: "ਸ਼ੋਅਕੇਸ",
      experience: "ਤਜਰਬਾ",
      projects: "ਪ੍ਰੋਜੈਕਟ",
      skills: "ਹੁਨਰ",
      writing: "ਲੇਖ",
      contact: "ਸੰਪਰਕ",
    },
    hero: {
      eyebrow: "ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ ਪੋਰਟਫੋਲੀਓ",
      name: "ਆਦਰਸ਼ ਪਾਂਡੇ",
      role: "ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ | ਬੈਕਐਂਡ, ਡਿਸਟ੍ਰੀਬਿਊਟਿਡ ਸਿਸਟਮਜ਼ ਅਤੇ ਜੈਨ ਏਆਈ",
      location: "ਬੈਂਗਲੁਰੂ, ਕਰਨਾਟਕ, ਭਾਰਤ",
      summary:
        "ਵੱਡੇ ਪੱਧਰ 'ਤੇ ਤੇਜ਼ ਅਤੇ ਭਰੋਸੇਮੰਦ ਬੈਕਐਂਡ ਸਿਸਟਮ ਬਣਾਉਣ 'ਤੇ ਧਿਆਨ ਕੇਂਦਰਿਤ ਕਰਨ ਵਾਲਾ ਇੰਜੀਨੀਅਰ। ਮੈਂ ਇਸ ਵੇਲੇ ਟ੍ਰਾਂਜਿਟ ਅਤੇ ਵਾਹਨ ਟੈਲੀਮੈਟਰੀ ਬੁਨਿਆਦੀ ਢਾਂਚੇ 'ਤੇ ਕੰਮ ਕਰ ਰਿਹਾ ਹਾਂ।",
      pitch:
        "ਮੈਂ ਪ੍ਰੋਡਕਸ਼ਨ-ਗ੍ਰੇਡ ਏਪੀਆਈ, ਈਵੈਂਟ ਪਾਈਪਲਾਈਨਾਂ ਅਤੇ ਮੋਬਾਈਲ ਏਕੀਕਰਣ ਡਿਜ਼ਾਈਨ ਕਰਦਾ ਹਾਂ ਜੋ ਭਾਰੀ ਟ੍ਰੈਫਿਕ ਨੂੰ ਸਥਿਰਤਾ ਨਾਲ ਸੰਭਾਲਦੇ ਹਨ।",
      chips: {
        backend: "ਬੈਕਐਂਡ ਇੰਜੀਨੀਅਰਿੰਗ",
        distributed: "ਡਿਸਟ੍ਰੀਬਿਊਟਿਡ ਸਿਸਟਮਜ਼",
        reliability: "ਪ੍ਰੋਡਕਸ਼ਨ ਤਿਆਰੀ",
      },
      downloadResume: "ਰੈਜ਼ਿਊਮੇ ਡਾਊਨਲੋਡ ਕਰੋ",
      viewProjects: "ਪ੍ਰੋਜੈਕਟ ਦੇਖੋ",
      sessionTitle: "ਸੈਸ਼ਨ",
      sessionChip: "~/portfolio",
      terminal: {
        init: "ਪੋਰਟਫੋਲੀਓ ਸ਼ੁਰੂ ਹੋ ਰਿਹਾ ਹੈ... [ਸਫਲ]",
        roleLine: "ਬੈਕਐਂਡ | ਮੋਬਾਈਲ | ਏਆਈ ਇੰਜੀਨੀਅਰ",
        buildingLine: "ਸਕੇਲੇਬਲ ਸਿਸਟਮ ਅਤੇ ਆਧੁਨਿਕ ਹੱਲਾਂ ਦਾ ਨਿਰਮਾਣ।",
      },
    },
    focusInsights: [
      {
        title: "ਪੇਸ਼ੇਵਰ ਟੀਚਾ",
        description: "ਬੈਕਐਂਡ ਇੰਜੀਨੀਅਰਿੰਗ, ਡਿਸਟ੍ਰੀਬਿਊਟਿਡ ਸੇਵਾਵਾਂ ਅਤੇ ਸਿਸਟਮ ਭਰੋਸੇਯੋਗਤਾ।",
      },
      {
        title: "ਇੰਜੀਨੀਅਰਿੰਗ ਸੋਚ",
        description: "ਸਪੱਸ਼ਟਤਾ, ਸਿਸਟਮ ਸੋਚ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਚੱਲਣ ਵਾਲਾ ਕੋਡ।",
      },
      {
        title: "ਪਛਾਣ",
        description: "ਸਥਿਰ ਫੀਚਰ ਅਤੇ ਮਜ਼ਬੂਤ ਐਜ-ਕੇਸ ਹੈਂਡਲਿੰਗ।",
      },
      {
        title: "ਕੰਮ ਕਰਨ ਦੀ ਸ਼ੈਲੀ",
        description: "ਵਿਹਾਰਕ ਅਮਲ ਅਤੇ ਗੁਣਵੱਤਾ-ਕੇਂਦਰਿਤ ਨਤੀਜੇ।",
      },
      {
        title: "ਇਨਫਰਾਸਟ੍ਰਕਚਰ ਤਾਕਤ",
        description: "ਕੁਬਰਨੇਟਿਸ (k3s), ਕੰਟੇਨਰਾਈਜ਼ੇਸ਼ਨ, ਆਟੋ-ਸਕੇਲਿੰਗ ਅਤੇ ਸਿਸਟਮ ਨਿਗਰਾਨੀ।",
      },
      {
        title: "ਸਿਸਟਮ ਸੋਚ",
        description: "ਅਸਿੰਕ੍ਰੋਨਸ ਵਰਕਫਲੋਅ ਅਤੇ ਬੈਕਐਂਡ ਢਾਂਚੇ ਦੀ ਡੂੰਘੀ ਸਮਝ।",
      },
    ],
    about: {
      eyebrow: "ਜਾਣ-ਪਛਾਣ",
      title: "ਲੋਕ-ਕੇਂਦਰਿਤ ਪਹੁੰਚ ਨਾਲ ਭਰੋਸੇਯੋਗ ਉਤਪਾਦਾਂ ਦਾ ਨਿਰਮਾਣ।",
      copy: "ਵੱਡੇ ਪੈਮਾਨੇ 'ਤੇ ਤੇਜ਼ ਅਤੇ ਭਰੋਸੇਮੰਦ ਸਿਸਟਮ ਬਣਾਉਣ ਲਈ ਵਚਨਬੱਧ ਬੈਕਐਂਡ ਇੰਜੀਨੀਅਰ।",
      highlights: [
        "ਉੱਚ ਟ੍ਰੈਫਿਕ ਵਾਲੇ ਟ੍ਰਾਂਜਿਟ ਵਾਤਾਵਰਣ ਲਈ ਜਾਵਾ ਸਪ੍ਰਿੰਗ ਬੂਟ ਏਪੀਆਈ ਬਣਾਈਆਂ।",
        "ਐਮਵੀਵੀਐਮ ਆਰਕੀਟੈਕਚਰ ਨਾਲ ਐਂਡਰਾਇਡ ਐਪ ਫੀਚਰ ਅਤੇ ਹਾਰਡਵੇਅਰ ਐਸਡੀਕੇ ਏਕੀਕਰਣ।",
        "ਕਾਫਕਾ, ਜੀਆਰਪੀਸੀ ਅਤੇ ਜੇਡਬਲਿਊਟੀ ਨਾਲ ਈਵੈਂਟ-ਸੰਚਾਲਿਤ ਮਾਈਕ੍ਰੋਸਰਵਿਸਿਜ਼।",
        "ਆਰਏਜੀ ਪਾਈਪਲਾਈਨ ਅਤੇ ਐਫਏਆਈਐਸਐਸ ਵੈਕਟਰ ਖੋਜ ਨਾਲ ਜੈਨ ਏਆਈ ਪੜਚੋਲ।",
      ],
    },
    showcase: {
      eyebrow: "ਸ਼ੋਅਕੇਸ",
      title: "ਇੰਜੀਨੀਅਰਿੰਗ ਪ੍ਰੋਫਾਈਲ ਸਨੈਪਸ਼ਾਟ",
      copy: "ਗਿੱਟਹੱਬ ਅਤੇ ਲੀਟਕੋਡ ਗਤੀਵਿਧੀਆਂ ਤੋਂ ਸਿੱਧੇ ਸਨੈਪਸ਼ਾਟ।",
      openProfile: "ਪ੍ਰੋਫਾਈਲ ਖੋਲ੍ਹੋ",
    },
    experience: {
      eyebrow: "ਤਜਰਬਾ",
      title: "ਮਾਪਣਯੋਗ ਕਾਰਗੁਜ਼ਾਰੀ ਪ੍ਰਭਾਵ ਦੇ ਨਾਲ ਪ੍ਰੋਡਕਸ਼ਨ ਇੰਜੀਨੀਅਰਿੰਗ।",
      copy: "ਮਜ਼ਬੂਤ ਸਿਸਟਮ ਬਣਾਉਣ ਲਈ ਮੈਂ ਬੈਕਐਂਡ ਏਪੀਆਈ, ਡੇਟਾ ਪਾਈਪਲਾਈਨਾਂ ਅਤੇ ਕਲਾਊਡ 'ਤੇ ਕੰਮ ਕਰਦਾ ਹਾਂ।",
      liveBadge: "ਲਾਈਵ",
      roles: [
        {
          title: "ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ",
          company: "ਐਕਸੈਂਚਰ (Accenture)",
          location: "ਬੈਂਗਲੁਰੂ, ਭਾਰਤ",
          period: "ਜੂਨ 2026 - ਮੌਜੂਦਾ",
          bullets: [
            "ਵੱਡੀ ਮਸ਼ੀਨਰੀ ਤੋਂ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਵਾਲੇ ਵੱਡੇ ਫਲੀਟ ਟੈਲੀਮੈਟਰੀ ਸਿਸਟਮ 'ਤੇ ਕੰਮ।",
            "ਜਾਵਾ, ਸਪ੍ਰਿੰਗ ਬੂਟ, ਐਮਕਿਊਟੀਟੀ, ਏਡਬਲਿਊਐਸ ਆਈਓਟੀ ਕੋਰ ਅਤੇ ਕਾਇਨੇਸਿਸ ਵਿੱਚ ਯੋਗਦਾਨ।",
            "ਡੇਟਾ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਨਿਰਵਿਘਨ ਕੁਨੈਕਟੀਵਿਟੀ ਲਈ ਮਜ਼ਬੂਤ ਪਾਈਪਲਾਈਨਾਂ ਦਾ ਨਿਰਮਾਣ।",
          ],
        },
        {
          title: "ਐਸੋਸੀਏਟ ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ",
          company: "ਐਕਸੈਂਚਰ",
          location: "ਬੈਂਗਲੁਰੂ, ਭਾਰਤ",
          period: "ਅਕਤੂਬਰ 2024 - ਮਈ 2026",
          bullets: [
            "ਰੋਜ਼ਾਨਾ 1,00,000+ ਟ੍ਰਾਂਜਿਟ ਲੈਣ-ਦੇਣ ਸੰਭਾਲਣ ਵਾਲੀਆਂ ਜਾਵਾ ਸਪ੍ਰਿੰਗ ਬੂਟ ਏਪੀਆਈ ਬਣਾਈਆਂ।",
            "ਰੈਡਿਸ ਕੈਸ਼ਿੰਗ ਰਾਹੀਂ ਭੁਗਤਾਨ ਏਪੀਆਈ ਲੇਟੈਂਸੀ 35% ਘਟਾਈ।",
          ],
        },
        {
          title: "ਸਾਫਟਵੇਅਰ ਡਿਵੈਲਪਮੈਂਟ ਇੰਜੀਨੀਅਰ ਇੰਟਰਨ",
          company: "ਓਸਟੈਲੋ ਇੰਡੀਆ",
          location: "ਰਿਮੋਟ",
          period: "ਮਾਰਚ 2024 - ਮਈ 2024",
          bullets: ["ਫਲਟਰ ਐਪ ਨੂੰ ਰਿਵਰਪੌਡ ਸਟੇਟ ਮੈਨੇਜਮੈਂਟ ਨਾਲ ਐਮਵੀਵੀਐਮ ਵਿੱਚ ਬਦਲਿਆ।"],
        },
        {
          title: "ਸਾਫਟਵੇਅਰ ਡਿਵੈਲਪਮੈਂਟ ਇੰਜੀਨੀਅਰ ਇੰਟਰਨ",
          company: "ਬਲੂਪਐਕਸ ਇੰਡੀਆ",
          location: "ਰਿਮੋਟ",
          period: "ਸਤੰਬਰ 2023 - ਮਾਰਚ 2024",
          bullets: ["ਫਾਇਰਬੇਸ ਏਕੀਕਰਣ ਨਾਲ ਸੁਰੱਖਿਅਤ ਕੈਬ-ਬੁਕਿੰਗ ਸਿਸਟਮ ਬਣਾਇਆ।"],
        },
      ],
    },
    projects: {
      eyebrow: "ਪ੍ਰੋਜੈਕਟ",
      title: "ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ ਬਣਾਏ ਗਏ ਸਿਸਟਮ।",
      copy: "ਅਸਲ ਉਤਪਾਦਨ ਚੁਣੌਤੀਆਂ ਨੂੰ ਹੱਲ ਕਰਨ ਵਾਲੇ ਪ੍ਰੋਜੈਕਟ।",
      items: [
        {
          name: "ਟਾਕਿੰਗ ਯੂਟਿਊਬ (TalkingYoutube)",
          timeline: "ਸਰਗਰਮ ਪ੍ਰੋਜੈਕਟ",
          summary: "ਸਿਮੈਂਟਿਕ ਖੋਜ ਅਤੇ ਆਰਏਜੀ ਰਾਹੀਂ ਯੂਟਿਊਬ ਵੀਡੀਓਜ਼ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨ ਵਾਲਾ ਏਆਈ ਸਿਸਟਮ।",
          bullets: ["ਲੈਂਗਚੇਨ ਅਤੇ ਐਫਏਆਈਐਸਐਸ ਨਾਲ ਸਹੀ ਵੀਡੀਓ ਖੋਜ ਪਾਈਪਲਾਈਨ।"],
        },
        {
          name: "ਕਿਊਬਟ੍ਰਾਂਜਿਟ ਮਾਈਕ੍ਰੋਸਰਵਿਸਿਜ਼",
          timeline: "ਪ੍ਰੋਡਕਸ਼ਨ ਡੈਮੋ",
          summary: "ਕੁਬਰਨੇਟਿਸ k3s 'ਤੇ ਚੱਲਣ ਵਾਲਾ ਟ੍ਰਾਂਜਿਟ ਟਿਕਟਿੰਗ ਪਲੇਟਫਾਰਮ।",
          bullets: ["ਬਕੇਟ4ਜੇ ਦੁਆਰਾ ਰੇਟ ਲਿਮਿਟਿੰਗ ਅਤੇ ਸੁਰੱਖਿਆ ਉਪਾਅ।"],
        },
      ],
    },
    skills: {
      eyebrow: "ਹੁਨਰ",
      title: "ਬੈਕਐਂਡ, ਮੋਬਾਈਲ ਅਤੇ ਏਆਈ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਲਈ ਵਿਹਾਰਕ ਟੂਲਕਿੱਟ।",
      copy: "ਮੇਰਾ ਧਿਆਨ ਉਨ੍ਹਾਂ ਤਕਨਾਲੋਜੀਆਂ 'ਤੇ ਹੈ ਜੋ ਮਾਪਣਯੋਗ ਨਤੀਜੇ ਦਿੰਦੀਆਂ ਹਨ।",
      languageCollections: "ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਸੰਗ੍ਰਹਿ",
    },
    writing: {
      eyebrow: "ਲੇਖ",
      title: "ਮੀਡੀਅਮ ਲੇਖ",
      copy: "ਬੈਕਐਂਡ ਇੰਜੀਨੀਅਰਿੰਗ ਅਤੇ ਸਿਸਟਮ ਡਿਜ਼ਾਈਨ 'ਤੇ ਮੇਰੇ ਪ੍ਰਕਾਸ਼ਿਤ ਤਕਨੀਕੀ ਲੇਖ।",
      readArticle: "ਲੇਖ ਪੜ੍ਹੋ",
    },
    achievements: {
      eyebrow: "ਪ੍ਰਾਪਤੀਆਂ",
      title: "ਮੀਲ ਪੱਥਰ",
      copy: "ਨਿਰੰਤਰ ਸਿੱਖਣ ਅਤੇ ਕੰਮ ਕਰਨ ਦੀ ਸਮਰੱਥਾ ਨੂੰ ਦਰਸਾਉਂਦੇ ਸਰਟੀਫਿਕੇਟ।",
    },
    education: {
      eyebrow: "ਸਿੱਖਿਆ",
      title: "ਵਿਦਿਅਕ ਨੀਂਹ",
      copy: "ਕੰਪਿਊਟਰ ਸਾਇੰਸ ਦੇ ਬੁਨਿਆਦੀ ਸਿਧਾਂਤ ਅਤੇ ਇੰਜੀਨੀਅਰਿੰਗ ਸਿੱਖਿਆ।",
    },
    contact: {
      eyebrow: "ਸੰਪਰਕ",
      title: "ਆਓ, ਮਿਲ ਕੇ ਕੁਝ ਸਾਰਥਕ ਬਣਾਈਏ।",
      copy: "ਬੈਕਐਂਡ ਸਿਸਟਮਾਂ ਅਤੇ ਡਿਸਟ੍ਰੀਬਿਊਟਿਡ ਆਰਕੀਟੈਕਚਰ ਵਿੱਚ ਨਵੇਂ ਮੌਕਿਆਂ ਲਈ ਸਵਾਗਤ ਹੈ।",
      resumeBtn: "ਰੈਜ਼ਿਊਮੇ",
      emailBtn: "ਈਮੇਲ ਭੇਜੋ",
    },
  },

  or: {
    meta: { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", script: "Odia", bcp47: "or-IN" },
    nav: {
      about: "ପରିଚୟ",
      showcase: "ଶୋକେସ୍",
      experience: "ଅନୁଭୂତି",
      projects: "ପ୍ରକଳ୍ପ",
      skills: "ଦକ୍ଷତା",
      writing: "ଲେଖା",
      contact: "ଯୋଗାଯୋଗ",
    },
    hero: {
      eyebrow: "ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟର୍ ପୋର୍ଟଫୋଲିଓ",
      name: "ଆଦର୍ଶ ପାଣ୍ଡେ",
      role: "ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟର୍ | ବ୍ୟାକ୍ଏଣ୍ଡ୍, ଡିଷ୍ଟ୍ରିବ୍ୟୁଟେଡ୍ ସିଷ୍ଟମ୍ସ ଏବଂ ଜେନ୍ ଏଆଇ",
      location: "ବେଙ୍ଗାଲୁରୁ, କର୍ଣ୍ଣାଟକ, ଭାରତ",
      summary:
        "ବଡ଼ ଆକାରରେ ଦ୍ରୁତ ଏବଂ ନିର୍ଭରଯୋଗ୍ୟ ବ୍ୟାକ୍ଏଣ୍ଡ୍ ସିଷ୍ଟମ୍ ନିର୍ମାଣ କରିବାରେ କାର୍ଯ୍ୟରତ ଇଞ୍ଜିନିୟର୍। ବର୍ତ୍ତମାନ ମୁଁ ପରିବହନ ଏବଂ ଟେଲିମେଟ୍ରି ଇନଫ୍ରାଷ୍ଟ୍ରକ୍ଚର୍ରେ କାର୍ଯ୍ୟ କରୁଛି।",
      pitch:
        "ମୁଁ ପ୍ରଡକ୍ସନ୍-ଗ୍ରେଡ୍ ଏପିଆଇ, ଇଭେଣ୍ଟ୍ ପାଇପଲାଇନ୍ ଏବଂ ମୋବାଇଲ୍ ଇଣ୍ଟିଗ୍ରେସନ୍ ଡିଜାଇନ୍ କରେ ଯାହା ଅତ୍ୟଧିକ ଟ୍ରାଫିକ୍ ସହଜରେ ପରିଚାଳନା କରେ।",
      chips: {
        backend: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ ଇଞ୍ଜିନିୟରିଂ",
        distributed: "ଡିଷ୍ଟ୍ରିବ୍ୟୁଟେଡ୍ ସିଷ୍ଟମ୍ସ",
        reliability: "ପ୍ରଡକ୍ସନ୍ ପ୍ରସ୍ତୁତି",
      },
      downloadResume: "ରିଜ୍ୟୁମ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
      viewProjects: "ପ୍ରକଳ୍ପଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
      sessionTitle: "ସେସନ୍",
      sessionChip: "~/portfolio",
      terminal: {
        init: "ପୋର୍ଟଫୋଲିଓ ଆରମ୍ଭ ହେଉଛି... [ସଫଳ]",
        roleLine: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ | ମୋବାଇଲ୍ | ଏଆଇ ଇଞ୍ଜିନିୟର୍",
        buildingLine: "ସ୍କେଲେବଲ୍ ସିଷ୍ଟମ୍ ଏବଂ ଆଧୁନିକ ସମାଧାନର ନିର୍ମାଣ।",
      },
    },
    focusInsights: [
      {
        title: "ପେଶାଗତ ଲକ୍ଷ୍ୟ",
        description: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ ଇଞ୍ଜିନିୟରିଂ, ଡିଷ୍ଟ୍ରିବ୍ୟୁଟେଡ୍ ସେବା ଏବଂ ସିଷ୍ଟମ୍ ନିର୍ଭରଯୋଗ୍ୟତା।",
      },
      {
        title: "ଇଞ୍ଜିନିୟରିଂ ଚିନ୍ତାଧାରା",
        description: "ସ୍ପଷ୍ଟତା, ସିଷ୍ଟମ୍ ଚିନ୍ତନ ଏବଂ ସ୍ଥାୟୀ କୋଡ୍।",
      },
      {
        title: "ପରିଚୟ",
        description: "ସ୍ଥିର କାର୍ଯ୍ୟଦକ୍ଷତା ଏବଂ ଦୃଢ଼ ଏଜ୍-କେସ୍ ନିୟନ୍ତ୍ରଣ।",
      },
      {
        title: "କାର୍ଯ୍ୟଶୈଳୀ",
        description: "ବାସ୍ତବବାଦୀ କାର୍ଯ୍ୟାନ୍ୱୟନ ଏବଂ ଗୁଣାତ୍ମକ ଫଳାଫଳ।",
      },
      {
        title: "ଇନଫ୍ରାଷ୍ଟ୍ରକ୍ଚର୍ ଶକ୍ତି",
        description: "କୁବରନେଟିସ୍ (k3s), କଣ୍ଟେନରାଇଜେସନ୍, ଅଟୋସ୍କେଲିଂ ଏବଂ ମନିଟରିଂ।",
      },
      {
        title: "ସିଷ୍ଟମ୍ ଚିନ୍ତନ",
        description: "ଅସମକାଳୀନ କାର୍ଯ୍ୟପ୍ରଣାଳୀ ଏବଂ ବ୍ୟାକ୍ଏଣ୍ଡ୍ ସଂରଚନାର ଗଭୀର ଜ୍ଞାନ।",
      },
    ],
    about: {
      eyebrow: "ପରିଚୟ",
      title: "ମାନବ-କେନ୍ଦ୍ରିକ ଆଭିମୁଖ୍ୟ ସହିତ ନିର୍ଭରଯୋଗ୍ୟ ଉତ୍ପାଦ ନିର୍ମାଣ।",
      copy: "ବଡ଼ ଆକାରରେ ଦ୍ରୁତ ଏବଂ ନିର୍ଭରଯୋଗ୍ୟ ସିଷ୍ଟମ୍ ନିର୍ମାଣ କରିବାରେ ନିଷ୍ଠାପର ବ୍ୟାକ୍ଏଣ୍ଡ୍ ଇଞ୍ଜିନିୟର୍।",
      highlights: [
        "ଅତ୍ୟଧିକ ଟ୍ରାଫିକ୍ ବିଶିଷ୍ଟ ପରିବହନ ପରିବେଶ ପାଇଁ ଜାଭା ସ୍ପ୍ରିଙ୍ଗ୍ ବୁଟ୍ ଏପିଆଇ ନିର୍ମାଣ।",
        "ଏମଭିଭିଏମ୍ ସଂରଚନା ସହିତ ଆଣ୍ଡ୍ରଏଡ୍ ଆପ୍ ବୈଶିଷ୍ଟ୍ୟ ଏବଂ ହାର୍ଡୱେର୍ ଏସଡିକେ ସଂଯୋଗ।",
        "କାଫକା, ଜିଆରପିସି ଏବଂ ଜେଡବ୍ଲ୍ୟୁଟି ସହିତ ଇଭେଣ୍ଟ୍-ଆଧାରିତ ମାଇକ୍ରୋସର୍ଭିସେସ୍।",
        "ଆର୍ଏଜି ପାଇପଲାଇନ୍ ଏବଂ ଏଫ୍ଏଆଇଏସ୍ଏସ୍ ଭେକ୍ଟର୍ ଅନୁସନ୍ଧାନ ସହିତ ଜେନ୍ ଏଆଇ ଅଧ୍ୟୟନ।",
      ],
    },
    showcase: {
      eyebrow: "ଶୋକେସ୍",
      title: "ଇଞ୍ଜିନିୟରିଂ ପ୍ରୋଫାଇଲ୍ ଝଲକ",
      copy: "ଗିଟହବ୍ ଏବଂ ଲିଟକୋଡ୍ କାର୍ଯ୍ୟକଳାପର ସିଧାସଳଖ ଝଲକ।",
      openProfile: "ପ୍ରୋଫାଇଲ୍ ଖୋଲନ୍ତୁ",
    },
    experience: {
      eyebrow: "ଅନୁଭୂତି",
      title: "ପରିମାପଯୋଗ୍ୟ ପ୍ରଭାବ ସହିତ ପ୍ରଡକ୍ସନ୍ ଇଞ୍ଜିନିୟରିଂ।",
      copy: "ନିର୍ଭରଯୋଗ୍ୟ ସିଷ୍ଟମ୍ ବିତରଣ ପାଇଁ ମୁଁ ବ୍ୟାକ୍ଏଣ୍ଡ୍ ଏପିଆଇ, ଡାଟା ପାଇପଲାଇନ୍ ଏବଂ କ୍ଲାଉଡ୍ରେ କାର୍ଯ୍ୟ କରେ।",
      liveBadge: "ଲାଇଭ୍",
      roles: [
        {
          title: "ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟର୍",
          company: "ଆକ୍ସେଞ୍ଚର୍ (Accenture)",
          location: "ବେଙ୍ଗାଲୁରୁ, ଭାରତ",
          period: "ଜୁନ୍ ୨୦୨୬ - ବର୍ତ୍ତମାନ",
          bullets: [
            "ଭାରୀ ଯନ୍ତ୍ରପାତିରୁ ତଥ୍ୟ ବିଶ୍ଳେଷଣ କରୁଥିବା ବୃହତ ଫ୍ଲିଟ୍ ଟେଲିମେଟ୍ରି ସିଷ୍ଟମ୍ରେ କାର୍ଯ୍ୟ।",
            "ଜାଭା, ସ୍ପ୍ରିଙ୍ଗ୍ ବୁଟ୍, ଏମକ୍ୟୁଟିଟି, ଏଡବ୍ଲ୍ୟୁଏସ୍ ଆଇଓଟି କୋର୍ ଏବଂ କାଇନେସିସ୍ରେ ଅବଦାନ।",
            "ତଥ୍ୟ ଯାଞ୍ଚ ଏବଂ ନିରବଚ୍ଛିନ୍ନ ସଂଯୋଗ ପାଇଁ ଦୃଢ଼ ପାଇପଲାଇନ୍ ନିର୍ମାଣ।",
          ],
        },
        {
          title: "ଆସୋସିଏଟ୍ ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟର୍",
          company: "ଆକ୍ସେଞ୍ଚର୍",
          location: "ବେଙ୍ଗାଲୁରୁ, ଭାରତ",
          period: "ଅକ୍ଟୋବର ୨୦୨୪ - ମେ ୨୦୨୬",
          bullets: [
            "ଦୈନିକ ୧,୦୦,୦୦୦+ ପରିବହନ କାରବାର ପରିଚାଳନା କରୁଥିବା ଜାଭା ସ୍ପ୍ରିଙ୍ਗ୍ ବୁଟ୍ ଏପିଆଇ ନିର୍ମାଣ।",
            "ରେଡିସ୍ କ୍ୟାସିଂ ମାଧ୍ୟମରେ ପେମେଣ୍ଟ୍ ଏପିଆଇ ବିଳମ୍ବତା ୩୫% ହ୍ରାସ।",
          ],
        },
        {
          title: "ସଫ୍ଟୱେର୍ ଡେଭଲପମେଣ୍ଟ୍ ଇଞ୍ଜିନିୟର୍ ଇଣ୍ଟର୍ନ",
          company: "ଓଷ୍ଟେଲୋ ଇଣ୍ଡିଆ",
          location: "ରିମୋଟ୍",
          period: "ମାର୍ଚ୍ଚ ୨୦୨୪ - ମେ ୨୦୨୪",
          bullets: ["ଫ୍ଲଟର୍ ଆପ୍କୁ ରିଭରପଡ୍ ଷ୍ଟେଟ୍ ମ୍ୟାନେଜମେଣ୍ଟ୍ ସହିତ ଏମଭିଭିଏମ୍ରେ ପୁନଃଗଠନ କଲି।"],
        },
        {
          title: "ସଫ୍ଟୱେର୍ ଡେଭଲପମେଣ୍ଟ୍ ଇଞ୍ଜିନିୟର୍ ଇଣ୍ଟର୍ନ",
          company: "ବ୍ଲୁପ୍ଏକ୍ସ ଇଣ୍ଡିଆ",
          location: "ରିମୋଟ୍",
          period: "ସେପ୍ଟେମ୍ବର ୨୦୨୩ - ମାର୍ଚ୍ଚ ୨୦୨୪",
          bullets: ["ଫାୟାରବେସ୍ ସଂଯୋଗ ସହିତ ସୁରକ୍ଷିତ କ୍ୟାବ୍-ବୁକିଂ ବ୍ୟବସ୍ଥା ନିର୍ମାଣ କଲି।"],
        },
      ],
    },
    projects: {
      eyebrow: "ପ୍ରକଳ୍ପ",
      title: "ସ୍ୱତନ୍ତ୍ର ଭାବରେ ନିର୍ମିତ ସିଷ୍ଟମ୍।",
      copy: "ବାସ୍ତବିକ ଉତ୍ପାଦନ ଚ୍ୟାଲେଞ୍ଜର ସମାଧାନ କରୁଥିବା ପ୍ରକଳ୍ପ।",
      items: [
        {
          name: "ଟକିଂ ୟୁଟ୍ୟୁବ୍ (TalkingYoutube)",
          timeline: "ସକ୍ରିୟ ପ୍ରକଳ୍ପ",
          summary: "ସିମାଣ୍ଟିକ୍ ସନ୍ଧାନ ଏବଂ ଆର୍ଏଜି ମାଧ୍ୟମରେ ୟୁଟ୍ୟୁବ୍ ଭିଡିଓ ସହିତ କଥାବାର୍ତ୍ତା କରୁଥିବା ଏଆଇ ସିଷ୍ଟମ୍।",
          bullets: ["ଲାଙ୍ଗଚେନ୍ ଏବଂ ଏଫ୍ଏଆଇଏସ୍ଏସ୍ ସହିତ ସଠିକ୍ ଭିଡିଓ ସନ୍ଧାନ ପାଇପଲାଇନ୍।"],
        },
        {
          name: "କ୍ୟୁବଟ୍ରାଞ୍ଜିଟ୍ ମାଇକ୍ରୋସର୍ଭିସେସ୍",
          timeline: "ପ୍ରଡକ୍ସନ୍ ଡେମୋ",
          summary: "କୁବରନେଟିସ୍ k3s ରେ ପରିଚାଳିତ ପରିବହନ ଟିକେଟିଂ ପ୍ଲାଟଫର୍ମ।",
          bullets: ["ବକେଟ4ଜେ ଦ୍ୱାରା ରେଟ୍ ଲିମିଟିଂ ଏବଂ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା।"],
        },
      ],
    },
    skills: {
      eyebrow: "ଦକ୍ଷତା",
      title: "ବ୍ୟାକ୍ଏଣ୍ଡ୍, ମୋବାଇଲ୍ ଏବଂ ଏଆଇ ସୁବିଧା ପାଇଁ ବ୍ୟବହାରିକ ଟୁଲକିଟ୍।",
      copy: "ପରିମାପଯୋଗ୍ୟ ପ୍ରଦର୍ଶନ ପ୍ରଦାନ କରୁଥିବା ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ଉପରେ ମୋର ଧ୍ୟାନ।",
      languageCollections: "ଭାଷା ଏବଂ ସଂଗ୍ରହ",
    },
    writing: {
      eyebrow: "ଲେଖା",
      title: "ମିଡିୟମ୍ ଆର୍ଟିକିଲ୍ସ",
      copy: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ ଇଞ୍ଜିନିୟରିଂ ଏବଂ ସିଷ୍ଟମ୍ ଡିଜାଇନ୍ ଉପରେ ମୋର ପ୍ରକାଶିତ ବୈଷୟିକ ଲେଖା।",
      readArticle: "ଲେଖା ପଢ଼ନ୍ତୁ",
    },
    achievements: {
      eyebrow: "ସଫଳତା",
      title: "ମାଇଲଖୁଣ୍ଟ",
      copy: "ନିରନ୍ତର ଶିକ୍ଷା ଏବଂ କାର୍ଯ୍ୟଦକ୍ଷତା ପ୍ରମାଣ କରୁଥିବା ପ୍ରମାଣପତ୍ର।",
    },
    education: {
      eyebrow: "ଶିକ୍ଷା",
      title: "ଶିକ୍ଷାଗତ ମୂଳଦୁଆ",
      copy: "କମ୍ପ୍ୟୁଟର ସାଇନ୍ସର ମୌଳିକ ସିଦ୍ଧାନ୍ତ ଏବଂ ଇଞ୍ଜିନିୟରିଂ ପାଠ୍ୟକ୍ରମ।",
    },
    contact: {
      eyebrow: "ଯୋଗାଯୋଗ",
      title: "ଆସନ୍ତୁ, ମିଶିକରି କିଛି ଅର୍ଥପୂର୍ଣ୍ଣ ଗଢ଼ିବା।",
      copy: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ ସିଷ୍ଟମ୍ ଏବଂ ଡିଷ୍ଟ୍ରିବ୍ୟୁଟେଡ୍ ଆର୍କିଟେକ୍ଚର୍ରେ ନୂତନ ସୁଯୋଗ ପାଇଁ ସ୍ୱାଗତ।",
      resumeBtn: "ରିଜ୍ୟୁମ୍",
      emailBtn: "ଇମେଲ୍ ପଠାନ୍ତୁ",
    },
  },
};
