import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen
    gsap.set(cursor, { x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10, // Center the 20px cursor
        y: e.clientY - 10,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterLink = () => {
      cursor.classList.add('hovering');
    };

    const onMouseLeaveLink = () => {
      cursor.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Attach hover effects to buttons and links
    const interactiveElements = document.querySelectorAll('button, a, input, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};
