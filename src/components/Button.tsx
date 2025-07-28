import React, { memo, type ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { fadeIn } from '../lib/motionVariants';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref'> & {
  children: ReactNode;
  /** Optional ARIA label; if not provided and children are plain text, the
   * children string will be used as the aria-label. */
  'aria-label'?: string;
};

const ButtonComponent = ({ children, className, ...props }: ButtonProps) => {
  const base = 'px-8 py-4 rounded-lg text-lg font-semibold transition';
  const styles = 'btn-metallic text-white';

  // Detect whether the user prefers reduced motion. This influences the
  // interactive animations applied to the button.
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      {...props}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      // Only scale on hover or tap if animations are allowed.
      whileHover={!shouldReduceMotion ? { scale: 1.05 } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.95 } : undefined}
      whileFocus={!shouldReduceMotion ? { scale: 1.02 } : undefined}
      className={clsx(
        base,
        styles,
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className,
      )}
      aria-label={
        props['aria-label'] ?? (typeof children === 'string' ? (children as string) : undefined)
      }
    >
      {children}
    </motion.button>
  );
};

export const Button = memo(ButtonComponent);
