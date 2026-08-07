export interface Research {
  id: string;
  badge: string;
  title: string;
  author: string;
  department: string;
  shortDesc: string;
  techStack: { name: string; icon?: string }[];
  cardImage: string;
  details: {
    abstract: string[];
    methodologies: { title: string; desc: string }[];
    findings: { metric?: string; title: string; desc: string }[];
    images: string[];
  }
}

export const researchData: Research[] = [
  {
    id: 'career-recommendation-framework',
    badge: 'UNDER REVIEW / PRE-PRINT',
    title: 'A Data-Driven Framework for Career Recommendation and Competency Mapping to Bridge the Industry-Academia Gap',
    author: 'Tanvir Rahan Rifat',
    department: 'Department of Computer Science & Engineering, University of Asia Pacific, Dhaka, Bangladesh',
    shortDesc: "Bangladesh's job market changes have generated a large gap between industry needs and what students have learned in their universities. This research proposes an Intelligent Career Counseling System utilizing a dual-source architecture and Stacking Meta-Ensemble Machine Learning models to map student profiles against actual employment demands in real-time.",
    techStack: [
      { name: 'Machine Learning', icon: 'https://cdn.simpleicons.org/openai/000000' },
      { name: 'Stacking Ensemble', icon: 'https://cdn.simpleicons.org/stackshare/0069FF' },
      { name: 'TF-IDF', icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'Cosine Similarity', icon: 'https://cdn.simpleicons.org/plotly/3F4F75' },
      { name: 'NLP', icon: 'https://cdn.simpleicons.org/spacy/09A3D5' },
      { name: 'Data Automation', icon: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
      { name: 'Academic Thesis', icon: 'https://cdn.simpleicons.org/googlescholar/4285F4' },
    ],
    // The user will provide real images in the future, these are placeholders
    cardImage: '/images/projects/thesis-1.png', 
    details: {
      abstract: [
        "Bangladesh's job market changes have generated a large gap between industry needs and what students have learned in their universities (industry-academia gap). The gap between students' skills and the skills required by employers often results in difficulty matching students with jobs. We have also found that CGPA and other common academic measures are not good indicators of technical employability of graduates.",
        "To mitigate these difficulties, we developed a data-driven intelligent system to create personalized careers and to map competencies to actual jobs based on historical academic performance data from students and job postings from employers at any given time. Specifically, we utilized a dual-source architecture mapping 3,785 student profiles against 2,272 actual employment postings."
      ],
      methodologies: [
        {
          title: 'Stacking Meta-Ensemble ML Model',
          desc: 'Developed a predictive model using Random Forest (RF), XGBoost, and LightGBM as base learners, with Logistic Regression acting as a meta-classifier to predict optimal career paths across ten macro-classes.'
        },
        {
          title: 'Competency Gap Vector Engine',
          desc: 'Created a cosine similarity-based vector space engine utilizing TF-IDF logic to measure specific competency gaps between individual students and current industry standards.'
        },
        {
          title: 'Dual-Source Data Ingestion',
          desc: 'Built an asynchronous ETL pipeline to aggregate unstructured data from regional job portals and academic repositories, harmonizing it into a highly discriminative decision boundary dataset.'
        }
      ],
      findings: [
        {
          metric: '87.05%',
          title: 'Peak Prediction Accuracy',
          desc: 'The stacking ensemble outshined all isolated baseline models, providing highly reliable predictive separability.'
        },
        {
          metric: 'r ≈ -0.05',
          title: 'Disproving the "CGPA Paradox"',
          desc: 'Provided quantitative evidence that CGPA has almost no correlation (Pearson r ≈ -0.05) with technical employability.'
        },
        {
          metric: 'Framework',
          title: 'Actionable Skill-Gap Framework',
          desc: 'Demonstrated that cross-functional skill diversity correlates directly to higher market remuneration, providing students with an evidence-based framework for bridging their skill gaps proactively.'
        }
      ],
      images: [
        '/images/projects/thesis-1.png',
        '/images/projects/thesis-2.png',
        '/images/projects/thesis-3.png',
        '/images/projects/thesis-4.png',
        '/images/projects/thesis-5.png'
      ]
    }
  }
]
