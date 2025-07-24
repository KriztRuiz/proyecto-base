// src/components/Navbar.tsx
import type { FC } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar: FC = () => (
<motion.nav
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="fixed top-0 w-full bg-bg/70 backdrop-blur-sm shadow-md z-50 mx-inherit"

>
    <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
      {/* Logo / Brand */}
      <motion.button
        onClick={() => scroll.scrollToTop()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-2xl font-bold text-primary hover:opacity-80 transition border border-fg/90 p-[5px] rounded"
      >
        MiPortafolio
      </motion.button>

      {/* Links (ocultos <500px) */}
      <div className="flex items-center space-x-6 max-[500px]:hidden">
        {['home', 'about', 'projects', 'contact'].map((section) => (
          <motion.div
            key={section}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <Link
              to={section}
              smooth
              duration={500}
              className="text-fg hover:text-primary border border-fg/90 p-[5px] rounded transition-colors"
            >
              {section.toUpperCase()}
            </Link>
          </motion.div>
        ))}
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      {/* Hamburger (solo <500px) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll.scrollToTop()}
        className="hidden max-[500px]:flex items-center justify-center p-[5px] text-2xl rounded-md border border-fg/90 hover:bg-bg/20 transition"
      >
        ≡
      </motion.button>
    </div>
  </motion.nav>
);
