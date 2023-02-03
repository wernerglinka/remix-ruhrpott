/* global IntersectionObserver */
import { useState, useEffect } from "react";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  let observer;

  if (typeof window !== `undefined`) {
    observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      observer.observe(ref.current);
    }
    // Remove the observer as soon as the component is unmounted
    return () => {
      if (typeof window !== `undefined`) {
        observer.disconnect();
      }
    };
  }, []);

  return isIntersecting;
}

export default useOnScreen;
