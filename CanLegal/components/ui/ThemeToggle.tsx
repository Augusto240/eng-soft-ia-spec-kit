'use client';

import { useEffect, useState } from 'react';

const storageKey = 'canlegal-theme';

type ThemeMode = 'light' | 'dark';

function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem(storageKey, next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      className="rounded-full border border-line/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-ink"
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
