// src/components/Hero.tsx
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactTyped } from 'react-typed';
import { motion, AnimatePresence } from 'framer-motion';
import avatar from '../assets/avatar.jpg';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

interface HeroProps {
  /**
   * The currently selected section determines which subcomponent is displayed
   * inside the hero card. Possible values are 'home', 'about', 'projects' and
   * 'contact'. When 'home' is selected, no additional content is shown.
   */
  selectedSection: 'home' | 'about' | 'projects' | 'contact';
}

const Hero = ({ selectedSection }: HeroProps) => {
  const { t } = useTranslation();
  const roles = t('hero_roles', { returnObjects: true }) as string[];

  return (
    <section id="home" className={`snap-start ${sectionPadding} mt-[10px]`}>
      {/* The card container holds the avatar, hero text and the dynamic section. */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="border-4 border-fg p-6 rounded-lg bg-bg/90 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6 min-[1100px]:flex-row min-[1100px]:gap-16">
          {/* Avatar */}
          <motion.img
            src={avatar}
            alt="Avatar"
            className={[
              'rounded-full',
              'object-cover',
              // Reduce size on screens narrower than 595px
              'max-[595px]:w-20',
              'max-[595px]:h-20',
              // Default sizing: scale automatically within the card
              'w-auto',
              'h-auto',
              'max-w-[90vw]',
              'max-h-[90vw]',
              'mx-auto',
              'min-[1100px]:mx-0',
              'min-[1100px]:w-1/3',
              'min-[1100px]:max-w-xs',
            ].join(' ')}
            variants={slideUp()}
            style={{ paddingTop: '30px' }}
          />
          {/* Right column: hero text and dynamic section */}
          <div className="flex-1 flex flex-col items-center text-center gap-4 lg:items-start lg:text-left">
            <motion.h1 className="text-5xl font-bold" variants={slideUp(0.2)}>
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
            {/* Dynamic section content rendered below the hero heading inside the same card */}
            <AnimatePresence mode="wait">
              {selectedSection === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <About embedded />
                </motion.div>
              )}
              {selectedSection === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Projects embedded />
                </motion.div>
              )}
              {selectedSection === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Contact embedded />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
