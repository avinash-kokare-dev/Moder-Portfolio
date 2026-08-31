import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Github, Linkedin, Menu, X, Mail } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.scss';
import { handleDownload } from '@/src/utils/helper';
import { PROFESSIONAL_TITLE } from '@/src/data/skills';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,x
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionsPython = ['hero', 'experience', 'projects', 'metrics', 'skills', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sectionsPython) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Metrics', href: '#metrics', id: 'metrics' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        {/* Brand Name */}
        <a href="#hero" className={styles.brand} aria-label="Avinash Kokare - Home">
          <div className={styles.brandTerminal}>
            <Terminal size={16} className={styles.terminalIcon} />
          </div>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>Avinash Kokare</span>
            <span className={styles.brandRole}>{PROFESSIONAL_TITLE}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className={styles.navActions}>
          {/* Resume Modal Trigger */}
          <button
            id="nav-resume-btn"
            type="button"
            className={styles.resumeButton}
            onClick={() => handleDownload()}
            aria-label="View Engineering Resume"
          >
            <FileText size={14} />
            <span>Resume</span>
          </button>

          {/* Social Profiles */}
          <div className={styles.socialGroup}>
            <a
              id="nav-github-link"
              href="https://github.com/avinash-kokare-dev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              id="nav-linkedin-link"
              href="https://www.linkedin.com/in/avi-kokare/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-btn"
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
            <nav className={styles.mobileNav} aria-label="Mobile Navigation">
              <ul className={styles.mobileNavList}>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileMenuFooter}>
              {/* Mobile Theme Toggle Row */}
              

              <button
                type="button"
                className={styles.mobileResumeBtn}
                onClick={() => handleDownload()}
              >
                <FileText size={16} />
                <span>View Full Resume</span>
              </button>

              <div className={styles.mobileSocials}>
                <a
                  href="https://github.com/avinash-kokare-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  <Github size={17} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/avi-kokare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  <Linkedin size={17} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:avi1999kokare@gmail.com"
                  className={styles.mobileSocialLink}
                >
                  <Mail size={17} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
