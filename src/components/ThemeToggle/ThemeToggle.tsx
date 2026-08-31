import React from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      id="theme-toggle-btn"
      type="button"
      className={styles.toggleButton}
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={styles.iconContainer}>
        {theme === 'dark' ? (
          <Sun className={styles.sunIcon} size={18} />
        ) : (
          <Moon className={styles.moonIcon} size={18} />
        )}
      </span>
      <span className={styles.toggleLabel}>
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
