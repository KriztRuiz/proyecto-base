// src/components/Contact.tsx
import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Button } from './Button';

export const Contact: FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    emailjs
      .sendForm(
        'service_tj955yp',
        'template_7holsnr',
        form,
        'EbRCVBg5U0qok1sK4'
      )
      .then(() => setStatus(t('contact_success')))
      .catch(() => setStatus(t('contact_error')));
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto py-16 px-4">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('contact_title')}
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <input
          name="user_name"
          placeholder={t('contact_name')}
          className="p-3 border rounded"
          required
        />
        <input
          type="email"
          name="user_email"
          placeholder={t('contact_email')}
          className="p-3 border rounded"
          required
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
