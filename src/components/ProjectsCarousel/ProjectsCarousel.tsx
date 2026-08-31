import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, CheckCircle, Zap, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../../data/projects';
import { CaseStudy } from '../../types';
import { fadeInUp, defaultViewport } from '../../utils/animations';
import styles from './ProjectsCarousel.module.scss';

export const ProjectsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const totalProjects = CASE_STUDIES.length;

  const currentProject: CaseStudy = CASE_STUDIES[currentIndex];

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  };

  const goToProject = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-scroll active tab into view in the horizontal tabs bar
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabEl = tabsContainerRef.current.querySelector(`#project-tab-${currentIndex}`) as HTMLElement;
      if (activeTabEl) {
        activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Touch swipe gesture handlers (with vertical scroll preservation)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Minimum swipe threshold (35px) and ensure horizontal intent > vertical intent
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  return (
    <section id="projects" className={styles.projectsSection}>
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
            <span className={styles.badgeText}>FEATURED PROJECTS</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Engineering Case Studies & Systems
          </h2>
          <p className={styles.sectionSubtitle}>
            Production architectures, high-concurrency distributed engines, and edge optimizations deployed at scale.
          </p>
        </motion.div>

        {/* Project Selector Tabs */}
        {/* <motion.div
          ref={tabsContainerRef}
          className={styles.tabsNavWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={1}
        >
          <div className={styles.tabsList} role="tablist" aria-label="Project Case Studies">
            {CASE_STUDIES.map((project, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  id={`project-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls={`project-panel-${idx}`}
                  className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                  onClick={() => goToProject(idx)}
                >
                  <span className={styles.tabNumber}>0{idx + 1}</span>
                  <span className={styles.tabTitle}>{project.title.split(' ')[0]} {project.title.split(' ')[1]}</span>
                  <span className={styles.tabCategory}>{project.category}</span>
                </button>
              );
            })}
          </div>
        </motion.div> */}

        {/* Carousel Showcase Stage */}
        <motion.div
          className={styles.carouselContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={2}
          onTouchStart={handleTouchStart}
          onTouchCancel={handleTouchCancel}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.cardViewport}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentProject.id}
                id={`project-panel-${currentIndex}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${currentIndex}`}
                className={styles.projectCard}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Meta Top Bar */}
                <div className={styles.cardTopBar}>
                  <div className={styles.metaLeft}>
                    <div className={styles.categoryPill}>
                      <Layers size={13} />
                      <span>{currentProject.category}</span>
                    </div>
                    {currentProject.featured && (
                      <div className={styles.featuredBadge}>
                        <Sparkles size={12} />
                        <span>Featured Case Study</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.counterBadge}>
                    <span className={styles.counterCurrent}>0{currentIndex + 1}</span>
                    <span className={styles.counterDivider}>/</span>
                    <span className={styles.counterTotal}>0{totalProjects}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                  <p className={styles.projectSubtitle}>{currentProject.subtitle}</p>
                </div>

                {/* Problem & Solution Side-by-Side Grid */}
                <div className={styles.narrativeGrid}>
                  <div className={styles.narrativeBlock}>
                    <div className={styles.narrativeLabel}>
                      <span className={styles.problemDot} />
                      <span>The Engineering Challenge</span>
                    </div>
                    <p className={styles.narrativeText}>{currentProject.problem}</p>
                  </div>

                  <div className={styles.narrativeBlock}>
                    <div className={styles.narrativeLabel}>
                      <span className={styles.solutionDot} />
                      <span>Architectural Solution</span>
                    </div>
                    <p className={styles.narrativeText}>{currentProject.solution}</p>
                  </div>
                </div>

                {/* Key Impact Metrics */}
                {currentProject.impactMetrics && currentProject.impactMetrics.length > 0 && (
                  <div className={styles.metricsContainer}>
                    <div className={styles.sectionMiniHeader}>
                      <span>Measurable Production Impact</span>
                    </div>
                    <div className={styles.metricsRow}>
                      {currentProject.impactMetrics.map((metric, idx) => (
                        <div key={idx} className={styles.metricCard}>
                          <span className={styles.metricValue}>{metric.value}</span>
                          <span className={styles.metricLabel}>{metric.label}</span>
                          <span className={styles.metricDesc}>{metric.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Highlights / Challenges */}
                {currentProject.technicalChallenges && currentProject.technicalChallenges.length > 0 && (
                  <div className={styles.highlightsSection}>
                    <div className={styles.highlightsHeader}>
                      <Zap size={14} className={styles.zapIcon} />
                      <span>Key Highlights</span>
                    </div>
                    <div className={styles.challengesList}>
                      {currentProject.technicalChallenges.map((item, idx) => (
                        <div key={idx} className={styles.challengeItem}>
                          <div className={styles.challengeTitleRow}>
                            <CheckCircle size={14} className={styles.checkIcon} />
                            <strong>{item.title}</strong>
                          </div>
                          <p className={styles.challengeSolution}>{item.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies & Links Footer */}
                <div className={styles.cardFooter}>
                  <div className={styles.techTagsList}>
                    {currentProject.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.actionLinks}>
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        aria-label={`View ${currentProject.title} GitHub`}
                        id={`project-github-btn-${currentIndex}`}
                      >
                        <Github size={15} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtnPrimary}
                        aria-label={`View live architecture demo of ${currentProject.title}`}
                        id={`project-live-btn-${currentIndex}`}
                      >
                        <span>Live System</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Footer Navigation Bar */}
          <div className={styles.navigationControls}>
            <button
              type="button"
              className={styles.navArrowBtn}
              onClick={goToPrev}
              aria-label="Previous project case study"
              id="prev-project-btn"
            >
              <ChevronLeft size={18} />
              <span className={styles.btnText}>Previous</span>
            </button>

            {/* Interactive Dot Indicators */}
            <div className={styles.dotsGroup} role="group" aria-label="Pagination">
              {CASE_STUDIES.map((item, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.dotItem} ${isActive ? styles.activeDot : ''}`}
                    onClick={() => goToProject(idx)}
                    aria-label={`Switch to project ${idx + 1}: ${item.title}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className={styles.dotIndicator} />
                    <span className={styles.dotLabel}>0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.navArrowBtn}
              onClick={goToNext}
              aria-label="Next project case study"
              id="next-project-btn"
            >
              <span className={styles.btnText}>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
