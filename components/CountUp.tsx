'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ target, prefix = '', suffix = '', duration = 1800 }: CountUpProps) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.unobserve(entry.target);

            let start: number | null = null;
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              setDisplay(`${prefix}${current}${suffix}`);
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setDisplay(`${prefix}${target}${suffix}`);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, duration]);

  return <span ref={ref} className="stats__number">{display}</span>;
}
