import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

const About = () => {
  const { t } = useTranslation();
  const items = t('about_timeline', { returnObjects: true }) as { year: string; text: string }[];

  return (
    <section
      id="about"
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
        <h2 className="text-4xl font-bold mb-8">{t('about_title')}</h2>
      </motion.div>

      {/* Línea de tiempo */}
      <motion.ul
        className="space-y-6 min-[1100px]:flex-1"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <motion.li
            key={item.year}
            variants={slideUp(i * 0.2)}
            className="flex gap-4"
          >
            <span className="font-mono text-primary">{item.year}</span>
            <p>{item.text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default memo(About);