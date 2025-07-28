import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll polyfill for better performance
    const smoothScrollTo = (target: Element) => {
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetTop - startPosition;
      const duration = 800;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        const easeProgress = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Override default scroll behavior
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('data-scroll-to')) {
        e.preventDefault();
        const targetId = target.getAttribute('data-scroll-to');
        const targetElement = document.getElementById(targetId!);
        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};