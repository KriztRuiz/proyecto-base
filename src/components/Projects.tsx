// src/components/Projects.tsx
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '../lib/motionVariants';
import { sectionPadding } from '../lib/styles';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t('projects_list', { returnObjects: true }) as {
    title: string;
    desc: string;
    tech: string[];
    link: string;
  }[];

  return (
    <section id="projects" className={sectionPadding}>
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {t('projects_title')}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.a
            key={`${p.link}-${i}`}           // ← ahora la key combina link + índice
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-white rounded-lg hover:shadow-lg transition"
            variants={slideUp(i * 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold group-hover:text-primary mb-2">
              {p.title}
            </h3>
            <p className="mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-primary/10 text-primary px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default memo(Projects);
