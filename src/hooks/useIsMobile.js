import { useState, useEffect } from 'react';

/**
 * Returns true when the viewport is narrower than 768 px.
 * Uses matchMedia so it reacts to orientation changes without polling.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
