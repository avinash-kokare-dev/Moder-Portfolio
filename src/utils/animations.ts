import { Variants } from 'motion/react';

// Unified standard easing curve: cubic-bezier for smooth deceleration
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Unified viewport options for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: '-50px',
  amount: 0.15,
} as const;

// Base Fade-In-Up variant
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.08,
      ease: EASE_OUT,
    },
  }),
};

// Subtle Fade-In-Up for smaller UI elements (e.g. pills, badges)
export const fadeInUpSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: custom * 0.06,
      ease: EASE_OUT,
    },
  }),
};

// Staggered Container variant for lists, cards, and metric rows
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

// Child item variant for stagger container
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
};

// Scale-up fade-in variant (for cards or spotlight elements)
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.08,
      ease: EASE_OUT,
    },
  }),
};
