import React, { memo, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { fadeIn } from '../lib/motionVariants';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref'> & {
  children: ReactNode;
};

const ButtonComponent = ({ children, className, ...props }: ButtonProps) => {
  const base = 'px-8 py-4 rounded-lg text-lg font-semibold transition';
  const styles = 'btn-metallic text-white';

  return (
    <motion.button
      {...props}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(base, styles, className)}
    >
      {children}
    </motion.button>
  );
};

export const Button = memo(ButtonComponent);