import { useEffect, useState } from 'react';

const getScrollTop = (event?: Event) => {
  if (typeof window === 'undefined') return 0;

  if (!event) {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  const target = event.target;

  if (target instanceof Document) {
    const pageContainer = target.querySelector<HTMLElement>('.page-container');
    if (pageContainer) return pageContainer.scrollTop;
    return target.documentElement.scrollTop || window.scrollY || 0;
  }

  if (target instanceof HTMLElement) {
    const pageContainer = target.closest?.('.page-container');
    // Ignore scroll events outside the app's main page scroll container
    // (e.g. modal content rendered via React portal).
    if (!pageContainer) return null;
    return pageContainer.scrollTop;
  }

  return window.scrollY || 0;
};

export const useScrollThreshold = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = (event: Event) => {
      if (document.documentElement.classList.contains('app-modal-open')) {
        return;
      }

      const nextScrollTop = getScrollTop(event);
      if (nextScrollTop === null) return;

      // If we scroll past the threshold, set to true
      setIsScrolled(nextScrollTop > threshold);
    };

    // Initialize on mount
    const initialScrollTop = getScrollTop();
    if (initialScrollTop !== null) {
      setIsScrolled(initialScrollTop > threshold);
    }

    // Capture scrolls from nested scroll containers (e.g. .page-container)
    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });

    return () => document.removeEventListener('scroll', handleScroll, true);
  }, [threshold]);

  return isScrolled;
};
