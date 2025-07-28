import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Button } from './Button';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

interface ContactProps {
  /**
   * When true, the component renders a simplified layout without the outer
   * <section> wrapper. This is useful when embedding the Contact content
   * inside another component (e.g. the hero card). When false (default),
   * the component behaves as a standalone page section with its own
   * padding and scroll snapping.
   */
  embedded?: boolean;
}

const Contact = ({ embedded = false }: ContactProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.sendForm('your_service_id', 'your_template_id', e.currentTarget, 'your_public_key');
      setStatus(t('contact_success'));
      e.currentTarget.reset();
    } catch {
      setStatus(t('contact_error'));
    }
  };

  // Shared content for both embedded and standalone modes. It uses Framer Motion
  // to animate in the heading and form.
  const content = (
    <>
      {/* Heading */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={embedded ? undefined : 'min-[1100px]:w-1/3'}
      >
        <h2 className={embedded ? 'text-3xl font-bold mb-4' : 'text-4xl font-bold mb-8'}>
          {t('contact_title')}
        </h2>
      </motion.div>
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className={embedded ? 'max-w-full flex flex-col gap-4' : 'max-w-xl mx-auto flex flex-col gap-4 min-[1100px]:flex-1'}
        variants={slideUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label={t('contact_form_aria') || t('contact_title')}
      >
        <label htmlFor="contact-name" className="sr-only">
          {t('contact_name')}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder={t('contact_name')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          aria-required="true"
        />
        <label htmlFor="contact-email" className="sr-only">
          {t('contact_email')}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder={t('contact_email')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          aria-required="true"
        />
        <label htmlFor="contact-subject" className="sr-only">
          {t('contact_subject')}
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder={t('contact_subject')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="contact-message" className="sr-only">
          {t('contact_message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={t('contact_message')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={5}
          required
          aria-required="true"
        />
        <Button type="submit" aria-label={t('contact_button')}>
          {t('contact_button')}
        </Button>
        {status && (
          <p className="mt-2 text-center" aria-live="polite">
            {status}
          </p>
        )}
      </motion.form>
    </>
  );

  // If embedded, return the simplified content without the outer section. We use
  // a div wrapper to group the heading and form and add spacing relative
  // to the hero content.
  if (embedded) {
    return (
      <div className="mt-8 flex flex-col gap-6 text-left"
      style={{
        margin: '5px',
      }}>
        {content}
      </div>
    );
  }

  // Default behaviour: render as a standalone section with padding and
  // scroll snapping.
  return (
    <section
      id="contact"
      // Use snap-start for scroll snapping behaviour.
      className={`snap-start ${sectionPadding} flex flex-col items-center text-center gap-6 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:text-left min-[1100px]:gap-16`}
    >
      {content}
    </section>
  );
};

export default memo(Contact);
