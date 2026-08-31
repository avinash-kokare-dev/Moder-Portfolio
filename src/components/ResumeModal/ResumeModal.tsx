import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, IMPACT_METRICS } from '../../data/experience';
import { PROFESSIONAL_TITLE, SKILL_CATEGORIES } from '../../data/skills';
import styles from './ResumeModal.module.scss';
import { getYearOfExperience } from '@/src/utils/helper';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };
  

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div
          className={styles.modalContainer}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Actions Bar */}
          <div className={styles.modalActionsBar}>
            <div className={styles.modalTitleBadge}>
              <span>ENGINEERING RESUME // AVINASH KOKARE</span>
            </div>
            <div className={styles.actionsGroup}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handlePrint}
                title="Print or Save as PDF"
              >
                <Printer size={15} />
                <span>Print / Save PDF</span>
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Canvas */}
          <div className={styles.documentBody}>
            {/* Header */}
            <header className={styles.docHeader}>
              <div className={styles.headerLeft}>
                <h1 className={styles.candidateName}>Avinash Kokare</h1>
                <h2 className={styles.candidateRole}>{PROFESSIONAL_TITLE} ({getYearOfExperience()}+ Years Experience)</h2>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.contactLine}>
                  <Mail size={13} />
                  <span>avknash114@gmail.com</span>
                </div>
                <div className={styles.contactLine}>
                  <MapPin size={13} />
                  <span>Mumbai, India (Open to Remote / Relocation)</span>
                </div>
                <div className={styles.contactLine}>
                  <ExternalLink size={13} />
                  <span>linkedin.com/in/avinash-kokare</span>
                </div>
              </div>
            </header>

            {/* Executive Summary */}
            <section className={styles.docSection}>
              <h3 className={styles.docSectionTitle}>Executive Summary</h3>
              <p className={styles.summaryText}>
                Senior Full-Stack Engineer with 7.5+ years of production experience architecting high-throughput distributed systems, SSR edge runtimes (Next.js / Shopify Hydrogen), in-memory caching topologies (Redis), and event-driven microservices (Kafka). Proven track record driving 35% bounce rate reductions and 20 → 75+ Core Web Vitals optimizations for high-volume consumer commerce platforms.
              </p>
            </section>

            {/* Measurable Production Impact */}
            <section className={styles.docSection}>
              <h3 className={styles.docSectionTitle}>Key Production Outcomes</h3>
              <div className={styles.metricsSummaryGrid}>
                {IMPACT_METRICS.slice(0, 4).map((m) => (
                  <div key={m.id} className={styles.resumeMetric}>
                    <span className={styles.rVal}>{m.value}</span>
                    <span className={styles.rLabel}>{m.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience */}
            <section className={styles.docSection}>
              <h3 className={styles.docSectionTitle}>Professional Experience</h3>
              <div className={styles.experienceStack}>
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className={styles.resumeExpItem}>
                    <div className={styles.expHeaderRow}>
                      <div className={styles.expTitleGroup}>
                        <h4 className={styles.resumeRoleTitle}>{exp.role}</h4>
                        <span className={styles.resumeCompany}>
                          {exp.company} {exp.parentCompany && `(${exp.parentCompany})`}
                        </span>
                      </div>
                      <div className={styles.resumePeriod}>{exp.period}</div>
                    </div>
                    <ul className={styles.resumeBulletList}>
                      {exp.architectureHighlights.map((hl, hIdx) => (
                        <li key={hIdx} className={styles.resumeBullet}>
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills Overview */}
            <section className={styles.docSection}>
              <h3 className={styles.docSectionTitle}>Technical Skills</h3>
              <div className={styles.skillsSummaryList}>
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.category} className={styles.skillRow}>
                    <span className={styles.skillCatName}>{cat.category}:</span>
                    <span className={styles.skillItemsText}>
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
