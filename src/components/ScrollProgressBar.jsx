import React, { useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
  const progressBarRef = useRef(null);

  const handleScroll = () => {
    if (progressBarRef.current) {
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / scrollableHeight) * 100;
      
      progressBarRef.current.style.width = `${scrolled}%`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 h-[5px] z-[100]"
      style={{
        width: '0%',
        background: 'linear-gradient(90deg, #0d3b66, #14b8a6)',
        transition: 'width 0.05s linear',
      }}
    />
  );
};

export default ScrollProgressBar;