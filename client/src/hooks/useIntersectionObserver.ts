import { useState, useEffect, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Hook that utilizes IntersectionObserver to detect when an element is visible in the viewport
 */
export default function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}
