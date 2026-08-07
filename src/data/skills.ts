export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
      { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
      { name: 'HTML5/CSS3', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { name: 'GSAP', icon: 'https://cdn.simpleicons.org/greensock/88CE02' },
      { name: 'Lenis', icon: 'https://cdn.simpleicons.org/greensock/111111' },
    ],
  },
  {
    title: 'Backend & Web Auth',
    skills: [
      { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'Django Ninja', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'Django REST', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'Celery', icon: 'https://cdn.simpleicons.org/celery/37814A' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438' },
      { name: 'Cloudinary', icon: 'https://cdn.simpleicons.org/cloudinary/3448C5' },
      { name: 'WSGI/ASGI', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'REST API Design', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
      { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/000000' },
      { name: 'OAuth 2.0', icon: 'https://cdn.simpleicons.org/auth0/EB5424' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn/000000' },
      { name: 'XGBoost', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'LightGBM', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'NLP', icon: 'https://cdn.simpleicons.org/huggingface/000000' },
      { name: 'Meta Stacking', icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'Model Tuning', icon: 'https://cdn.simpleicons.org/keras/D00000' },
    ],
  },
  {
    title: 'Data Extraction & Automation',
    skills: [
      { name: 'Python Automation', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'AsyncIO', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'aiohttp', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Async ETL Pipelines', icon: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
    ],
  },
  {
    title: 'Databases & DevOps',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
      { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Nginx', icon: 'https://cdn.simpleicons.org/nginx/009639' },
      { name: 'Git/GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
      { name: 'CI/CD', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
    ],
  },
  {
    title: 'Core & Languages',
    skills: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/000000' },
      { name: 'C', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
      { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/000000' },
      { name: 'DSA', icon: 'https://cdn.simpleicons.org/leetcode/000000' },
    ],
  },
]
