/* global window */
import { useState, useEffect } from "react";

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

// inspiration:  https://usehooks.com/useWindowSize/

function useWindowResize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    const debounedHandleResize = debounce(function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000);
    // Add event listener
    window.addEventListener("resize", debounedHandleResize);
    // Call handler right away so state gets updated with initial window size
    debounedHandleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debounedHandleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default useWindowResize;
