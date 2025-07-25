// src/components/Header.tsx 
/*
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { slideDown } from '../lib/motionVariants';

const Header = () => (
  <motion.nav
    variants={slideDown()}
    initial="hidden"
    animate="visible"
    className="sticky top-0 z-50 w-full max-w-4xl mx-auto flex justify-end items-center bg-bg/80 backdrop-blur-sm shadow-lg p-4"
    style={{ 
      marginInline: 'inherit',
      marginRight: '10px'
    }}
  >
    <motion.div
      className="mr-4 transition-transform hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <LanguageSwitcher />
    </motion.div>

    <motion.div
      className="mr-2.5 transition-transform hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ThemeSwitcher />
    </motion.div>
  </motion.nav>
);

export default memo(Header);
*/