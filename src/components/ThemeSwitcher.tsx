import { useTheme } from '../hooks/useTheme';
import type { ChangeEvent } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const t = e.target.value as 'light' | 'dark' | 'green';
    setTheme(t);
  }

  return (
    <select value={theme} onChange={handleChange}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="green">Green</option>
    </select>
  );
}
