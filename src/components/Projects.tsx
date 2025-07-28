import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

interface ProjectsProps {
  /**
   * When true, the component renders a simplified layout without the outer
   * <section> wrapper. This is useful when embedding the Projects content
   * inside another component (e.g. the hero card). When false (default),
   * the component behaves as a standalone page section with its own
   * padding and scroll snapping.
   */
  embedded?: boolean;
}

const Projects = ({ embedded = false }: ProjectsProps) => {
  const { t } = useTranslation();
  const projects =
    t('projects_list', { returnObjects: true }) as { title: string; desc: string; tech: string[]; link: string }[];

  // Shared content for both embedded and standalone modes. It uses Framer Motion
  // to animate in the heading and project cards.
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
          {t('projects_title')}
        </h2>
      </motion.div>
      {/* Projects grid */}
      <motion.div
        className={embedded ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-8 min-[1100px]:flex-1'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
      >
        {projects.map((p, i) => (
          <motion.a
            key={`${p.link}-${i}`}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 sm:p-6 bg-white rounded-lg hover:shadow-lg transition"
            variants={slideUp(i * 0.1)}
          >
            <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary mb-2">
              {p.title}
            </h3>
            <p className="mb-4 text-sm sm:text-base">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-xs sm:text-sm bg-primary/10 text-primary px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </>
  );

  // If embedded, return the simplified content without the outer section. We use
  // a div wrapper to group the heading and projects and add spacing relative
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
      id="projects"
      className={`snap-start ${sectionPadding} flex flex-col items-center text-center gap-6 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:text-left min-[1100px]:gap-16`}
    >
      {content}
    </section>
  );
};

export default memo(Projects);
