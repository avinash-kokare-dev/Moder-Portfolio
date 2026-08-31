import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend & Architecture',
    description: 'Modern component architectures, critical render path optimization, and responsive design systems.',
    skills: [
      {
        name: 'React.JS',
        context: 'Server Components, custom hooks, state management, and memoization patterns.',
      },
      {
        name: 'Next.js & Remix',
        // level: 'Expert',
        context: 'App Router, SSR streaming, ISR, middleware, and hydration.',
      },
      {
        name: 'TypeScript',
        // level: 'Expert',
        context: 'Strict typing, generic abstractions, discriminated unions, utility types, and API contract safety.',
      },
      {
        name: 'Shopify Hydrogen',
        // level: 'Advanced',
        context: 'Headless e-commerce, Storefront API integration',
      },
      {
        name: 'Core Web Vitals & WebPerf',
        // level: 'Expert',
        context: 'INP/LCP/CLS auditing, critical CSS inlining, font subsetting, bundle tree-shaking, and performance budgets.',
      },
      {
        name: 'React Native',
        // level: 'Advanced',
        context: 'Cross-platform mobile UI, native bridge integrations, and state synchronization across web & mobile.',
      },
    ],
  },
  {
    category: 'Backend & Microservices',
    description: 'Scalable Node.js services, REST APIs, event-driven workflows, and caching implementations.',
    skills: [
      {
        name: 'Node.js & Express',
        level: 'Expert',
        context: 'Node.js Architecture, Express middleware, async patterns, and error handling best practices.',
      },
      {
        name: 'RESTful APIs',
        level: 'Advanced',
        context: 'API design, authentication, validation, error handling, pagination, caching, and service integrations.',
      },
      {
        name: 'Microservices & Distributed Systems',
        level: 'Advanced',
        context: 'Service design, API communication, distributed locking, event-driven workflows, and handling consistency across services.',
      },
    ],
  },
  {
    category: 'Data & Storage',
    description: 'Relational data modeling, transactional isolation, indexing strategies, and high-speed in-memory caches.',
    skills: [
      {
        name: 'PostgreSQL',
        level: 'Advanced',
        context: 'Data modeling, indexing, transactions, query optimization, and concurrency control.',
      },
      {
        name: 'Redis',
        level: 'Advanced',
        context: 'Caching, TTL-based expiration, distributed locking, sessions, and rate limiting.',
      },
      {
        name: 'SQL & Prisma',
        level: 'Advanced',
        context: 'Schema design, migrations, transactions, query optimization, and database integration.',
      },
    ],
  },
  {
    category: 'Messaging & Asynchronous Systems',

    description:
      'Event-driven processing and asynchronous workflows for reliable backend operations.',

    skills: [
      {
        name: 'Apache Kafka',
        level: 'Advanced',
        context: 'Topics, partitions, consumer groups, async processing, and DLQ handling.',
      },

      {
        name: 'Event-Driven Architecture',
        level: 'Advanced',
        context: 'Asynchronous workflows, service decoupling, and event processing.',
      },
    ],
  },
  {
    category: 'Cloud & DevOps',

    description:
      'Containerized applications, basic AWS services, and automated development workflows.',

    skills: [
      {
        name: 'Docker',
        context: 'Containerizing applications, Dockerfiles, and local development environments.',
      },

      {
        name: 'AWS',
        context: 'EC2, S3, CloudFront, RDS, IAM, and basic cloud deployments.',
      },

      {
        name: 'Nginx',
        context: 'Reverse proxy and basic server configuration.',
      },

      {
        name: 'CI/CD',
        context: 'GitHub Actions and basic automated build and deployment workflows.',
      },
    ],
  },
  {
    category: 'System Design & Core Engineering',

    description:
      'System design fundamentals applied through production work and hands-on backend projects.',

    skills: [
      {
        name: 'System Design & Scalability',
        level: 'Advanced',
        context: 'Load balancing, caching, horizontal scaling, database scaling, and service architecture.',
      },

      {
        name: 'Performance Engineering',
        level: 'Advanced',
        context: 'Core Web Vitals, rendering optimization, bundle optimization, and API performance.',
      },

      {
        name: 'Reliability & Distributed Systems',
        context: 'Hands-on experience with idempotency, distributed locking, retries, transactions, and failure handling.',
      },
    ],
  },
];

export const PROFESSIONAL_TITLE = 'Senior Software Engineer';