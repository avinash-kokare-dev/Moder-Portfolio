import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Award, Calendar, MapPin, CheckCircle, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import { EXPERIENCES } from '../../data/experience';
import { ExperienceItem } from '../../types';
import styles from './Experience.module.scss';

export const ExperienceTimeline: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  return (
    <div className={styles.timelineContainer}>
      {/* Promotion Callout Banner */}
      <div className={styles.promotionBanner}>
        <div className={styles.promotionIconBox}>
          <Award size={18} className={styles.awardIcon} />
        </div>
        <div className={styles.promotionText}>
          <strong>Career Progression:</strong> Promoted from <em>Software Engineer</em> to <em>Senior Software Engineer</em> at <strong>OZiva (HUL)</strong> in recognition of driving flagship SSR edge architecture, performance optimization, and distributed systems leadership.
        </div>
      </div>

      {/* Main Interactive Vertical Timeline */}
      <div className={styles.timelineTrack}>
        {EXPERIENCES.map((exp, index) => {
          const isActive = activeExpId === exp.id;

          return (
            <div
              key={exp.id}
              id={`experience-item-${exp.id}`}
              className={`${styles.timelineNodeBlock} ${isActive ? styles.activeNodeBlock : ''}`}
            >
              {/* Left Timeline Axis */}
              <div className={styles.axisColumn}>
                <div
                  className={`${styles.axisPoint} ${isActive ? styles.activePoint : ''} ${
                    exp.isPromotion ? styles.promotionPoint : ''
                  }`}
                  onClick={() => setActiveExpId(exp.id)}
                >
                  {exp.isPromotion ? (
                    <Award size={14} className={styles.pointIcon} />
                  ) : (
                    <span className={styles.innerDot} />
                  )}
                </div>
                {index < EXPERIENCES.length - 1 && <div className={styles.axisConnector} />}
              </div>

              {/* Experience Card Content */}
              <div
                className={`${styles.experienceCard} ${isActive ? styles.activeCard : ''}`}
                onClick={() => setActiveExpId(exp.id)}
              >
                {/* Card Header */}
                <div className={styles.expCardHeader}>
                  <div className={styles.roleGroup}>
                    <div className={styles.roleTitleRow}>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      {exp.isPromotion && (
                        <span className={styles.promotionBadge}>
                          <Zap size={11} />
                          PROMOTED
                        </span>
                      )}
                    </div>
                    <div className={styles.companyRow}>
                      <span className={styles.companyName}>{exp.company}</span>
                      {exp.parentCompany && (
                        <span className={styles.parentCompany}>({exp.parentCompany})</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.metaGroup}>
                    <div className={styles.periodBadge}>
                      <Calendar size={13} />
                      <span>{exp.period}</span>
                    </div>
                    <div className={styles.locationBadge}>
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className={styles.expSummary}>{exp.summary}</p>

                {/* Key Metrics / Highlights */}
                {exp.keyMetrics && (
                  <div className={styles.expMetricsRow}>
                    {exp.keyMetrics.map((km) => (
                      <div key={km.label} className={styles.expMetricChip}>
                        <span className={styles.kmVal}>{km.value}</span>
                        <span className={styles.kmLabel}>{km.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* High-Signal Architecture Bullets */}
                <div className={styles.highlightsContainer}>
                  <span className={styles.highlightsTitle}>Architectural Highlights & Ownership:</span>
                  <ul className={styles.highlightsList}>
                    {exp.architectureHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        <CheckCircle size={14} className={styles.bulletCheck} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className={styles.techUsedRow}>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
