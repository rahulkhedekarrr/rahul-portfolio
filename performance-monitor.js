// Performance monitoring script for the portfolio website
// Add this to your browser console to monitor performance

(function() {
  'use strict';
  
  // Performance monitoring
  const performanceMonitor = {
    init() {
      this.measurePageLoad();
      this.measureScrollPerformance();
      this.measureAnimationPerformance();
      this.logPerformanceMetrics();
    },
    
    measurePageLoad() {
      window.addEventListener('load', () => {
        const navigationStart = performance.timing.navigationStart;
        const loadComplete = performance.timing.loadEventEnd;
        const loadTime = loadComplete - navigationStart;
        
        console.log(`🚀 Page Load Time: ${loadTime}ms`);
        
        // Check if load time is under 3 seconds (good performance)
        if (loadTime < 3000) {
          console.log('✅ Excellent page load performance!');
        } else if (loadTime < 5000) {
          console.log('⚠️ Good page load performance, but could be better');
        } else {
          console.log('❌ Page load performance needs improvement');
        }
      });
    },
    
    measureScrollPerformance() {
      let scrollStartTime;
      let frameCount = 0;
      
      const measureScroll = () => {
        frameCount++;
        if (frameCount % 60 === 0) { // Check every 60 frames (1 second)
          const now = performance.now();
          if (scrollStartTime) {
            const fps = 60000 / (now - scrollStartTime);
            console.log(`📊 Scroll FPS: ${fps.toFixed(1)}`);
            
            if (fps < 30) {
              console.log('⚠️ Low scroll performance detected');
            }
          }
          scrollStartTime = now;
        }
        requestAnimationFrame(measureScroll);
      };
      
      requestAnimationFrame(measureScroll);
    },
    
    measureAnimationPerformance() {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`🎬 Animation: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['measure'] });
    },
    
    logPerformanceMetrics() {
      // Log Core Web Vitals
      if ('web-vitals' in window) {
        import('https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.js').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
          onCLS(console.log);
          onFID(console.log);
          onFCP(console.log);
          onLCP(console.log);
          onTTFB(console.log);
        });
      }
      
      // Log memory usage (if available)
      if (performance.memory) {
        console.log('💾 Memory Usage:', {
          used: `${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB`,
          total: `${Math.round(performance.memory.totalJSHeapSize / 1048576)}MB`,
          limit: `${Math.round(performance.memory.jsHeapSizeLimit / 1048576)}MB`
        });
      }
    }
  };
  
  // Start monitoring
  performanceMonitor.init();
  
  // Performance tips
  console.log(`
🎯 Performance Optimization Tips:
1. Use React.memo for components that don't need frequent re-renders
2. Use useMemo for expensive calculations
3. Use useCallback for event handlers
4. Minimize backdrop-filter usage on mobile
5. Use transform and opacity for animations
6. Enable hardware acceleration with translateZ(0)
7. Use contain: layout style paint for better rendering
8. Optimize images and use WebP format
9. Minimize bundle size with code splitting
10. Use CDN for static assets
  `);
})();
