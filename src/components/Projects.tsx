import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Projects: FC = () => {
  const { t } = useTranslation();
  const projects = t('projects_list', { returnObjects: true }) as 
    { title:string; desc:string; tech:string[]; link:string }[];
  return (
    <section id="projects" className="max-w-4xl mx-auto py-16 px-4">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {t('projects_title')}
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener"
            className="group bg-bg/50 p-6 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-2xl font-semibold group-hover:text-primary mb-2">{p.title}</h3>
            <p className="mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((tag, j) => (
                <span key={j} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
