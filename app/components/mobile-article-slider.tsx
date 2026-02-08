"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode, Children } from "react";

export function MobileArticleSlider({ 
  children, 
  itemCount 
}: { 
  children: ReactNode; 
  itemCount: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef<number>(1); // Ref to track current index for interval
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  const childArray = Children.toArray(children);
  const totalSlides = itemCount + 2; // Original + 2 clones

  // Sync ref with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goToSlide = useCallback((index: number, transition = true) => {
    setIsTransitioning(transition);
    setCurrentIndex(index);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    
    // Reset to real slide without transition when on clone
    if (currentIndexRef.current === 0) {
      setCurrentIndex(itemCount);
    } else if (currentIndexRef.current === totalSlides - 1) {
      setCurrentIndex(1);
    }
  }, [itemCount, totalSlides]);

  const startAutoSlide = useCallback(() => {
    // Clear any existing interval first
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
    
    // Start new interval using ref to always get latest index
    autoSlideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        currentIndexRef.current = nextIndex;
        return nextIndex;
      });
      setIsTransitioning(true);
    }, 2000);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  }, []);

  const handleInteraction = useCallback(() => {
    // Stop auto-slide immediately
    stopAutoSlide();

    // Clear any existing resume timeout
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }

    // Set new resume timeout - restart auto-slide after 5s
    resumeTimeout.current = setTimeout(() => {
      startAutoSlide();
      resumeTimeout.current = null;
    }, 5000);
  }, [stopAutoSlide, startAutoSlide]);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    setIsDragging(true);
    handleInteraction();
  }, [handleInteraction]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(diff);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 50; // 50px threshold
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe right - go to previous
        goToSlide(currentIndex - 1, true);
      } else {
        // Swipe left - go to next
        goToSlide(currentIndex + 1, true);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  }, [currentIndex, goToSlide, isDragging]);

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current);
        resumeTimeout.current = null;
      }
    };
  }, [startAutoSlide, stopAutoSlide]);

  // Touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Calculate transform with proper percentage-based drag offset
  const dragOffsetPercent = dragOffset * 0.25; // Adjust sensitivity
  const translateX = -currentIndex * 100 + dragOffsetPercent;

  return (
    <div 
      ref={containerRef}
      className="mobile-article-slider"
      style={{
        transform: `translateX(${translateX}%)`,
        transition: isTransitioning && !isDragging ? 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Clone of last slide */}
      <div className="mobile-article-slide">
        {childArray[itemCount - 1]}
      </div>
      
      {/* Real slides */}
      {childArray.map((child, index) => (
        <div key={index} className="mobile-article-slide">
          {child}
        </div>
      ))}
      
      {/* Clone of first slide */}
      <div className="mobile-article-slide">
        {childArray[0]}
      </div>
    </div>
  );
}
