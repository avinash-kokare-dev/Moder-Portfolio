import React, { useState } from 'react';
import { Mail, Linkedin, Github, FileText, Copy, Check, Send, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeInUp, defaultViewport } from '../../utils/animations';
import styles from './Contact.module.scss';
import { handleDownload } from '@/src/utils/helper';

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailAddress = 'avi1999kokare@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
    }, 600);
  };

  return (
    <section id="contact" className={styles.contactSection}>
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
            <span className={styles.badgeText}>GET IN TOUCH</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Let's Connect
          </h2>
          <p className={styles.sectionSubtitle}>
            Open to Senior Software Engineer, Full-Stack Engineer, Backend Engineer, and engineering opportunities where system architecture and performance matter.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Left Column: Direct Communication Channels */}
          <motion.div
            className={styles.channelsCard}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            custom={1}
          >
            <h3 className={styles.cardHeading}>Direct Communication</h3>

            {/* Copyable Email Box */}
            <div className={styles.emailBox}>
              <div className={styles.emailInfo}>
                <span className={styles.emailLabel}>PRIMARY EMAIL</span>
                <span className={styles.emailValue}>{emailAddress}</span>
              </div>
              <button
                type="button"
                className={`${styles.copyBtn} ${copiedEmail ? styles.copied : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy Email Address"
              >
                {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Links Grid */}
            <div className={styles.linksGrid}>
              <a
                href="https://github.com/avinash-kokare-dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelLink}
              >
                <div className={styles.linkIconBox}>
                  <Github size={18} />
                </div>
                <div className={styles.linkMeta}>
                  <span className={styles.linkLabel}>GitHub</span>
                  <span className={styles.linkSub}>github.com/avinash-kokare</span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/avi-kokare/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelLink}
              >
                <div className={styles.linkIconBox}>
                  <Linkedin size={18} />
                </div>
                <div className={styles.linkMeta}>
                  <span className={styles.linkLabel}>LinkedIn</span>
                  <span className={styles.linkSub}>linkedin.com/in/avi-kokare</span>
                </div>
              </a>

              <button
                type="button"
                className={styles.channelLink}
                onClick={() => handleDownload()}
              >
                <div className={styles.linkIconBox}>
                  <FileText size={18} />
                </div>
                <div className={styles.linkMeta}>
                  <span className={styles.linkLabel}>Engineering Resume</span>
                  <span className={styles.linkSub}>View & Download PDF</span>
                </div>
              </button>
            </div>

            {/* Location & Timezone */}
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <MapPin size={14} className={styles.metaIcon} />
                <span>Mumbai, India (Open to Remote / Relocation)</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} className={styles.metaIcon} />
                <span>IST (UTC+5:30) · Quick Response Time</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Form */}
          <motion.div
            className={styles.formCard}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            custom={2}
          >
            <div className={styles.formHeader}>
              <span className={styles.terminalIndicator}>Send Direct Message</span>
              <span className={styles.statusLive}>Direct Inbox Pipeline</span>
            </div>

            {formSent ? (
              <div className={styles.successMessage}>
                <div className={styles.successIconBox}>
                  <Check size={26} />
                </div>
                <h4 className={styles.successTitle}>Message Dispatched!</h4>
                <p className={styles.successText}>
                  Thank you for reaching out, {formData.name}. I have received your message and will follow up shortly at {formData.email}.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name" className={styles.inputLabel}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-email" className={styles.inputLabel}>
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-message" className={styles.inputLabel}>
                    Opportunity / Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Let me know about the role, technical challenge, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textArea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                  id="contact-submit-btn"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
