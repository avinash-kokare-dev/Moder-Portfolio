export interface RadarMetricPoint {
  metric: string;
  fullName: string;
  score: number;        // 0 - 100
  target: number;       // standard target (e.g. 75)
  baseline: number;     // legacy / average (e.g. 45-60)
  currentValue: string; // e.g. "1.1s", "38ms"
  targetValue: string;  // e.g. "< 2.5s", "< 200ms"
  baselineValue: string;// e.g. "3.8s", "240ms"
  status: 'optimal' | 'good' | 'needs-work';
  category: string;
  technique: string;
  impactDescription: string;
}

export interface PerformanceCategoryData {
  id: string;
  title: string;
  subtitle: string;
  radarData: RadarMetricPoint[];
  summaryMetrics: {
    label: string;
    value: string;
    sublabel: string;
    change: string;
    trend: 'up' | 'down';
  }[];
  optimizationPillars: {
    title: string;
    tag: string;
    before: string;
    after: string;
    impact: string;
    strategy: string;
    codePattern?: string;
  }[];
}

export interface WebVitalsAudit {
  metricName: string;
  acronym: string;
  score: number;
  rating: 'Good' | 'Needs Improvement' | 'Poor';
  productionVal: string;
  thresholdVal: string;
  description: string;
  architectureSolution: string;
}
