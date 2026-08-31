import React from 'react';
import { Award, Calendar, MapPin, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../../data/experience';
import { fadeInUp, defaultViewport, staggerContainer, staggerItem } from '../../utils/animations';
import styles from './Experience.module.scss';
import { getYearOfExperience } from '../../utils/helper';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className={styles.experienceSection}>
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
            <span className={styles.badgeText}>CAREER & LEADERSHIP</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Work Experience
          </h2>
          <p className={styles.sectionSubtitle}>
            Over {getYearOfExperience()} years of engineering ownership, driving SSR migrations, and resilient backend systems.
          </p>
        </motion.div>

        {/* Career Promotion Callout Banner */}
        <motion.div
          className={styles.promotionBanner}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={1}
        >
          <div className={styles.awardIconBox}>
            <Award size={20} className={styles.awardIcon} />
          </div>
          <div className={styles.promotionText}>
            <strong>Career Progression:</strong> Promoted from <em>Software Engineer</em> to <em>Senior Software Engineer</em> at <strong>OZiva (Hindustan Unilever)</strong> based on contributions to frontend architecture, SSR implementation, performance optimization, and product development.
          </div>
        </motion.div>

        {/* Experience Cards List */}
        <motion.div
          className={styles.experienceList}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              className={styles.expCard}
              variants={staggerItem}
            >
              {/* Header: Role & Metadata */}
              <div className={styles.expHeader}>
                <div className={styles.roleGroup}>
                  <div className={styles.roleTitleRow}>
                    <h3 className={styles.roleName}>{exp.role}</h3>
                    {exp.isPromotion && (
                      <span className={styles.promotionTag}>
                        <Zap size={12} />
                        PROMOTED
                      </span>
                    )}
                  </div>
                  <a className={styles.companyRow} href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                    <span className={styles.companyName}>{exp.company}</span>
                    {exp.parentCompany && (
                      <span className={styles.parentOrg}>· {exp.parentCompany}</span>
                    )}
                  </a>
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

              {/* Key Metrics */}
              {exp.keyMetrics && exp.keyMetrics.length > 0 && (
                <div className={styles.metricsRow}>
                  {exp.keyMetrics.map((km) => (
                    <div key={km.label} className={styles.metricChip}>
                      <span className={styles.metricVal}>{km.value}</span>
                      <span className={styles.metricLbl}>{km.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architectural Highlights */}
              <div className={styles.highlightsContainer}>
                <span className={styles.highlightsTitle}>Key Contributions & Ownership:</span>
                <ul className={styles.highlightsList}>
                  {exp.architectureHighlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlightItem}>
                      <CheckCircle size={15} className={styles.checkIcon} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className={styles.techTagsRow}>
                {exp.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
