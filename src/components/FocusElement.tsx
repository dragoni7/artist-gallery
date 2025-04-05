import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface FocusElementProps {
  children: React.ReactNode;
}

export default function FocusElement(props: FocusElementProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') return;
    const scrollAmount = 1.3 * window.innerHeight;
    window.scrollTo({ top: scrollAmount, behavior: 'instant' });
  }, [location]);

  return (
    <div ref={sectionRef} style={{ width: '100%', height: '100%' }}>
      {props.children}
    </div>
  );
}
