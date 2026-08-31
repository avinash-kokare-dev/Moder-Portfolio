import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  Activity,
  Zap,
  Gauge,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Cpu,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Sliders,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PERFORMANCE_DATASETS,
  CORE_WEB_VITALS_AUDITS,
} from '../../data/performanceData';
import {
  RadarMetricPoint,
  PerformanceCategoryData,
  WebVitalsAudit,
} from '../../types/performance';
import { fadeInUp, defaultViewport } from '../../utils/animations';
import styles from './PerformanceMetrics.module.scss';

export const PerformanceMetrics: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('core-web-vitals');
  const [selectedMetric, setSelectedMetric] = useState<string>('LCP');
  const [showProductionSeries, setShowProductionSeries] = useState<boolean>(true);
  const [showTargetSeries, setShowTargetSeries] = useState<boolean>(true);
  const [showBaselineSeries, setShowBaselineSeries] = useState<boolean>(true);

  const currentDataset: PerformanceCategoryData =
    PERFORMANCE_DATASETS.find((d) => d.id === activeCategoryId) || PERFORMANCE_DATASETS[0];

  // If selected metric is not in current dataset, default to first metric in current dataset
  const activeMetricPoint: RadarMetricPoint =
    currentDataset.radarData.find((m) => m.metric === selectedMetric) ||
    currentDataset.radarData[0];

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    const targetDataset = PERFORMANCE_DATASETS.find((d) => d.id === id);
    if (targetDataset && targetDataset.radarData.length > 0) {
      setSelectedMetric(targetDataset.radarData[0].metric);
    }
  };

  // Custom Radar Tooltip renderer
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint: RadarMetricPoint = payload[0].payload;
      return (
        <div className={styles.customTooltip}>
          <div className={styles.tooltipTitle}>
            {dataPoint.metric} - {dataPoint.fullName}
          </div>
          <div className={styles.tooltipItem}>
            <span className={styles.tooltipLabel}>Production (Avinash):</span>
            <span className={styles.tooltipValue} style={{ color: '#38bdf8' }}>
              {dataPoint.currentValue} ({dataPoint.score}/100)
            </span>
          </div>
          <div className={styles.tooltipItem}>
            <span className={styles.tooltipLabel}>Target Standard:</span>
            <span className={styles.tooltipValue} style={{ color: '#10b981' }}>
              {dataPoint.targetValue}
            </span>
          </div>
          <div className={styles.tooltipItem}>
            <span className={styles.tooltipLabel}>Baseline / Legacy:</span>
            <span className={styles.tooltipValue} style={{ color: '#f59e0b' }}>
              {dataPoint.baselineValue}
            </span>
          </div>
          <div className={styles.tooltipTechnique}>
            💡 <strong>Key Architecture:</strong> {dataPoint.technique}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="metrics" className={styles.performanceSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>CORE WEB VITALS & SYSTEM OPTIMIZATION</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Performance Metrics & Radar Telemetry
          </h2>
          <p className={styles.sectionSubtitle}>
            Real-world Core Web Vitals telemetry, sub-50ms tail latency benchmarks, and production load test data visualized across multi-dimensional performance vectors.
          </p>
        </motion.div>

        {/* Category Switcher Tabs */}
        <motion.div
          className={styles.tabsNavWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={1}
        >
          <div className={styles.tabsList} role="tablist" aria-label="Performance Metric Categories">
            {PERFORMANCE_DATASETS.map((dataset) => {
              const isActive = dataset.id === activeCategoryId;
              return (
                <button
                  key={dataset.id}
                  type="button"
                  role="tab"
                  id={`perf-tab-${dataset.id}`}
                  aria-selected={isActive}
                  aria-controls={`perf-panel-${dataset.id}`}
                  className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                  onClick={() => handleCategoryChange(dataset.id)}
                >
                  <span className={styles.tabIconBox}>
                    {dataset.id === 'core-web-vitals' && <Gauge size={14} />}
                    {dataset.id === 'system-scalability' && <Activity size={14} />}
                    {dataset.id === 'full-stack-audit' && <Cpu size={14} />}
                  </span>
                  <span className={styles.tabLabel}>{dataset.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Stage Grid: Radar Chart Visualizer + KPI & Metric Deep-Dive */}
        <div className={styles.mainStageGrid}>
          {/* Radar Chart Card */}
          <motion.div
            className={styles.chartCard}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            custom={2}
          >
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleBox}>
                <h3 className={styles.chartTitle}>{currentDataset.title}</h3>
                <span className={styles.chartSubtitle}>{currentDataset.subtitle}</span>
              </div>

              {/* Series Toggles */}
              <div className={styles.seriesToggles}>
                <button
                  type="button"
                  className={`${styles.seriesToggleBtn} ${showProductionSeries ? styles.activeSeries : ''}`}
                  style={{ '--series-color': '#38bdf8', '--dot-color': '#38bdf8' } as React.CSSProperties}
                  onClick={() => setShowProductionSeries(!showProductionSeries)}
                  aria-label="Toggle Avinash Production series"
                >
                  <span className={styles.seriesDot} />
                  <span>Avinash (Production)</span>
                </button>

                <button
                  type="button"
                  className={`${styles.seriesToggleBtn} ${showTargetSeries ? styles.activeSeries : ''}`}
                  style={{ '--series-color': '#10b981', '--dot-color': '#10b981' } as React.CSSProperties}
                  onClick={() => setShowTargetSeries(!showTargetSeries)}
                  aria-label="Toggle Target Threshold series"
                >
                  <span className={styles.seriesDot} />
                  <span>Target Threshold</span>
                </button>

                <button
                  type="button"
                  className={`${styles.seriesToggleBtn} ${showBaselineSeries ? styles.activeSeries : ''}`}
                  style={{ '--series-color': '#f59e0b', '--dot-color': '#f59e0b' } as React.CSSProperties}
                  onClick={() => setShowBaselineSeries(!showBaselineSeries)}
                  aria-label="Toggle Industry Baseline series"
                >
                  <span className={styles.seriesDot} />
                  <span>Industry Baseline</span>
                </button>
              </div>
            </div>

            {/* Recharts Radar Container */}
            <div className={styles.radarContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="78%"
                  data={currentDataset.radarData}
                >
                  <PolarGrid stroke="rgba(255, 255, 255, 0.12)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="rgba(255, 255, 255, 0.15)"
                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomRadarTooltip />} />

                  {/* Baseline / Legacy Series */}
                  {showBaselineSeries && (
                    <Radar
                      name="Industry Baseline"
                      dataKey="baseline"
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      fill="#f59e0b"
                      fillOpacity={0.08}
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Target Standard Series */}
                  {showTargetSeries && (
                    <Radar
                      name="Target Good Threshold"
                      dataKey="target"
                      stroke="#10b981"
                      strokeDasharray="2 2"
                      fill="#10b981"
                      fillOpacity={0.12}
                      strokeWidth={1.8}
                    />
                  )}

                  {/* Avinash Production Series */}
                  {showProductionSeries && (
                    <Radar
                      name="Avinash (Production)"
                      dataKey="score"
                      stroke="#38bdf8"
                      fill="#38bdf8"
                      fillOpacity={0.32}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 1.5 }}
                    />
                  )}
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Interactive Metric Chips */}
            <div className={styles.metricChipsList}>
              {currentDataset.radarData.map((pt) => {
                const isSelected = pt.metric === selectedMetric;
                return (
                  <button
                    key={pt.metric}
                    type="button"
                    className={`${styles.metricChipBtn} ${isSelected ? styles.activeChip : ''}`}
                    onClick={() => setSelectedMetric(pt.metric)}
                  >
                    <span>{pt.metric}: {pt.currentValue}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Side Panel: KPI Summary Cards & Selected Metric Inspector */}
          <motion.div
            className={styles.sidePanel}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            custom={3}
          >
            {/* KPI Summary Grid */}
            <div className={styles.summaryKpiGrid}>
              {currentDataset.summaryMetrics.map((kpi, idx) => (
                <div key={idx} className={styles.kpiCard}>
                  <div className={styles.kpiValueRow}>
                    <span className={styles.kpiValue}>{kpi.value}</span>
                    <span className={styles.kpiChangeBadge}>
                      {kpi.trend === 'down' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                      <span>{kpi.change}</span>
                    </span>
                  </div>
                  <span className={styles.kpiLabel}>{kpi.label}</span>
                  <span className={styles.kpiSublabel}>{kpi.sublabel}</span>
                </div>
              ))}
            </div>

            {/* Active Metric Inspector Box */}
            <div className={styles.metricInspectorCard}>
              <div className={styles.inspectorHeader}>
                <div className={styles.inspectorTitleRow}>
                  <span className={styles.metricBadge}>{activeMetricPoint.metric}</span>
                  <span className={styles.metricFullTitle}>{activeMetricPoint.fullName}</span>
                </div>
                <div className={styles.statusPill}>
                  <CheckCircle2 size={12} />
                  <span>Production Optimal</span>
                </div>
              </div>

              {/* Benchmark Comparison */}
              <div className={styles.benchmarkComparison}>
                <div className={styles.comparisonRow}>
                  <span className={styles.comparisonLabel}>
                    <Sparkles size={12} color="#38bdf8" />
                    <strong>Avinash Production:</strong>
                  </span>
                  <span className={styles.comparisonVal} style={{ color: '#38bdf8' }}>
                    {activeMetricPoint.currentValue} ({activeMetricPoint.score}/100)
                  </span>
                </div>
                <div className={styles.comparisonRow}>
                  <span className={styles.comparisonLabel}>
                    <ShieldCheck size={12} color="#10b981" />
                    <span>Target Good Threshold:</span>
                  </span>
                  <span className={styles.comparisonVal} style={{ color: '#10b981' }}>
                    {activeMetricPoint.targetValue}
                  </span>
                </div>
                <div className={styles.comparisonRow}>
                  <span className={styles.comparisonLabel}>
                    <Activity size={12} color="#f59e0b" />
                    <span>Legacy / Industry Avg:</span>
                  </span>
                  <span className={styles.comparisonVal} style={{ color: '#f59e0b' }}>
                    {activeMetricPoint.baselineValue}
                  </span>
                </div>
              </div>

              {/* Architectural Technique Deep-Dive */}
              <div className={styles.techniqueBox}>
                <span className={styles.techniqueLabel}>
                  <Zap size={12} />
                  <span>Engineering Strategy</span>
                </span>
                <p className={styles.techniqueText}>{activeMetricPoint.technique}</p>
              </div>

              {/* Measurable Production Impact */}
              <div className={styles.impactBox}>
                <strong>Measurable Impact:</strong> {activeMetricPoint.impactDescription}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Six-Pack Core Web Vitals Audit Field Badges */}
        {activeCategoryId === 'core-web-vitals' && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            custom={4}
          >
            <div className={styles.vitalsSectionHeader}>
              <Gauge size={18} color="var(--accent-emerald)" />
              <h3 className={styles.vitalsSectionTitle}>
                Official Core Web Vitals Field Audits (CrUX 75th Percentile)
              </h3>
            </div>

            <div className={styles.vitalsGrid}>
              {CORE_WEB_VITALS_AUDITS.map((vital) => (
                <div key={vital.acronym} className={styles.vitalCard}>
                  <div className={styles.vitalCardHeader}>
                    <span className={styles.vitalAcronym}>{vital.acronym}</span>
                    <span className={styles.vitalRatingBadge}>
                      <CheckCircle2 size={12} />
                      <span>{vital.rating} ({vital.score}/100)</span>
                    </span>
                  </div>

                  <div className={styles.vitalName}>{vital.metricName}</div>

                  <div className={styles.vitalScoreRow}>
                    <span className={styles.vitalProdVal}>{vital.productionVal}</span>
                    <span className={styles.vitalThreshold}>{vital.thresholdVal}</span>
                  </div>

                  <p className={styles.vitalDesc}>{vital.description}</p>

                  <div className={styles.vitalSolutionBox}>
                    <strong>Implementation:</strong> {vital.architectureSolution}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Architectural Optimization Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={5}
        >
          <div className={styles.pillarsSectionHeader}>
            <Sliders size={18} color="var(--accent-cyan)" />
            <h3 className={styles.pillarsTitle}>
              Architecture Optimization Case Highlights
            </h3>
          </div>

          <div className={styles.pillarsGrid}>
            {currentDataset.optimizationPillars.map((pillar, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarTagRow}>
                  <span className={styles.pillarTag}>{pillar.tag}</span>
                </div>

                <h4 className={styles.pillarTitle}>{pillar.title}</h4>

                <div className={styles.diffBox}>
                  <div className={styles.diffItem}>
                    <span className={styles.diffLabelBefore}>Before Optimization:</span>
                    <span className={styles.diffText}>{pillar.before}</span>
                  </div>
                  <div className={styles.diffItem}>
                    <span className={styles.diffLabelAfter}>After Refactor:</span>
                    <span className={styles.diffText}>{pillar.after}</span>
                  </div>
                </div>

                <p className={styles.pillarStrategy}>{pillar.strategy}</p>

                <div className={styles.pillarImpactRow}>
                  <Flame size={14} />
                  <span>{pillar.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
