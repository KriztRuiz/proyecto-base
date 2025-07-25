import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

const About = () => {
  const { t } = useTranslation();
  const items = t('about_timeline', { returnObjects: true }) as { year: string; text: string }[];

  return (
    <section id="about" className={sectionPadding}>
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {t('about_title')}
      </motion.h2>

      <ul className="space-y-6">
        {items.map((item, i) => (
          <motion.li
            key={item.year}
            className="flex gap-4 items-start border-l-4 pl-4 border-primary"
            variants={slideUp(i * 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="font-mono text-primary">{item.year}</span>
            <p>{item.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default memo(About);