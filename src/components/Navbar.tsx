// src/components/Navbar.tsx
import React, { memo, useState } from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { slideDown } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

// Variants para los links
const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const { t } = useTranslation();
  const sections = ['home', 'about', 'projects', 'contact'];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      variants={slideDown()}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-[5px] right-[5px] bg-bg/80 backdrop-blur-md shadow-lg z-50"
    >
      {/* contenedor con flex-direction invertido */}
      <div className={`${sectionPadding} flex flex-row max-[510px]:flex-row-reverse items-center justify-between`}>
        {/* Desktop menu: horizontal links */}
        <div className="flex flex-row gap-4 max-[510px]:hidden">
          {sections.map((sec) => (
            <motion.div
              key={sec}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              <Link
                to={sec}
                smooth
                offset={-80}
                duration={500}
                className="p-[3px] m-[5px] text-fg hover:text-primary transition-colors"
                style={{
                  backgroundColor: 'var(--bg)',
                  opacity: 0.75,
                  borderRadius: '8px',
                }}
              >
                {t(sec)}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right side: switchers and mobile menu button */}
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 20 }} whileTap={{ rotate: 0 }} className="transition-transform">
            <LanguageSwitcher />
          </motion.div>

          <motion.div whileHover={{ rotate: 20 }} whileTap={{ rotate: 0 }} className="transition-transform">
            <ThemeSwitcher />
          </motion.div>

          {/* Mobile hamburger menu button */}
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden max-[510px]:flex items-center justify-center px-2 text-2xl rounded border border-fg/70 hover:bg-bg/20 transition"
          >
            ≡
          </motion.button>
        </div>
      </div>

      {/* Mobile menu: vertical links under button */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="md:hidden flex flex-col absolute top-full right-5 bg-bg/80 backdrop-blur-md shadow-lg py-2 pl-6"
          >
            {sections.map((sec) => (
              <motion.div
                key={sec}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Link
                  to={sec}
                  smooth
                  offset={-80}
                  duration={500}
                  className="p-[3px] m-[5px] text-fg hover:text-primary transition-colors"
                  style={{
                    backgroundColor: 'var(--bg)',
                    opacity: 0.75,
                    borderRadius: '8px',
                  }}
                >
                  {t(sec)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default memo(Navbar);
