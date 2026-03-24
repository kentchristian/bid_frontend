import { useEffect, useState } from 'react';

const getScrollTop = (event?: Event) => {
  if (typeof window === 'undefined') return 0;

  if (!event) {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  const target = event.target;

  if (target instanceof Document) {
    return target.documentElement.scrollTop || window.scrollY || 0;
  }

  if (target instanceof HTMLElement) {
    const pageContainer = target.closest?.('.page-container');
    const scrollElement = pageContainer ?? target;
    return scrollElement.scrollTop;
  }

  return window.scrollY || 0;
};

export const useScrollThreshold = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = (event: Event) => {
      // If we scroll past the threshold, set to true
      setIsScrolled(getScrollTop(event) > threshold);
    };

    // Initialize on mount
    setIsScrolled(getScrollTop() > threshold);

    // Capture scrolls from nested scroll containers (e.g. .page-container)
    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });

    return () => document.removeEventListener('scroll', handleScroll, true);
  }, [threshold]);

  return isScrolled;
};
