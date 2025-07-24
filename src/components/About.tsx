import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const About: FC = () => {
  const { t } = useTranslation();
  const items = t('about_timeline', { returnObjects: true }) as { year:string; text:string }[];
  return (
    <section id="about" className="max-w-4xl mx-auto py-16 px-4">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('about_title')}
      </motion.h2>
      <ul className="space-y-6">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex gap-4"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <span className="font-mono text-primary">{item.year}</span>
            <p>{item.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
