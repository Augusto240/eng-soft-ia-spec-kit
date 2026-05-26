'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type AnimatedNumberProps = {
  value: number;
  durationMs?: number;
};

export default function AnimatedNumber({ value, durationMs = 1200 }: AnimatedNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    const handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [value, durationMs, prefersReducedMotion]);

  return <span>{display}</span>;
}
