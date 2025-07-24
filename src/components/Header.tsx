import type { FC } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: FC = () => (
  <nav className="w-full max-w-4xl mx-auto flex justify-end gap-nav-gap p-4">
    <LanguageSwitcher />
    <ThemeSwitcher />
  </nav>
);
