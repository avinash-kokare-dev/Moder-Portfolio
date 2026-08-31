import React from 'react';
import { ArrowUp, Terminal, Github, Linkedin, Mail, Heart } from 'lucide-react';
import styles from './Footer.module.scss';
import { PROFESSIONAL_TITLE } from '@/src/data/skills';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMain}>
          {/* Brand Column */}
          <div className={styles.identityCol}>
            <div className={styles.logoRow}>
              <div className={styles.logoBadge}>AK</div>
              <span className={styles.logoName}>Avinash Kokare</span>
            </div>
            <p className={styles.identitySub}>
              {PROFESSIONAL_TITLE} specializing in high-performance web applications, distributed locking, and SSR architectures.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className={styles.linksCol}>
            <span className={styles.colTitle}>Navigation</span>
            <ul className={styles.footerLinks}>
              <li><a href="#hero">Overview</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className={styles.linksCol}>
            <span className={styles.colTitle}>Connect</span>
            <ul className={styles.footerLinks}>
              <li>
                <a href="https://github.com/avinash-kokare-dev" target="_blank" rel="noopener noreferrer">
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/avi-kokare/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="mailto:avi1999kokare@gmail.com">
                  <Mail size={14} />
                  <span>avi1999kokare@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.systemStatus}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>
              © {new Date().getFullYear()} Avinash Kokare · Built with React, TypeScript & SCSS
            </span>
          </div>

          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            id="footer-back-to-top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
