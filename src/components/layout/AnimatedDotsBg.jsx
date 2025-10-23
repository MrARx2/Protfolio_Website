import React from 'react';

function AnimatedDotsBg() {
  // Configurable parameters - responsive for mobile
  const isMobile = window.innerWidth <= 768;
  const DOT_COUNT = isMobile ? 20 : 32;
  const WIDTH = isMobile ? 768 : 1920;
  const HEIGHT = isMobile ? 1024 : 1080;
  const LINE_DISTANCE = isMobile ? 180 : 260;
  const SPEED = isMobile ? 0.15 : 0.25;

  // Dots state: [{x, y, vx, vy, r, offsetY}]
  const [dots, setDots] = React.useState(() =>
    Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: 3.5 + Math.random() * 2.5,
      offsetY: 0
    }))
  );
  const lastScrollY = React.useRef(window.scrollY || 0);
  const scrollVelocity = React.useRef(0);
  const requestRef = React.useRef();

  // Listen to scroll and update scroll velocity
  React.useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const newY = window.scrollY || 0;
          scrollVelocity.current = newY - lastScrollY.current;
          lastScrollY.current = newY;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animation loop with scroll nudge effect
  React.useEffect(() => {
    function animate() {
      setDots(prevDots =>
        prevDots.map(dot => {
          let { x, y, vx, vy, r, offsetY } = dot;
          // Nudge dots in opposite direction of scroll, with spring-back
          // Clamp the nudge for subtlety
          const nudge = Math.max(-32, Math.min(32, -scrollVelocity.current * 1.2));
          // Smoothly interpolate offsetY toward nudge, then back to 0
          offsetY += (nudge - offsetY) * 0.18;
          offsetY *= 0.92; // spring back
          x += vx;
          y += vy;
          // Bounce off edges
          if (x < 0 || x > WIDTH) vx = -vx;
          if (y < 0 || y > HEIGHT) vy = -vy * 0.7;
          x = Math.max(0, Math.min(WIDTH, x));
          y = Math.max(0, Math.min(HEIGHT, y));
          return { x, y, vx, vy, r, offsetY };
        })
      );
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Compute lines between close dots
  const lines = [];
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = (dots[i].y + dots[i].offsetY) - (dots[j].y + dots[j].offsetY);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINE_DISTANCE) {
        lines.push({
          x1: dots[i].x,
          y1: dots[i].y + dots[i].offsetY,
          x2: dots[j].x,
          y2: dots[j].y + dots[j].offsetY,
          opacity: 0.32 * (1 - dist / LINE_DISTANCE),
          width: 2.2 + 1.2 * (1 - dist / LINE_DISTANCE)
        });
      }
    }
  }

  return (
    <div className="animated-dots-bg" aria-hidden="true">
      <svg
        width="100vw"
        height="100vh"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100vw", height: "100vh" }}
      >
        {/* Lines */}
        {lines.map((line, idx) => (
          <line
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#7ecbff"
            strokeWidth={line.width}
            strokeLinecap="round"
            opacity={line.opacity}
          />
        ))}
        {/* Dots */}
        {dots.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot.x}
            cy={dot.y + dot.offsetY}
            r={dot.r}
            fill="#7ecbff"
            opacity="0.22"
          />
        ))}
      </svg>
    </div>
  );
}

export default AnimatedDotsBg;
