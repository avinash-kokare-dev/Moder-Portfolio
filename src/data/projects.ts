import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'shopify-hydrogen-migration',
    title: 'Shopify Hydrogen SSR Architecture',
    subtitle: 'Migrating a Legacy E-Commerce Storefront from CSR to SSR',
    category: 'Full-Stack & SSR',
    featured: true,
    problem:
      'The existing CSR storefront had large JavaScript bundles and slow page loading, especially on mobile devices. This resulted in poor Core Web Vitals and a Lighthouse mobile score of around 20. Users experienced slower initial page loads and interactions. This also contributed to higher bounce rates during major promotional campaigns. The goal was to improve the overall storefront performance by moving towards SSR.',
    solution:
      'Migrated the existing storefront from CSR to Shopify Hydrogen with SSR to improve initial page loading and mobile performance. Implemented frontend caching to reduce repeated data fetching and improve page response times. Used code splitting and lazy loading to reduce the amount of JavaScript loaded initially. Optimized critical CSS and reduced unnecessary client-side JavaScript execution. These changes improved Core Web Vitals, Lighthouse scores, and the overall storefront experience.',
    impactMetrics: [
      {
        label: 'Page Speed',
        value: '20 → 75+',
        description: 'Over 275% improvement in mobile performance score and Web Vitals.',
      },
      {
        label: 'Bounce Rate',
        value: '↓ 30–35%',
        description: 'Instant First Contentful Paint (FCP) retained initial landing traffic.',
      },
      {
        label: 'Organic Conversion',
        value: '~2–3% → ~4–5%',
        description: 'Near doubling of checkout conversions driven by sub-second navigation.',
      },
      {
        label: 'Traffic Surge Handling',
        value: '3–5×',
        description: 'Handled high-volume flash sales with zero downtime or performance degradation.',
      },
    ],
    technicalChallenges: [

      {
        title: 'Hydration & JavaScript Performance',

        explanation:
          'The CSR storefront loaded and executed a large amount of JavaScript before the page became interactive, resulting in slow initial loading, especially on mobile networks.',

        solution:
          'Migrated the storefront to Shopify Hydrogen with SSR to render the initial page on the server. Used code splitting and lazy loading to reduce the JavaScript required during the initial load.',
      },

      {
        title: 'API Requests & Frontend Caching',

        explanation:
          'Repeated API requests for frequently accessed storefront data increased loading time and added unnecessary network overhead.',

        solution:
          'Implemented frontend caching to reuse previously fetched data and reduce unnecessary API calls. Optimized data fetching to improve page load and overall application responsiveness.',
      },

      {
        title: 'Third-Party Scripts & Client-Side Performance',

        explanation:
          'Analytics and third-party tracking scripts added additional JavaScript execution and affected page responsiveness, especially on mobile devices.',

        solution:
          'Loaded non-critical third-party scripts asynchronously and deferred them where possible. Reduced unnecessary client-side execution to improve INP and overall Core Web Vitals.',
      },

    ],
    technologies: ['React', 'Next.js / Hydrogen', 'TypeScript', 'Shopify Storefront API', 'Redis', 'Node.js', 'SCSS Modules', 'Edge CDN', 'Core Web Vitals'],
    // githubUrl: 'https://github.com/avinash-kokare',
    liveUrl: 'https://www.oziva.com/',
  },
  {
    id: 'railway-booking-system',
    title: 'IRCTC-Style Railway Booking System',
    subtitle: 'Designing Concurrent Seat Booking & Preventing Double Booking',
    category: 'Backend & Distributed Systems',
    featured: true,
    problem:
      'During peak booking periods, multiple users may try to book the same seat at the same time. A simple check-then-update approach can create race conditions and result in the same seat being assigned to multiple users. The system also needs to handle temporary seat holds, payment failures, and booking retries safely.  The goal of this project was to design a booking flow that maintains seat consistency under concurrent requests.',
    solution:
      'Designed a microservice-based railway booking system using PostgreSQL for persistent booking data and Redis for temporary seat holds and distributed locking. Implemented PostgreSQL row-level locking with SELECT FOR UPDATE to prevent concurrent bookings from modifying the same seat. Used Kafka for asynchronous booking and notification events, and implemented a Saga-based flow to handle failures across booking and payment steps. Added idempotency and transaction handling to make retries safe and prevent duplicate bookings.',
    impactMetrics: [],
    technicalChallenges: [
      {
        title: 'Concurrent Bookings & Double Booking',

        explanation:
          'Multiple users can try to book the same seat at the same time. A simple availability check followed by an update can create a race condition and allow the same seat to be booked more than once.',

        solution:
          'Implemented Redis-based distributed locking for short-lived seat holds and PostgreSQL row-level locking using `SELECT ... FOR UPDATE` to ensure that concurrent requests cannot update the same seat simultaneously.',
      },

      {
        title: 'Consistency Across Booking Services',

        explanation:
          'The booking flow involves multiple steps such as seat reservation, payment, and ticket confirmation. A failure in one step should not leave the booking in an inconsistent state.',

        solution:
          'Implemented a Saga-based booking flow with Kafka events to coordinate the different steps. Added compensating actions to release the seat when a later step such as payment fails.',
      },

      {
        title: 'Idempotency & Duplicate Requests',

        explanation:
          'Network retries or repeated payment callbacks can cause the same booking operation to be processed multiple times.',

        solution:
          'Added idempotency checks using unique request keys and Redis atomic operations to ensure that the same booking or payment event is processed only once.',
      },
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Prisma ORM', 'TypeScript', 'Docker', 'Saga Pattern', 'Microservices'],
    githubUrl: 'https://github.com/avinash-kokare-dev/IRCTC-Backend',
  },
  {
    id: 'ai-expense-tracker',

    title: 'AI-Powered Expense Tracker',

    subtitle: 'Automated Expense Analysis and Smart Spending Insights',

    category: 'AI Application',

    featured: false,

    problem:
      'Manually categorizing expenses and understanding spending patterns can be time-consuming, especially when transactions come from statements with inconsistent descriptions.',

    solution:
      'Built an AI-powered expense tracker that uses Google AI Studio/Gemini to analyze expense data and categorize transactions. Integrated Firebase and Firestore for authentication and storing user expense data, with a dashboard for tracking and reviewing spending patterns.',

    impactMetrics: [
      {
        label: 'Expense Processing',
        value: 'AI-Assisted',
        description:
          'Uses AI to analyze transaction information and suggest expense categories.',
      },
      {
        label: 'Expense Tracking',
        value: 'Centralized',
        description:
          'Provides a single dashboard to review and track expenses over time.',
      },
    ],

    technicalChallenges: [
      {
        title: 'AI-Based Expense Categorization',

        explanation:
          'Expense descriptions can vary significantly, making rule-based categorization difficult to maintain.',

        solution:
          'Integrated Gemini to analyze transaction information and generate meaningful expense categories based on the transaction context.',
      },

      {
        title: 'Reliable AI Response Handling',

        explanation:
          'AI-generated responses need to be handled consistently before they can be used by the application.',

        solution:
          'Added structured handling around AI responses so the application can process and display the generated expense information in a predictable format.',
      },

      {
        title: 'User Data & Expense Storage',

        explanation:
          'Expense data needs to be securely associated with the correct user and persisted for future tracking.',

        solution:
          'Used Firebase Authentication for user access and Firestore for storing and retrieving user-specific expense data.',
      },
    ],

    technologies: [
      'TypeScript',
      'React',
      'Google Gemini',
      'Google AI Studio',
      'Firebase',
      'Firestore'
    ],

    githubUrl:
      'https://github.com/avinash-kokare-dev/AI-Expense-Tracker-with-Google-AI-Studio',
  }
];
