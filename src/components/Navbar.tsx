// src/components/Navbar.tsx
import React, { memo, useState, useEffect, useRef } from 'react';
// We no longer use react-scroll for navigation between internal sections.
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { slideDown } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

// Variants for the links
const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

// Define the type representing the available sections. Declaring it at module
// scope allows us to use it both in the NavbarProps definition and when
// creating the sections array.
export type Section = 'home' | 'about' | 'projects' | 'contact';

// Props allow the parent component to control which section is displayed.
interface NavbarProps {
  onNavigate: (section: Section) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const { t } = useTranslation();
  // Use the Section type defined above for the navigation options. We define
  // the array here so TypeScript infers the literal types correctly.
  const sections: Section[] = ['home', 'about', 'projects', 'contact'];
  const [menuOpen, setMenuOpen] = useState(false);
  // Detect reduced motion preference for icon rotations
  const shouldReduceMotion = useReducedMotion();

  // Ref for the first link in the mobile menu. This uses HTMLButtonElement
  // because we render motion.button elements for navigation items.
  const firstLinkRef = useRef<HTMLButtonElement | null>(null);

  // Close menu on Escape key press
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  // Move focus to the first link when menu opens
  useEffect(() => {
    if (menuOpen) {
      const id = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [menuOpen]);

  return (
    <motion.nav
      variants={slideDown()}
      initial="hidden"
      animate="visible"
      className="fixed left-[11px] right-[16px] bg-bg/80 backdrop-blur-md shadow-lg z-50"
    >
      {/* Main container */}
      <div className={`${sectionPadding} flex flex-row max-[510px]:flex-row-reverse items-center justify-between max-[510px]:justify-end`}>
        {/* Desktop menu */}
        <div className="flex flex-row gap-4 max-[510px]:hidden">
          {sections.map((sec) => (
            <motion.button
              key={sec}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer m-[5px] p-[3px] rounded-md transition-colors text-fg hover:text-primary"
              style={{ backgroundColor: 'var(--bg)', borderRadius: '8px' }}
              type="button"
              onClick={() => onNavigate(sec)}
            >
              {t(sec)}
            </motion.button>
          ))}
        </div>

        {/* Switchers and hamburger button */}
        <div className="flex items-center gap-2 max-[510px]:flex-row-reverse max-[510px]:justify-end">
          <motion.div
            whileHover={!shouldReduceMotion ? { rotate: 20 } : undefined}
            whileTap={!shouldReduceMotion ? { rotate: 0 } : undefined}
            className="transition-transform"
          >
            <LanguageSwitcher />
          </motion.div>
          <motion.div
            whileHover={!shouldReduceMotion ? { rotate: 20 } : undefined}
            whileTap={!shouldReduceMotion ? { rotate: 0 } : undefined}
            className="transition-transform"
          >
            <ThemeSwitcher />
          </motion.div>
          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMenuOpen(o => !o)}
            whileHover={!shouldReduceMotion ? { scale: 1.1 } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.9 } : undefined}
            className="hidden max-[510px]:flex items-center justify-center px-2 text-2xl rounded border border-fg/70 hover:bg-bg/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('navbar_close_menu') || 'Cerrar menú' : t('navbar_open_menu') || 'Abrir menú'}
          >
            ≡
          </motion.button>
        </div>
      </div>

      {/* Mobile menu with overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="md:hidden flex flex-col absolute top-full right-5 bg-bg/90 backdrop-blur-md shadow-lg py-2 pl-6 z-50"
            >
              {sections.map((sec, idx) => (
                <motion.button
                  key={sec}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  className="hidden max-[510px]:block cursor-pointer m-[5px] p-[3px] rounded-md transition-colors text-fg hover:text-primary"
                  style={{ backgroundColor: 'var(--bg)', borderRadius: '8px'  }}
                  type="button"
                  ref={idx === 0 ? firstLinkRef : undefined}
                  onClick={() => {
                    onNavigate(sec);
                    setMenuOpen(false);
                  }}
                >
                  {t(sec)}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default memo(Navbar);
