export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  techStack: { name: string; icon: string }[];
  liveLink?: string;
  githubLink?: string;
  cardImage: string; // The image shown on the card
  details: {
    overview: string[];
    features: string[];
    images: string[];
  };
}

export const projectsData: Project[] = [
  {
    id: 'yankvid',
    title: 'YankVid - Distributed Media Extraction Engine',
    shortDesc: 'A highly resilient, distributed video extraction platform. Engineered to bypass aggressive anti-bot algorithms while horizontally scaling heavy 4K video muxing via Celery & Redis.',
    techStack: [
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
      { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'Celery', icon: 'https://cdn.simpleicons.org/celery/37814A' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'NGINX', icon: 'https://cdn.simpleicons.org/nginx/009639' },
      { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
    ],
    liveLink: 'https://yankvid.me',
    cardImage: '/images/projects/yankvid-1.jpeg',
    details: {
      overview: [
        "I engineered, deployed, and currently maintain a full-stack, enterprise-grade media processing platform (YankVid.me) that actively handles heavy real-world traffic. The core challenge wasn't just business logic—it was managing system resources, preventing deadlocks, and maintaining a buttery-smooth 60fps UI while performing intensive background I/O tasks under live user load.",
        "The frontend is a premium Next.js application featuring a modern glassmorphism UI and hardware-accelerated CSS. On the backend, Django routes APIs to pre-forked Celery workers. By utilizing Redis for atomic task locks and FFmpeg for zero-overhead stream-copy muxing, the system processes 4K media in sub-5 seconds without dropping a single client request.",
        "To survive in production, I implemented a robust anti-bot failover system with intelligent cookie rotation, automated quarantine for blocked sessions, and a strict garbage collection cycle that recursively purges orphaned files to guarantee zero disk exhaustion on the Azure VM."
      ],
      features: [
        "Asynchronous Task Offloading: Heavy media processing delegated to Celery & Redis for non-blocking I/O.",
        "Zero-Overhead Stream Muxing: Native FFmpeg stream copying reduces 15-minute re-encoding to sub-5 seconds.",
        "Intelligent Anti-Bot Failover: Dynamic cookie rotation and automated quarantine to bypass rate limits.",
        "Automated Garbage Collection: Strict 30-minute Celery Beat sweeps to ensure absolute zero disk exhaustion.",
        "Premium User Experience: Hardware-accelerated Next.js frontend with dynamic glassmorphism UI.",
        "Production Infrastructure: Fully Dockerized microservices deployed on an Azure VM with NGINX reverse proxy."
      ],
      images: [
        "/images/projects/yankvid-1.jpeg",
        "/images/projects/yankvid-2.jpg",
        "/images/projects/yankvid-4.jpeg",
        "/images/projects/yankvid-3.jpg.png"
      ]
    }
  },
  {
    id: 'topnoz',
    title: 'Topnoz - AI-Native Commerce Platform',
    shortDesc: 'A decoupled, API-first e-commerce platform built to handle complex user journeys. It pairs a fast Next.js App Router frontend with a robust Django Ninja backend and a smart conversational AI assistant.',
    techStack: [
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Django Ninja', icon: 'https://cdn.simpleicons.org/fastapi/059669' },
      { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Groq AI', icon: 'https://cdn.simpleicons.org/openai/000000' },
      { name: 'Cloudinary', icon: 'https://cdn.simpleicons.org/cloudinary/3448C5' },
      { name: 'Google OAuth', icon: 'https://cdn.simpleicons.org/google/4285F4' },
    ],
    liveLink: 'https://topnoz-lac.vercel.app/',
    githubLink: 'https://github.com/tanvirRahan/Topnoz',
    cardImage: '/images/projects/topnoz-1.png',
    details: {
      overview: [
        "I built Topnoz as a complete, production-ready e-commerce platform designed to handle real-world traffic and complex user journeys. Instead of a traditional monolith, I chose a fully decoupled, API-first architecture. A fast Next.js 16 frontend directly consumes secure REST APIs powered by Django Ninja and PostgreSQL.",
        "The core challenge was seamlessly blending this secure transactional backend with advanced conversational AI, ensuring zero latency during product discovery. To solve this, I integrated TARS'BOT—a custom AI shopping assistant powered by the Groq API. It understands user intent, retains context, and recommends products in real-time, functioning much better than standard keyword-matching search bars.",
        "The system strictly uses an API-only approach, drastically reducing the attack surface by stripping out legacy Django HTML templates. Incoming API requests are heavily validated using Pydantic schemas before reaching the database, ensuring high security and performance.",
        "Beyond the core shopping experience, I implemented secure Google OAuth 2.0 onboarding with JWT, decoupled all media management using Cloudinary's edge-cached CDN, and built a custom analytics tracker to monitor visitor IPs, devices, and UTM parameters."
      ],
      features: [
        "API-First Architecture: A decoupled setup where a modern Next.js 16+ frontend consumes fast, secure REST APIs built with Django Ninja.",
        "Intelligent AI Assistant: Engineered TARS'BOT using the Groq LLM for real-time, context-aware product discovery that understands natural human intent.",
        "Production-Grade Backend: A scalable Django and PostgreSQL core, fortified with strict Pydantic payload validation and no legacy HTML templates.",
        "Frictionless Security: Secure, one-tap user logins via Google OAuth 2.0 backed by JSON Web Tokens.",
        "Advanced Analytics & Tracking: A built-in system that records visitor devices, geographical locations, and UTM tags to drive marketing decisions.",
        "Cloud-Native Asset Management: Fast and optimized product image delivery utilizing Cloudinary's CDN caching."
      ],
      images: [
        "/images/projects/topnoz-1.png",
        "/images/projects/topnoz-2.png",
        "/images/projects/topnoz-3.png",
        "/images/projects/topnoz-4.png",
        "/images/projects/topnoz-5.png"
      ]
    }
  },
  {
    id: 'careeros',
    title: 'CareerOS - Predictive ML Career Engine',
    shortDesc: 'An intelligent career prediction system bridging academic profiles with industry-defined career trajectories using Machine Learning.',
    techStack: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Machine Learning', icon: 'https://cdn.simpleicons.org/openai/000000' },
      { name: 'Scikit-Learn', icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'Meta Stacking', icon: 'https://cdn.simpleicons.org/stackshare/0069FF' },
      { name: 'Streamlit', icon: 'https://cdn.simpleicons.org/streamlit/FF4B4B' },
      { name: 'XGBoost', icon: 'https://cdn.simpleicons.org/xgboost/000000' },
      { name: 'LightGBM', icon: 'https://cdn.simpleicons.org/jupyter/F37626' },
      { name: 'NLP', icon: 'https://cdn.simpleicons.org/spacy/09A3D5' },
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'Plotly', icon: 'https://cdn.simpleicons.org/plotly/3F4F75' },
    ],
    githubLink: 'https://github.com/tanvirRahan/industry-academia-alignment',
    cardImage: '/images/projects/careeros-1.png',
    details: {
      overview: [
        "I engineered CareerOS, an ML-based career prediction system designed to bridge the gap between academic profiles and industry expectations. The core objective was to take a student's degree, CGPA, logic score, and skill set to predict the most suitable career path and precisely map where they stand against real-world market demands.",
        "To prevent data leakage and ensure predictions remained grounded in actual industry demand, I made the deliberate architectural choice to utilize two distinct datasets. I trained and validated the classification models using a student academic profile dataset, while exclusively relying on a separate real-world job portal dataset to build a dynamic industry skill taxonomy.",
        "The machine learning pipeline required extensive EDA and feature engineering, including TF-IDF bigram extraction on skill text, technical vs. soft skill separation, and noise-word filtering. I benchmarked four distinct models, ultimately achieving 87.05% accuracy with a Stacking Ensemble, followed closely by LightGBM and XGBoost.",
        "Beyond prediction, the system performs a deep competency gap analysis. I built a custom dark-mode interface using Streamlit, which leverages interactive Plotly radar charts and animated confidence bars to cross-reference a user's skills against the industry taxonomy, visually highlighting matched skills, missing proficiencies, and alternative career paths."
      ],
      features: [
        "Multi-Model Inference Engine: Benchmarked ML pipeline leveraging Stacking Ensemble (87.05%), LightGBM, XGBoost, and Random Forest.",
        "Dynamic Skill Taxonomy: Smart NLP-based skill extraction and TF-IDF bigram modeling from real-world job portal datasets.",
        "Competency Gap Analysis: Cross-references user profiles against industry benchmarks to identify matched and missing skills.",
        "Interactive Visualizations: Custom Plotly radar charts and animated confidence bars to display career probabilities.",
        "Strict Data Isolation: Deliberate separation of academic training data and industry skill data to prevent model leakage.",
        "Modern UI/UX: Professional, fully reproducible web interface built with Streamlit and styled with custom CSS."
      ],
      images: [
        "/images/projects/careeros-1.png",
        "/images/projects/careeros-2.png",
        "/images/projects/careeros-3.png"
      ]
    }
  },
  {
    id: 'jobmarket',
    title: 'Job Market Intelligence - Automated ETL Pipeline',
    shortDesc: 'A fully automated Python ETL pipeline built to analyze the job market. Scrapes, cleans, and ranks 5000+ publicly available listings from a leading career portal to power career intelligence analytics.',
    techStack: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'AsyncIO', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'aiohttp', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'BeautifulSoup4', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'XlsxWriter', icon: 'https://cdn.simpleicons.org/microsoftexcel/217346' },
      { name: 'ETL', icon: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
      { name: 'Data Extraction', icon: 'https://cdn.simpleicons.org/snowflake/29B5E8' },
    ],
    githubLink: 'https://github.com/tanvirRahan/Automated-Job-Data-Pipeline',
    cardImage: '/images/projects/bdjobs-1.png',
    details: {
      overview: [
        "The core challenge I wanted to solve was simple but tedious: understanding what the tech job market actually looks like without spending hours manually scrolling through listings. I built a fully automated ETL pipeline that handles everything — from raw data collection to a structured, analysis-ready report — without any manual intervention.",
        "On the extraction side, I designed a high-concurrency scraper using AsyncIO and aiohttp. Traditional synchronous scrapers are bottlenecked by network I/O wait times, so by processing thousands of HTTP requests concurrently, the pipeline collects 5000+ publicly accessible job listings from a leading career portal in just a matter of minutes. What would normally take a full afternoon is reduced to a single terminal command.",
        "The transform stage is where the real intelligence lives. Using Pandas and BeautifulSoup4, the pipeline cleans raw HTML payloads, strips noise, and merges fragmented skill and requirements fields into a unified, readable format. A custom scoring algorithm then prioritizes IT and software roles based on domain relevance — so the most meaningful results always rise to the top, not just the most recent.",
        "The final deliverable is a professionally formatted Excel report generated with XlsxWriter. Every run auto-detects the latest collected dataset, applies the full transform logic, and writes out a clean, styled report with conditional formatting — completely hands-off and fully reproducible for every research iteration."
      ],
      features: [
        "High-Concurrency Extraction: AsyncIO & aiohttp process thousands of concurrent requests, collecting 5000+ listings in minutes.",
        "Intelligent Data Cleaning: Auto-detects the latest dataset, strips HTML noise, and merges fragmented Skills & Requirements into unified fields.",
        "Custom Priority Scoring: A domain-aware ranking algorithm surfaces the most relevant roles first based on industry-defined criteria.",
        "Automated Excel Reporting: XlsxWriter produces a professionally styled .xlsx report with conditional formatting on every run.",
        "Fully Hands-Off Execution: End-to-end pipeline runs without intervention — from raw extraction through to the final ranked output.",
        "Enterprise-Grade Data Practices: Built with strict data ethics in mind, processing publicly available data solely for market analysis and intelligence generation."
      ],
      images: [
        "/images/projects/bdjobs-1.png",
        "/images/projects/bdjobs-2.png",
        "/images/projects/bdjobs-3.png"
      ]
    }
  },
  {
    id: 'certgen',
    title: 'Python Document Automation - Certificate Engine',
    shortDesc: 'A Python-based document automation pipeline that batch-generates personalized certificates and appointment letters from structured datasets — eliminating manual document workflows entirely via headless LibreOffice and template-driven PDF rendering.',
    techStack: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'docxtpl', icon: 'https://cdn.simpleicons.org/microsoftword/2B579A' },
      { name: 'LibreOffice', icon: 'https://cdn.simpleicons.org/libreoffice/18A303' },
      { name: 'openpyxl', icon: 'https://cdn.simpleicons.org/microsoftexcel/217346' },
      { name: 'ETL', icon: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
      { name: 'Document Automation', icon: 'https://cdn.simpleicons.org/adobeacrobatreader/EC1C24' },
      { name: 'Google Colab', icon: 'https://cdn.simpleicons.org/googlecolab/F9AB00' },
    ],
    githubLink: 'https://github.com/tanvirRahan/automated-appointment-letter-generator',
    cardImage: '/images/projects/certgen-1.png',
    details: {
      overview: [
        "The problem this project solves is one that almost every organization faces but rarely automates properly: issuing large batches of individually personalized documents — whether certificates of completion or formal appointment letters — without errors, inconsistency, or hours of manual effort. I built a Python ETL pipeline that takes a structured spreadsheet as input and outputs a batch of pixel-perfect, print-ready PDFs in a single execution.",
        "The core technical challenge was rendering. Most programmatic PDF generators either lose complex Word formatting entirely or produce visually inconsistent output. I solved this by using docxtpl to inject dynamic content — names, roles, domains, performance summaries, dates — directly into a Word-native .docx template, preserving all formatting, justified text arrays, and layout geometry. The rendered .docx files are then passed to LibreOffice running in headless CLI mode, which produces 100% formatting-accurate PDFs without any GUI dependency.",
        "One of the more interesting engineering decisions was the Reference ID system. Rather than using sequential integers, I implemented a custom text-parsing algorithm that reads the candidate's name structure and generates a structured, human-readable reference number — something like REF-FE-2024-0042 for a Frontend Engineering certificate. This makes issued documents auditable and professional without requiring a database.",
        "The pipeline also handles domain-specific content injection intelligently. Based on the candidate's technical track — Frontend, Backend, SQA, or UI/UX — it automatically selects and writes a tailored performance summary, meaning no two certificates read identically even in a batch of hundreds. All outputs are packaged into an optimized .zip archive, ready for distribution. The entire project is delivered as executable documentation via Google Colab, so any authorized user can run the full pipeline in the cloud without any local environment setup."
      ],
      features: [
        "Headless PDF Rendering: LibreOffice CLI converts docxtpl-rendered .docx files to PDF with 100% layout fidelity — no GUI, no formatting loss.",
        "Dynamic Content Injection: Auto-selects and writes role-specific performance summaries based on the candidate's technical domain (Frontend, Backend, SQA, UI/UX).",
        "Smart Reference ID Generation: Custom text-parsing algorithm produces structured, human-readable reference numbers from candidate name nomenclature.",
        "Batch Processing & Packaging: Ingests a pandas DataFrame and outputs all generated documents directly into a single optimized .zip archive.",
        "Template-Driven Architecture: docxtpl preserves all MS Word native formatting — justified text, borders, seals — through the full generation lifecycle.",
        "Zero-Setup Execution: Packaged as a Google Colab notebook that auto-fetches all required assets from the repository and runs end-to-end in the cloud."
      ],
      images: [
        "/images/projects/certgen-1.png",
        "/images/projects/certgen-2.png",
        "/images/projects/certgen-3.png"
      ]
    }
  }
];
