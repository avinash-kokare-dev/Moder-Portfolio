import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { fadeInUp, defaultViewport, staggerContainer, staggerItem } from '../../utils/animations';
import styles from './Skills.module.scss';
import { getYearOfExperience } from '@/src/utils/helper';

export const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className={styles.skillsSection}>
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
            <span className={styles.badgeText}>CORE COMPETENCIES</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Skills & Domain Expertise
          </h2>
          <p className={styles.sectionSubtitle}>
            A categorized overview of technologies mastered across {getYearOfExperience()} years of production experience.
          </p>
        </motion.div>

        {/* Categories Navigation Bar */}
        <motion.div
          className={styles.categoryPills}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={1}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.category}
              type="button"
              className={`${styles.catPillBtn} ${activeCategoryIndex === idx ? styles.activeCatPill : ''}`}
              onClick={() => {
                setActiveCategoryIndex(idx);
                setSelectedSkillName(null);
              }}
            >
              <span>{cat.category}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Category Skills Grid */}
        <motion.div
          className={styles.skillsBoard}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          custom={2}
        >
          <div className={styles.boardHeader}>
            <div className={styles.boardTitleGroup}>
              <h3 className={styles.categoryHeading}>{currentCategory.category}</h3>
              <p className={styles.categoryDesc}>{currentCategory.description}</p>
            </div>
          </div>

          <motion.div
            key={currentCategory.category}
            className={styles.skillsGrid}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <AnimatePresence mode="popLayout">
              {currentCategory.skills.map((skill) => {
                const isSelected = selectedSkillName === skill.name;

                return (
                  <motion.div
                    key={`${currentCategory.category}-${skill.name}`}
                    id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`${styles.skillCard} ${isSelected ? styles.selectedSkill : ''}`}
                    onClick={() => setSelectedSkillName(isSelected ? null : skill.name)}
                    variants={staggerItem}
                    layout
                  >
                    <div className={styles.skillTopRow}>
                      <span className={styles.skillNameText}>{skill.name}</span>
                      {/* <span className={styles.skillLevelBadge}>{skill.level}</span> */}
                    </div>

                    <p className={styles.skillContextText}>{skill.context}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
