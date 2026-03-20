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

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => { 
      const deltaText = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaText) > 40) handleScrollSnap(deltaText);
    };

    let isPointerDown = false;
    let pointerStartY = 0;
    const handlePointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // Don't hijack if user is clicking inside an interactive element
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      isPointerDown = true;
      pointerStartY = e.clientY;
      // Prevent text selection start while dragging
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      const deltaText = pointerStartY - e.clientY;
      if (Math.abs(deltaText) > 40) handleScrollSnap(deltaText);
    };

    const handleDragStart = (e) => {
      if (isPointerDown) e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('dragstart', handleDragStart);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('dragstart', handleDragStart);
      // Ensure styles are cleaned up
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [containerRef, isWindowScroll]);
}
