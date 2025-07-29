import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

interface AboutProps {
  /**
   * When true, the component renders a simplified layout without the outer
   * <section> wrapper. This is useful when embedding the About content
   * inside another component (e.g. the hero card). When false (default),
   * the component behaves as a standalone page section with its own
   * padding and scroll snapping.
   */
  embedded?: boolean;
}

const About = ({ embedded = false }: AboutProps) => {
  const { t } = useTranslation();
  const items = t('about_timeline', { returnObjects: true }) as { year: string; text: string }[];

  // Shared content for both embedded and standalone modes. It uses Framer Motion
  // to animate in the heading and timeline items.
  const content = (
    <>
      {/* Heading */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={embedded ? undefined : 'min-[1100px]:w-1/3'}
      >
        <h2 className={embedded ? 'text-3xl font-bold mb-4' : 'text-4xl font-bold mb-8'}>
          {t('about_title')}
        </h2>
      </motion.div>
      {/* Timeline */}
      <motion.ul
        className={embedded ? 'space-y-4' : 'space-y-6 min-[1100px]:flex-1'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <motion.li
            key={item.year}
            variants={slideUp(i * 0.2)}
            className="flex gap-4"
          >
            <span className="font-mono text-primary">{item.year}</span>
            <p>{item.text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );

  // If embedded, return the simplified content without the outer section. We use
  // a div wrapper to group the heading and timeline and add spacing relative
  // to the hero content.
  if (embedded) {
    return (
      <div className="mt-8 flex flex-col gap-6 text-left">
        {content}
      </div>
    );
  }

  // Default behaviour: render as a standalone section with padding and
  // scroll snapping.
  return (
    <section
      id="about"
      className={`snap-start ${sectionPadding} flex flex-col items-center text-center gap-6 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:text-left min-[1100px]:gap-16`}

    >
      {content}
    </section>
  );
};

export default memo(About);
