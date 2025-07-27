import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Button } from './Button';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

const Contact = () => {
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

  return (
    <section
      id="contact"
      className={`${sectionPadding} flex flex-col items-center text-center gap-6 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:text-left min-[1100px]:gap-16`}
    >
      {/* Título */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="min-[1100px]:w-1/3"
      >
        <h2 className="text-4xl font-bold mb-8">{t('contact_title')}</h2>
      </motion.div>

      {/* Formulario */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-4 min-[1100px]:flex-1"
        variants={slideUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <input
          type="text"
          name="name"
          placeholder={t('contact_name')}
          className="p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('contact_email')}
          className="p-3 border rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder={t('contact_subject')}
          className="p-3 border rounded"
        />
        <textarea
          name="message"
          placeholder={t('contact_message')}
          className="p-3 border rounded"
          rows={5}
          required
        />
        <Button type="submit">{t('contact_button')}</Button>
        {status && <p className="mt-2 text-center">{status}</p>}
      </motion.form>
    </section>
  );
};

export default memo(Contact);