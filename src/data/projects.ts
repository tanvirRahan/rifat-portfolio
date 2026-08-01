/** Shape of a single project entry. */
export interface Project {
  id: number
  title: string
  description: string
  longDescription?: string[] // Multiple paragraphs for the modal
  features?: string[] // Bullet points for the modal
  tags: string[]
  images: string[]
  github?: string
  isPrivate?: boolean
  live?: string
  offlineMessage?: string
}

/** All projects — add new entries here. */
export const projects: Project[] = [
  {
    id: 1,
    title: 'YankVid - Universal Video Downloader',
    description: 'A highly resilient, distributed video extraction platform. Engineered to bypass aggressive anti-bot algorithms while horizontally scaling heavy 4K video muxing via Celery & Redis.',
    longDescription: [
      'I engineered, deployed, and currently maintain a full-stack, enterprise-grade media processing platform (YankVid.me) that actively handles heavy real-world traffic. The core challenge wasn\'t just business logic—it was managing system resources, preventing deadlocks, and maintaining a buttery-smooth 60fps UI while performing intensive background I/O tasks under live user load.',
      'The frontend is a premium Next.js application featuring a modern glassmorphism UI and hardware-accelerated CSS. On the backend, Django routes APIs to pre-forked Celery workers. By utilizing Redis for atomic task locks and FFmpeg for zero-overhead stream-copy muxing, the system processes 4K media in sub-5 seconds without dropping a single client request.',
      'To survive in production, I implemented a robust anti-bot failover system with intelligent cookie rotation, automated quarantine for blocked sessions, and a strict garbage collection cycle that recursively purges orphaned files to guarantee zero disk exhaustion on the Azure VM.'
    ],
    features: [
      'Asynchronous Task Offloading: Heavy media processing delegated to Celery & Redis for non-blocking I/O.',
      'Zero-Overhead Stream Muxing: Native FFmpeg stream copying reduces 15-minute re-encoding to sub-5 seconds.',
      'Intelligent Anti-Bot Failover: Dynamic cookie rotation and automated quarantine to bypass rate limits.',
      'Automated Garbage Collection: Strict 30-minute Celery Beat sweeps to ensure absolute zero disk exhaustion.',
      'Premium User Experience: Hardware-accelerated Next.js frontend with dynamic glassmorphism UI.',
      'Production Infrastructure: Fully Dockerized microservices deployed on an Azure VM with NGINX reverse proxy.'
    ],
    tags: ['Next.js', 'Django', 'Celery', 'Redis', 'PostgreSQL', 'Docker', 'NGINX', 'Azure'],
    images: [
      '/images/projects/yankvid-1.jpeg',
      '/images/projects/yankvid-2.jpg',
      '/images/projects/yankvid-3.jpg.png',
      '/images/projects/yankvid-4.jpeg'
    ],
    github: 'https://github.com/tanvirRahan/Universal-Video-Downloader',
    isPrivate: true,
    live: 'https://yankvid.me'
  },
  {
    id: 2,
    title: 'Topnoz - AI-Powered E-Commerce & Lifestyle Platform',
    description: 'An enterprise-grade e-commerce solution architected for modern retail. Integrates a robust transactional core with TARS\'BOT, a custom conversational AI agent.',
    longDescription: [
      'I architected and deployed Topnoz as a production-ready e-commerce platform capable of handling complex, end-to-end user journeys. The core challenge was seamlessly blending a highly secure transactional backend (built with Django and PostgreSQL) with advanced conversational AI, ensuring zero latency during intelligent product discovery.',
      'The platform successfully operated in a live environment for an extended period, seamlessly handling real-world traffic and user transactions. This sustained live exposure validated the system\'s robustness and the efficiency of its underlying infrastructure under actual user load.',
      'To achieve this, I engineered TARS\'BOT, a custom AI agent powered by the Groq API. Unlike standard chatbots, it possesses real-time inventory awareness and retains deep contextual memory. I designed it to flawlessly interact with users across multiple languages, including Bangla, Banglish, and English, creating a highly personalized shopping experience.',
      'For the production environment, I optimized the infrastructure using Gunicorn and WhiteNoise to efficiently handle concurrent requests and static asset delivery. To ensure enterprise-grade security and scalability, I implemented seamless Google OAuth 2.0 onboarding, strict CORS/CSRF protections, and fully decoupled media management via a Cloudinary edge-cached CDN.'
    ],
    features: [
      'Conversational AI Integration: Engineered TARS\'BOT using Groq API for real-time, multilingual, context-aware user interactions.',
      'Enterprise Backend Architecture: Scalable Django REST Framework backend backed by PostgreSQL, optimized with Gunicorn.',
      'Intelligent Product Discovery: Intent-aware search algorithms that surpass traditional keyword matching.',
      'Cloud-Native Asset Management: Fully decoupled, edge-cached media delivery utilizing Cloudinary.',
      'Frictionless Authentication: Secure, one-click user onboarding via Google OAuth 2.0 (JWT backed).',
      'Production-Ready Security: Hardened infrastructure with strict CORS, CSRF protection, and environment management.'
    ],
    tags: ['Django', 'Python', 'PostgreSQL', 'Groq AI', 'Cloudinary', 'Google OAuth', 'REST API', 'Gunicorn'],
    images: [
      '/images/projects/topnoz-1.png',
      '/images/projects/topnoz-2.png',
      '/images/projects/topnoz-3.png',
      '/images/projects/topnoz-4.png',
      '/images/projects/topnoz-5.png'
    ],
    github: 'https://github.com/tanvirRahan/Topnoz',
    isPrivate: false,
    offlineMessage: 'Currently undergoing infrastructure upgrades. The live site will return soon!'
  },
  {
    id: 3,
    title: 'CareerOS: Industry-Academia Alignment',
    description: 'An intelligent career prediction system bridging academic profiles with industry-defined career trajectories using Machine Learning.',
    longDescription: [
      'I engineered CareerOS, an ML-based career prediction system designed to bridge the gap between academic profiles and industry expectations. The core objective was to take a student\'s degree, CGPA, logic score, and skill set to predict the most suitable career path and precisely map where they stand against real-world market demands.',
      'To prevent data leakage and ensure predictions remained grounded in actual industry demand, I made the deliberate architectural choice to utilize two distinct datasets. I trained and validated the classification models using a student academic profile dataset, while exclusively relying on a separate real-world job portal dataset to build a dynamic industry skill taxonomy.',
      'The machine learning pipeline required extensive EDA and feature engineering, including TF-IDF bigram extraction on skill text, technical vs. soft skill separation, and noise-word filtering. I benchmarked four distinct models, ultimately achieving 87.05% accuracy with a Stacking Ensemble, followed closely by LightGBM and XGBoost.',
      'Beyond prediction, the system performs a deep competency gap analysis. I built a custom dark-mode interface using Streamlit, which leverages interactive Plotly radar charts and animated confidence bars to cross-reference a user\'s skills against the industry taxonomy, visually highlighting matched skills, missing proficiencies, and alternative career paths.'
    ],
    features: [
      'Multi-Model Inference Engine: Benchmarked ML pipeline leveraging Stacking Ensemble (87.05%), LightGBM, XGBoost, and Random Forest.',
      'Dynamic Skill Taxonomy: Smart NLP-based skill extraction and TF-IDF bigram modeling from real-world job portal datasets.',
      'Competency Gap Analysis: Cross-references user profiles against industry benchmarks to identify matched and missing skills.',
      'Interactive Visualizations: Custom Plotly radar charts and animated confidence bars to display career probabilities.',
      'Strict Data Isolation: Deliberate separation of academic training data and industry skill data to prevent model leakage.',
      'Modern UI/UX: Professional, fully reproducible web interface built with Streamlit and styled with custom CSS.'
    ],
    tags: ['Python', 'Machine Learning', 'Scikit-Learn', 'Meta Stacking', 'Streamlit', 'XGBoost', 'LightGBM', 'NLP', 'Pandas', 'Plotly'],
    images: [
      '/images/projects/careeros-1.png',
      '/images/projects/careeros-2.png',
      '/images/projects/careeros-3.png'
    ],
    github: 'https://github.com/tanvirRahan/industry-academia-alignment',
    isPrivate: false
  },
  {
    id: 4,
    title: 'Job Market Intelligence: Automated ETL Pipeline',
    description: 'A fully automated Python ETL pipeline built to analyze the job market. Scrapes, cleans, and ranks 5000+ publicly available listings from a leading career portal — developed as part of an independent thesis on career intelligence.',
    longDescription: [
      'The core challenge I wanted to solve was simple but tedious: understanding what the tech job market actually looks like without spending hours manually scrolling through listings. I built a fully automated ETL pipeline that handles everything — from raw data collection to a structured, analysis-ready report — without any manual intervention.',
      'On the extraction side, I designed a high-concurrency scraper using AsyncIO and aiohttp. Traditional synchronous scrapers are bottlenecked by network I/O wait times, so by processing thousands of HTTP requests concurrently, the pipeline collects 5000+ publicly accessible job listings from a leading career portal in just a matter of minutes. What would normally take a full afternoon is reduced to a single terminal command.',
      'The transform stage is where the real intelligence lives. Using Pandas and BeautifulSoup4, the pipeline cleans raw HTML payloads, strips noise, and merges fragmented skill and requirements fields into a unified, readable format. A custom scoring algorithm then prioritizes IT and software roles based on domain relevance — so the most meaningful results for the thesis always rise to the top, not just the most recent.',
      'The final deliverable is a professionally formatted Excel report generated with XlsxWriter. Every run auto-detects the latest collected dataset, applies the full transform logic, and writes out a clean, styled report with conditional formatting — completely hands-off and fully reproducible for every research iteration.'
    ],
    features: [
      'High-Concurrency Extraction: AsyncIO & aiohttp process thousands of concurrent requests, collecting 5000+ listings in minutes.',
      'Intelligent Data Cleaning: Auto-detects the latest dataset, strips HTML noise, and merges fragmented Skills & Requirements into unified fields.',
      'Custom Priority Scoring: A domain-aware ranking algorithm surfaces the most relevant roles first based on thesis-defined criteria.',
      'Automated Excel Reporting: XlsxWriter produces a professionally styled .xlsx report with conditional formatting on every run.',
      'Fully Hands-Off Execution: End-to-end pipeline runs without intervention — from raw extraction through to the final ranked output.',
      'Research-Grade Data Practices: Built under an independent academic thesis using strictly public data, solely for educational and analytical purposes.'
    ],
    tags: ['Python', 'AsyncIO', 'aiohttp', 'Pandas', 'BeautifulSoup4', 'XlsxWriter', 'ETL', 'Data Extraction'],
    images: [
      '/images/projects/bdjobs-1.png',
      '/images/projects/bdjobs-2.png',
      '/images/projects/bdjobs-3.png'
    ],
    github: 'https://github.com/tanvirRahan/Automated-Job-Data-Pipeline',
    isPrivate: false
  },
  {
    id: 5,
    title: 'Automated Certificate & Appointment Generator',
    description: 'A Python-based document automation pipeline that batch-generates personalized certificates and appointment letters from structured datasets — eliminating manual document workflows entirely via headless LibreOffice and template-driven PDF rendering.',
    longDescription: [
      'The problem this project solves is one that almost every organization faces but rarely automates properly: issuing large batches of individually personalized documents — whether certificates of completion or formal appointment letters — without errors, inconsistency, or hours of manual effort. I built a Python ETL pipeline that takes a structured spreadsheet as input and outputs a batch of pixel-perfect, print-ready PDFs in a single execution.',
      'The core technical challenge was rendering. Most programmatic PDF generators either lose complex Word formatting entirely or produce visually inconsistent output. I solved this by using docxtpl to inject dynamic content — names, roles, domains, performance summaries, dates — directly into a Word-native .docx template, preserving all formatting, justified text arrays, and layout geometry. The rendered .docx files are then passed to LibreOffice running in headless CLI mode, which produces 100% formatting-accurate PDFs without any GUI dependency.',
      'One of the more interesting engineering decisions was the Reference ID system. Rather than using sequential integers, I implemented a custom text-parsing algorithm that reads the candidate\'s name structure and generates a structured, human-readable reference number — something like REF-FE-2024-0042 for a Frontend Engineering certificate. This makes issued documents auditable and professional without requiring a database.',
      'The pipeline also handles domain-specific content injection intelligently. Based on the candidate\'s technical track — Frontend, Backend, SQA, or UI/UX — it automatically selects and writes a tailored performance summary, meaning no two certificates read identically even in a batch of hundreds. All outputs are packaged into an optimized .zip archive, ready for distribution. The entire project is delivered as executable documentation via Google Colab, so any authorized user can run the full pipeline in the cloud without any local environment setup.'
    ],
    features: [
      'Headless PDF Rendering: LibreOffice CLI converts docxtpl-rendered .docx files to PDF with 100% layout fidelity — no GUI, no formatting loss.',
      'Dynamic Content Injection: Auto-selects and writes role-specific performance summaries based on the candidate\'s technical domain (Frontend, Backend, SQA, UI/UX).',
      'Smart Reference ID Generation: Custom text-parsing algorithm produces structured, human-readable reference numbers from candidate name nomenclature.',
      'Batch Processing & Packaging: Ingests a pandas DataFrame and outputs all generated documents directly into a single optimized .zip archive.',
      'Template-Driven Architecture: docxtpl preserves all MS Word native formatting — justified text, borders, seals — through the full generation lifecycle.',
      'Zero-Setup Execution: Packaged as a Google Colab notebook that auto-fetches all required assets from the repository and runs end-to-end in the cloud.'
    ],
    tags: ['Python', 'pandas', 'docxtpl', 'LibreOffice', 'openpyxl', 'ETL', 'Document Automation', 'Google Colab'],
    images: [
      '/images/projects/certgen-1.png',
      '/images/projects/certgen-2.png',
      '/images/projects/certgen-3.png'
    ],
    github: 'https://github.com/tanvirRahan/Automated-Certificate-Pipeline',
    isPrivate: false
  }
]
