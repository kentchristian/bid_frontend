import { useEffect, useState } from 'react';

const readGlobalScrollTop = () => {
  return window.scrollY || document.documentElement.scrollTop || 0;
};

const shouldIgnoreScroll = () => {
  return document.documentElement.classList.contains('app-modal-open');
};

const findPageContainerFromTarget = (target: EventTarget | null) => {
  if (target instanceof Document) {
    return target.querySelector<HTMLElement>('.page-container');
  }

  if (target instanceof HTMLElement) {
    return target.closest<HTMLElement>('.page-container');
  }

  return null;
};

const readScrollTop = (event?: Event) => {
  if (!event) {
    return readGlobalScrollTop();
  }

  const pageContainer = findPageContainerFromTarget(event.target);
  if (pageContainer) {
    return pageContainer.scrollTop;
  }

  if (event.target instanceof Document) {
    return event.target.documentElement.scrollTop || readGlobalScrollTop();
  }

  // Ignore scroll events outside the app's main page scroll container
  // (e.g. modal content rendered via React portal).
  return null;
};

export const useScrollThreshold = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = (event: Event) => {
      if (shouldIgnoreScroll()) {
        return;
      }

      const nextScrollTop = readScrollTop(event);
      if (nextScrollTop === null) return;

      // If we scroll past the threshold, set to true
      setIsScrolled(nextScrollTop > threshold);
    };

    // Initialize on mount
    const initialScrollTop = readScrollTop();
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
