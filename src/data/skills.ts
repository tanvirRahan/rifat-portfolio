/** Shape of a single skill category. */
export interface SkillCategory {
  title: string
  skills: string[]
}

/** All skills categorized — add new entries here. */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & 3D',
    skills: ['React', 'Next.js', 'Vite', 'HTML5/CSS3', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'GSAP', 'Lenis'],
  },
  {
    title: 'Backend & Web Auth',
    skills: ['Django', 'Django REST Framework', 'Celery', 'Redis', 'WSGI/ASGI', 'REST API Design', 'JWT', 'OAuth 2.0'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Pandas', 'NLP', 'Model Evaluation & Tuning'],
  },
  {
    title: 'Data Extraction & Automation',
    skills: ['Python Automation', 'AsyncIO', 'aiohttp', 'Async ETL Pipelines'],
  },
  {
    title: 'Databases & DevOps',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Schema Design', 'Query Optimization', 'Docker', 'Nginx', 'Git/GitHub', 'CI/CD'],
  },
  {
    title: 'Core & Languages',
    skills: ['Python', 'JavaScript', 'C', 'C++', 'Java', 'Data Structures & Algorithms', 'Competitive Programming'],
  },
]
