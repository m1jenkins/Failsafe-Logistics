import React, { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in milliseconds */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Scroll-triggered reveal wrapper.
 * Prerendered HTML stays fully visible (no-JS / SEO safe);
 * after hydration this component opts the element into a
 * fade-and-rise transition when it enters the viewport.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    element.classList.add('reveal-init');
    let visible = false;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting && !visible) {
            visible = true;
            element.classList.add('reveal-in');
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Only reset when scrolled away above the viewport so
            // elements never flicker while scrolling down past them.
            visible = false;
            element.classList.remove('reveal-in');
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
};
