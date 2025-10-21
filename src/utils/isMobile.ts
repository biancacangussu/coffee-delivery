import { useState, useEffect } from 'react';

const useMobile = (breakpoint = 1368) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;