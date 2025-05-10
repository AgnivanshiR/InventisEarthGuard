import { useState, useEffect } from "react";

/**
 * Hook that creates an animated counter effect
 * @param target The final number to count to
 * @param duration Duration of the count animation in seconds
 * @param shouldStart Whether to start the counter
 * @param delay Optional delay before starting the counter in seconds
 */
export default function useCounter(
  target: number,
  duration = 2,
  shouldStart = true,
  delay = 0
): number | string {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let timeoutId: NodeJS.Timeout;
    let startTime: number;
    let animationFrameId: number;
    
    const startCounter = () => {
      startTime = Date.now();
      
      const updateCounter = () => {
        const now = Date.now();
        const elapsedTime = (now - startTime) / 1000; // convert to seconds
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Use easeOutQuad for smoother counting
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        
        setCount(Math.floor(easedProgress * target));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          setCount(target);
        }
      };
      
      updateCounter();
    };
    
    if (delay > 0) {
      timeoutId = setTimeout(() => {
        startCounter();
      }, delay * 1000);
    } else {
      startCounter();
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, shouldStart, delay]);
  
  // Format the output based on the target value
  if (target > 90 && target < 100) {
    return `${count.toFixed(1)}%`;
  } else if (target >= 1000) {
    return `${count}+`;
  }
  
  return count;
}
