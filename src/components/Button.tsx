// src/components/Button.tsx
import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref'> & {
  children: ReactNode;
};

export function Button({ children, className, ...props }: ButtonProps) {
  const base = 'px-8 py-4 rounded-lg text-lg font-semibold transition';
  const styles = 'btn-metallic text-white';

  return (
    <motion.button
      {...props}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(base, styles, className)}
    >
      {children}
    </motion.button>
  );
}
