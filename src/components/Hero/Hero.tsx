import React from 'react';
import { FileText, ChevronRight, Sparkles, Code2, Database, Mail, Briefcase, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem, defaultViewport } from '../../utils/animations';
import styles from './Hero.module.scss';
import { PROFESSIONAL_TITLE } from '@/src/data/skills';
import { getYearOfExperience, handleDownload } from '@/src/utils/helper';


export const Hero = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Role & Seniority Pill */}
          <motion.div
            className={styles.statusPill}
            variants={staggerItem}
          >
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Senior Software Engineer @ OZiva (HUL)</span>
            <span className={styles.statusDivider}>·</span>
            <span className={styles.statusSub}>{getYearOfExperience()} Yrs Exp</span>
          </motion.div>

          {/* Engineer Name */}
          <motion.h1
            className={styles.engineerName}
            variants={staggerItem}
          >
            Avinash Kokare
          </motion.h1>

          {/* Role Tagline */}
          <motion.div
            className={styles.roleTagline}
            variants={staggerItem}
          >
            {PROFESSIONAL_TITLE}
          </motion.div>

          {/* Value Statement */}
          <motion.p
            className={styles.missionStatement}
            variants={staggerItem}
          >
            <strong>Engineering high-throughput systems, not just interfaces.</strong>
            Building scalable web and mobile applications with a strong focus on frontend architecture and user experience.
            Experienced in React, Next.js, React Native, TypeScript, and modern JavaScript ecosystems.
            Hands-on with SSR, performance optimization, API integration, caching, and production-grade application architecture.
            Comfortable working across the stack with Node.js, PostgreSQL, Redis, Kafka, Docker, and cloud technologies.
            Focused on building reliable, maintainable systems that perform well in real-world production environments.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className={styles.ctaGroup}
            variants={staggerItem}
          >
            <a href="#projects" className={styles.primaryCta} id="hero-explore-projects-btn">
              <span>View Featured Projects</span>
              <ChevronRight size={16} />
            </a>

            <a href="#experience" className={styles.secondaryCta} id="hero-experience-btn">
              <Briefcase size={16} />
              <span>Experience</span>
            </a>

            <button
              type="button"
              className={styles.resumeCta}
              onClick={() => handleDownload()}
              id="hero-view-resume-btn"
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>

            <a href="#contact" className={styles.ghostCta} id="hero-contact-btn">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </motion.div>

          {/* Quick Metrics Summary Cards */}
          {/* <motion.div
            className={styles.heroMetricsGrid}
            variants={staggerItem}
          >
            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <Zap size={20} className={styles.metricIcon} />
              </div>
              <div className={styles.metricData}>
                <span className={styles.metricValue}>68%</span>
                <span className={styles.metricLabel}>LCP & Page Load Speedup</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <ShieldCheck size={20} className={styles.metricIcon} />
              </div>
              <div className={styles.metricData}>
                <span className={styles.metricValue}>Zero</span>
                <span className={styles.metricLabel}>Race Conditions (Redlock)</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <TrendingUp size={20} className={styles.metricIcon} />
              </div>
              <div className={styles.metricData}>
                <span className={styles.metricValue}>2.5M+</span>
                <span className={styles.metricLabel}>Daily Transaction Volume</span>
              </div>
            </div>
          </motion.div> */}

          {/* Tech Pillars Snapshot */}
          <motion.div
            className={styles.techPillars}
            variants={staggerItem}
          >
            <div className={styles.pillarItem}>
              <Code2 size={15} className={styles.pillarIcon} />
              <span>React · Next.js · SSR · TypeScript</span>
            </div>
            <div className={styles.pillarItem}>
              <Database size={15} className={styles.pillarIcon} />
              <span>Node.js · Redis · Kafka · PostgreSQL</span>
            </div>
            <div className={styles.pillarItem}>
              <Sparkles size={15} className={styles.pillarIcon} />
              <span>Core Web Vitals & Distributed Systems</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
