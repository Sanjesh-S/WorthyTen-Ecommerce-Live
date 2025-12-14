/**
 * ULTRA-MODERN How It Works Animations
 * Level 10 - Beyond Apple.com
 * Advanced scroll-driven animations with 3D effects
 */

(function() {
  'use strict';

  let isInitialized = false;

  function initUltraAnimations() {
    if (isInitialized) return;
    isInitialized = true;

    // ========== Intersection Observer with Advanced Options ==========
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          entry.target.classList.add('in-view');
          
          // Trigger specific animations based on step
          const step = entry.target.dataset.step;
          if (step) {
            triggerStepAnimations(step, entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe timeline steps
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(step => timelineObserver.observe(step));

    // ========== Mouse Move 3D Tilt Effect ==========
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(20px) 
          scale(1.02)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // ========== Smooth Parallax Scroll ==========
    let ticking = false;
    let scrollProgress = 0;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    });

    function updateScrollAnimations() {
      const section = document.querySelector('.how-works-ultra');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress through section
      scrollProgress = Math.min(
        Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0),
        1
      );
      
      // Animate floating shapes
      const shapes = document.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        const yOffset = scrollProgress * 200 * speed;
        const rotation = scrollProgress * 180 * (index % 2 === 0 ? 1 : -1);
        shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
      });
      
      // Parallax effect on timeline steps
      const steps = document.querySelectorAll('.timeline-step.in-view');
      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const stepProgress = (windowHeight - stepRect.top) / windowHeight;
        const parallaxOffset = stepProgress * 30 * (index % 2 === 0 ? 1 : -1);
        
        const card = step.querySelector('.step-card');
        if (card && !card.matches(':hover')) {
          card.style.transform = `translateY(${parallaxOffset}px)`;
        }
      });
      
      // Mesh gradient animation
      const mesh = document.querySelector('.mesh-gradient');
      if (mesh) {
        const hue = scrollProgress * 60;
        mesh.style.filter = `hue-rotate(${hue}deg)`;
      }
    }

    // ========== Counter Animation ==========
    function animateCounter(element, start, end, duration) {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('en-IN');
      }, 16);
    }

    // ========== Step-Specific Animations ==========
    function triggerStepAnimations(stepNumber, stepElement) {
      switch(stepNumber) {
        case '1':
          // Animate device grid selection
          setTimeout(() => {
            const miniDevices = stepElement.querySelectorAll('.mini-device');
            miniDevices.forEach((device, i) => {
              setTimeout(() => {
                device.style.transform = 'scale(1) rotate(0deg)';
                device.style.opacity = '1';
              }, i * 100);
            });
          }, 300);
          break;
          
        case '2':
          // Animate price counter
          setTimeout(() => {
            const priceValue = stepElement.querySelector('.price-value');
            if (priceValue) {
              animateCounter(priceValue, 0, 45250, 1500);
            }
          }, 800);
          break;
          
        case '3':
          // Animate payment flow
          const flowIcons = stepElement.querySelectorAll('.flow-icon');
          flowIcons.forEach((icon, i) => {
            setTimeout(() => {
              icon.style.background = 'rgba(0, 191, 165, 0.2)';
              icon.style.borderColor = 'rgba(0, 191, 165, 0.5)';
              icon.style.boxShadow = '0 0 40px rgba(0, 191, 165, 0.4)';
            }, i * 300);
          });
          break;
      }
    }

    // ========== Magnetic Button Effect ==========
    const badges = document.querySelectorAll('.step-badge, .payment-badge');
    
    badges.forEach(badge => {
      badge.addEventListener('mousemove', (e) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        badge.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      });
      
      badge.addEventListener('mouseleave', () => {
        badge.style.transform = '';
      });
    });

    // ========== Smooth Reveal on Load ==========
    setTimeout(() => {
      document.querySelector('.how-works-ultra')?.classList.add('loaded');
    }, 100);

    // ========== Advanced Hover Effects ==========
    stepCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        // Add glow effect
        card.style.boxShadow = `
          0 40px 100px rgba(0, 191, 165, 0.3),
          0 0 100px rgba(102, 126, 234, 0.2),
          inset 0 0 80px rgba(255, 255, 255, 0.05)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
      });
    });

    // ========== Floating Stats Bar Scroll Effect ==========
    const floatingStats = document.querySelector('.floating-stats');
    
    if (floatingStats) {
      window.addEventListener('scroll', () => {
        const howWorksSection = document.querySelector('.how-works-ultra');
        if (!howWorksSection) return;
        
        const sectionRect = howWorksSection.getBoundingClientRect();
        const inView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
        
        if (inView) {
          floatingStats.style.opacity = '1';
          floatingStats.style.transform = 'translateY(0)';
        } else {
          floatingStats.style.opacity = '0';
          floatingStats.style.transform = 'translateY(100px)';
        }
      });
    }

    // ========== Progressive Enhancement: Check for reduced motion ==========
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable complex animations for accessibility
      document.querySelector('.how-works-ultra')?.classList.add('reduced-motion');
    }

    // ========== Timeline Progress Indicator ==========
    const timelineTrack = document.querySelector('.timeline-track');
    
    if (timelineTrack) {
      window.addEventListener('scroll', () => {
        const section = document.querySelector('.how-works-ultra');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const progress = Math.min(Math.max(
          (window.innerHeight - rect.top) / rect.height, 0
        ), 1);
        
        timelineTrack.style.background = `linear-gradient(180deg, 
          rgba(0, 191, 165, 0.8) 0%,
          rgba(0, 191, 165, 0.8) ${progress * 100}%,
          rgba(0, 191, 165, 0.2) ${progress * 100}%,
          rgba(0, 191, 165, 0.2) 100%
        )`;
      });
    }

    // ========== Easter Egg: Konami Code for Special Effect ==========
    let konamiIndex = 0;
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateUltraMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    function activateUltraMode() {
      const section = document.querySelector('.how-works-ultra');
      if (section) {
        section.classList.add('ultra-mode');
        setTimeout(() => section.classList.remove('ultra-mode'), 3000);
      }
    }

    console.log('🚀 Ultra animations initialized - Level 10 activated!');
  }

  // ========== Initialize ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltraAnimations);
  } else {
    initUltraAnimations();
  }

  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      initUltraAnimations();
    }
  });

})();

