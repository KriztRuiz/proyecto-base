// src/components/Hero.tsx
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';
import avatar from '../assets/avatar.jpg';

export const Hero: FC = () => {
  const { t } = useTranslation();
  const roles = t<'hero_roles', { returnObjects: true }, string[]>(
    'hero_roles',
    { returnObjects: true }
  );

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-bg to-bg/90 text-fg px-4 sm:px-6 lg:px-8"
    >
      <motion.img
        src={avatar}
        alt="Avatar"
        className="
        w-24 h-24
        sm:w-32 sm:h-32
        md:w-40 md:h-40
        max-w-[90%]
        rounded-full
        border-4 border-primary
        mb-6
        "
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {t('hero_title')}
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg md:text-xl text-center max-w-xl mb-8 opacity-80"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {t('hero_subtitle')}
      </motion.p>

      <motion.div
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 25, delay: 0.4 }}
      >
        <ReactTyped
          className="text-lg sm:text-xl md:text-2xl font-medium text-primary text-center"
          strings={roles}
          typeSpeed={50}
          backSpeed={40}
          backDelay={1500}
          loop
        />
      </motion.div>
    </section>
  );
};
