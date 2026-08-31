export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  parentCompany?: string;
  period: string;
  startDate: string;
  endDate: string;
  location: string;
  isPromotion?: boolean;
  promotedFrom?: string;
  summary: string;
  architectureHighlights: string[];
  keyMetrics?: { label: string; value: string }[];
  technologies: string[];
  companyUrl?: string;
}

export interface MetricItem {
  id: string;
  value: string;
  unit?: string;
  label: string;
  sublabel: string;
  detail: string;
  badge?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack & SSR' | 'Backend & Distributed Systems' | 'Event-Driven Architecture';
  featured: boolean;
  problem: string;
  solution: string;
  architectureDiagram?: string;
  impactMetrics: { label: string; value: string; description: string }[];
  technicalChallenges: { title: string; explanation: string; solution: string }[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SystemNode {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'cache' | 'queue' | 'database' | 'worker';
  label: string;
  sublabel: string;
  tech: string;
  latency: string;
  description: string;
  responsibilities: string[];
  failureStrategy: string;
  connectedTo: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: 'Core' | 'Advanced' | 'Expert';
    context: string;
    icon?: string;
  }[];
}

export interface EngineeringPrinciple {
  id: string;
  principle: string;
  context: string;
  example: string;
  codeSnippet?: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  flowSteps: { step: number; title: string; desc: string; latency?: string }[];
  keyTradeoff: string;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  tags: string[];
  architectureFocus: string;
  url: string;
}
