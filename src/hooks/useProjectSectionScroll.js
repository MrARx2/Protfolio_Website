import { useEffect, useRef } from 'react';

export function useProjectSectionScroll(containerRef, isWindowScroll = false, onTopSwipeUp = null, enableSnapping = true, enableWheelSnapping = false) {
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = isWindowScroll ? window : containerRef.current;
    if (!container) return;

    const getSections = () => {
      const root = isWindowScroll ? document.body : containerRef.current;
      return Array.from(root.querySelectorAll('.detail-header, .scene-detail-header, .modeling-detail-header, .section-header'));
    };

    const handleScrollSnap = (deltaY) => {
      const currentScroll = isWindowScroll ? window.scrollY : (containerRef.current ? containerRef.current.scrollTop : 0);
      
      // Swipe down to close check (always active if onTopSwipeUp is provided and at top)
      if (deltaY < -60 && currentScroll <= 5 && onTopSwipeUp) {
        onTopSwipeUp();
        return;
      }

      if (!enableSnapping) return; // Exit if snapping is disabled

      if (isScrollingRef.current) return;
      const sections = getSections();
      if (!sections.length) return;
      let targetY = null;

      if (deltaY > 30) {
        // Scroll DOWN -> next section
        const target = sections.find(sec => {
          const offset = isWindowScroll ? sec.getBoundingClientRect().top + window.scrollY : sec.offsetTop;
          return offset > currentScroll + 50;
        });
        if (target) {
          targetY = (isWindowScroll ? target.getBoundingClientRect().top + window.scrollY : target.offsetTop) - (isWindowScroll ? 90 : 30);
        }
      } else if (deltaY < -30) {
        // Scroll UP -> prev section
        const target = [...sections].reverse().find(sec => {
          const offset = isWindowScroll ? sec.getBoundingClientRect().top + window.scrollY : sec.offsetTop;
          return offset < currentScroll - 50;
        });
        
        // If no previous section found, default to 0 (top)
        if (target) {
          targetY = (isWindowScroll ? target.getBoundingClientRect().top + window.scrollY : target.offsetTop) - (isWindowScroll ? 90 : 30);
        }
      }

      if (targetY !== null) {
        isScrollingRef.current = true;
        if (isWindowScroll) {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else {
          containerRef.current.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    };

    const handleWheel = (e) => {
      if (enableWheelSnapping) {
        handleScrollSnap(e.deltaY);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      // Ensure styles are cleaned up
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [containerRef, isWindowScroll]);
}
