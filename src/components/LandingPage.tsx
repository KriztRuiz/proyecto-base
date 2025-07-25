// src/components/LandingPage.tsx
/*import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from './Container';
import Header from './Header';
import { Button } from './Button';
import { slideUp } from '../lib/motionVariants';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header />
      <section className="text-center space-y-8 py-16">
        <motion.h1
          className="text-5xl font-bold"
          variants={slideUp()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t('landing_title')}
        </motion.h1>
        <motion.p variants={slideUp(0.2)}>
          {t('landing_subtitle')}
        </motion.p>
        <motion.div variants={slideUp(0.4)}>
          <Button onClick={() => alert(t('cta_alert'))}>
            {t('cta')}
          </Button>
        </motion.div>
      </section>
    </Container>
  );
};

export default memo(LandingPage);
*/