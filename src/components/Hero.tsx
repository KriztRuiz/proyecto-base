// src/components/Hero.tsx
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';
import avatar from '../assets/avatar.jpg';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

const Hero = () => {
  const { t } = useTranslation();
  const roles = t('hero_roles', { returnObjects: true }) as string[];

  return (
    <section id="home" className={`mt-[10px] ${sectionPadding}`}>
      <motion.div
        className="flex flex-col items-center text-center gap-6"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.img
          src={avatar}
          alt="Avatar"
          className="rounded-full max-w-[90vw] max-h-[90vh] w-auto h-auto mx-auto"
          variants={slideUp()}
        />
        <motion.h1
          className="text-5xl font-bold"
          variants={slideUp(0.2)}
        >
          {t('hero_title')}
        </motion.h1>
        <motion.p variants={slideUp(0.4)}>
          {t('hero_subtitle')}
        </motion.p>
        <motion.div variants={slideUp(0.6)}>
          <ReactTyped
            className="text-lg sm:text-xl md:text-2xl font-medium text-primary"
            strings={roles}
            typeSpeed={50}
            backSpeed={40}
            backDelay={1500}
            loop
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
