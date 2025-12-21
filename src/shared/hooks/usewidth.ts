import { useState, useEffect } from 'react';

const UseIsWidth = (breakpoint = 360) => {
  const [isWidth, setIsWidth] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsWidth(window.innerWidth <= breakpoint);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [breakpoint]);

  return isWidth;
}

export default UseIsWidth