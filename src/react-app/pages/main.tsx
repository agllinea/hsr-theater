import React, { useState, useEffect, useRef } from 'react';
// Desktop wheel event with throttlingimport React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Props interface for child page components
interface PageProps {
  isActive: boolean;
  scrollProgress: number;
}

// Example child page components with different animations
const HomePage: React.FC<PageProps> = ({ isActive, scrollProgress }) => {
  return (
    <div style={styles.pageContent}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          x: scrollProgress > 0.3 ? 0 : -100,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.pageTitle}>Welcome Home</h1>
        <p style={styles.pageSubtitle}>Slide in from left</p>
      </motion.div>
    </div>
  );
};

const AboutPage: React.FC<PageProps> = ({ isActive, scrollProgress }) => {
  return (
    <div style={styles.pageContent}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          x: scrollProgress > 0.3 ? 0 : 100,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.pageTitle}>About Us</h1>
        <p style={styles.pageSubtitle}>Slide in from right</p>
      </motion.div>
    </div>
  );
};

const ServicesPage: React.FC<PageProps> = ({ isActive, scrollProgress }) => {
  return (
    <div style={styles.pageContent}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          scale: scrollProgress > 0.3 ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.pageTitle}>Our Services</h1>
        <p style={styles.pageSubtitle}>Zoom in effect</p>
      </motion.div>
    </div>
  );
};

const PortfolioPage: React.FC<PageProps> = ({ isActive, scrollProgress }) => {
  return (
    <div style={styles.pageContent}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          y: scrollProgress > 0.3 ? 0 : 100,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.pageTitle}>Portfolio</h1>
        <p style={styles.pageSubtitle}>Slide in from bottom</p>
      </motion.div>
    </div>
  );
};

const ContactPage: React.FC<PageProps> = ({ isActive, scrollProgress }) => {
  return (
    <div style={styles.pageContent}>
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          rotate: scrollProgress > 0.3 ? 0 : -10,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.pageTitle}>Contact</h1>
        <p style={styles.pageSubtitle}>Rotate & fade in</p>
      </motion.div>
    </div>
  );
};

// Main component
const Main: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [pageProgress, setPageProgress] = useState<{ [key: number]: number }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const touchStartRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const pages = [
    { id: 0, title: 'Home', bgColor: '#3b82f6', component: HomePage },
    { id: 1, title: 'About', bgColor: '#a855f7', component: AboutPage },
    { id: 2, title: 'Services', bgColor: '#22c55e', component: ServicesPage },
    { id: 3, title: 'Portfolio', bgColor: '#f97316', component: PortfolioPage },
    { id: 4, title: 'Contact', bgColor: '#ef4444', component: ContactPage },
  ];

  const scrollToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
      setDisplayPage(pageIndex);
      const pageElement = document.getElementById(`page-${pageIndex}`);
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Intersection Observer for scroll detection with debounced page activation
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.75, 1.0],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const pageId = parseInt(entry.target.getAttribute('data-page') || '0');
        
        // Update progress for animations
        const progress = entry.intersectionRatio;
        setPageProgress((prev) => ({ ...prev, [pageId]: progress }));
        
        // When page is mostly visible (>75%) and user is not touching
        if (entry.isIntersecting && entry.intersectionRatio > 0.75 && !isTouchingRef.current) {
          setCurrentPage(pageId);
          setDisplayPage(pageId);
        }
      });
    }, options);

    const pageElements = document.querySelectorAll('.page-section');
    pageElements.forEach((page) => observer.observe(page));

    return () => {
      pageElements.forEach((page) => observer.unobserve(page));
    };
  }, []);

  // Detect scroll end
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        // Scroll has ended, check which page is most visible
        const pageElements = document.querySelectorAll('.page-section');
        let maxRatio = 0;
        let mostVisiblePage = 0;
        
        pageElements.forEach((el, index) => {
          const ratio = pageProgress[index] || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisiblePage = index;
          }
        });
        
        if (maxRatio > 0.5) {
          setCurrentPage(mostVisiblePage);
          setDisplayPage(mostVisiblePage);
        }
      }, 150);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pageProgress]);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      if (e.deltaY > 0 && currentPage < pages.length - 1) {
        scrollToPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        scrollToPage(currentPage - 1);
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    const container = containerRef.current;
    if (container && window.innerWidth > 768) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentPage]);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchingRef.current = true;
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStartRef.current - touchEnd;
    const minSwipeDistance = 50;

    // Release touch flag
    isTouchingRef.current = false;

    if (Math.abs(diff) > minSwipeDistance && !isScrollingRef.current) {
      isScrollingRef.current = true;
      
      if (diff > 0 && currentPage < pages.length - 1) {
        scrollToPage(currentPage + 1);
      } else if (diff < 0 && currentPage > 0) {
        scrollToPage(currentPage - 1);
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentPage < pages.length - 1) {
        e.preventDefault();
        scrollToPage(currentPage + 1);
      } else if (e.key === 'ArrowUp' && currentPage > 0) {
        e.preventDefault();
        scrollToPage(currentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow: hidden;
        }

        .main-container {
          width: 100%;
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .main-container::-webkit-scrollbar {
          display: none;
        }

        .page-section {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
        }

        .toc {
          position: fixed;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
        }

        .toc-mobile-label {
          display: none;
        }

        .toc-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .toc-timeline::before {
          content: '';
          position: absolute;
          left: 0.375rem;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 2px;
          background: rgba(156, 163, 175, 0.3);
        }

        .toc-item-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .toc-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .toc-button:active {
          transform: scale(0.9);
        }

        .toc-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .toc-dot.inactive {
          background-color: #9ca3af;
        }

        .toc-dot.active {
          background-color: #2563eb;
          transform: scale(1.5);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }

        .toc-tooltip {
          position: absolute;
          left: 2rem;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          padding: 0.5rem 0.75rem;
          background: white;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .toc-tooltip.active {
          color: #2563eb;
          opacity: 1;
        }

        .toc-tooltip::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 4px solid white;
        }

        @media (hover: hover) {
          .toc-item-wrapper:hover .toc-tooltip {
            opacity: 1;
          }
          
          .toc-item-wrapper:hover .toc-dot.inactive {
            background-color: #60a5fa;
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .toc {
            left: 50%;
            top: auto;
            bottom: 2rem;
            transform: translateX(-50%);
          }

          .toc-mobile-label {
            display: block;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .toc-timeline {
            flex-direction: row;
            gap: 1.5rem;
          }

          .toc-timeline::before {
            left: 0.5rem;
            right: 0.5rem;
            top: 0.375rem;
            bottom: auto;
            width: auto;
            height: 2px;
          }

          .toc-tooltip {
            display: none;
          }

          .toc-dot {
            width: 0.625rem;
            height: 0.625rem;
          }
        }
      `}</style>

      <div 
        ref={containerRef}
        className="main-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {pages.map((page, index) => {
          const PageComponent = page.component;
          const isPageActive = currentPage === index;
          return (
            <motion.div
              key={page.id}
              id={`page-${index}`}
              className="page-section"
              data-page={index}
              style={{ backgroundColor: page.bgColor }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <PageComponent 
                isActive={isPageActive}
                scrollProgress={isPageActive ? 1 : 0}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="toc">
        <div className="toc-mobile-label">
          {pages[displayPage]?.title}
        </div>
        <div className="toc-timeline">
          {pages.map((page, index) => (
            <div key={page.id} className="toc-item-wrapper">
              <button
                onClick={() => scrollToPage(index)}
                className="toc-button"
              >
                <div className={`toc-dot ${currentPage === index ? 'active' : 'inactive'}`} />
              </button>
              <span className={`toc-tooltip ${currentPage === index ? 'active' : ''}`}>
                {page.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContent: {
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    maxWidth: '90%',
  },
  pageTitle: {
    fontSize: 'clamp(2rem, 10vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  pageSubtitle: {
    fontSize: 'clamp(1rem, 5vw, 1.5rem)',
  },
};

export default Main;