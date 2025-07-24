// src/components/LandingPage.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from './Header';
import Container from './Container';
import { Button } from './Button';

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Header />
      <header className="text-center space-y-8">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t('hero_title')}
        </motion.h1>

        <motion.p
          className="text-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
        >
          <Button onClick={() => alert('CTA clicked!')}>
            {t('cta')}
          </Button>
        </motion.div>
      </header>
    </Container>
  );
}
