/**
 * LEVEL 20: Ultra Reviews & FAQ Interactions
 * Advanced animations and interactions
 */

(function() {
  'use strict';

  let isInitialized = false;

  function initReviewsFaqUltra() {
    if (isInitialized) return;
    isInitialized = true;

    // ========== Intersection Observer for Scroll Animations ==========
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: [0, 0.3, 0.6, 1]
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale');
    revealElements.forEach(el => revealObserver.observe(el));

    // ========== Review Cards 3D Tilt Effect ==========
    const reviewCards = document.querySelectorAll('.review-card-ultra');
    
    reviewCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-12px) 
          scale(1.02)
        `;
        
        // Move glow based on mouse position
        const glow = card.querySelector('.card-glow');
        if (glow) {
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;
          glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168, 85, 247, 0.25) 0%, transparent 70%)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // ========== FAQ Accordion Interaction ==========
    const faqItems = document.querySelectorAll('.faq-item-ultra');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current FAQ
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
          
          // Smooth scroll to keep FAQ in view
          setTimeout(() => {
            const rect = item.getBoundingClientRect();
            const offset = window.pageYOffset;
            const top = rect.top + offset - 100;
            
            window.scrollTo({
              top: top,
              behavior: 'smooth'
            });
          }, 300);
        }
      });
      
      // Keyboard accessibility
      question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
      
      // Make focusable
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.setAttribute('aria-expanded', 'false');
      
      // Update aria on toggle
      const observer = new MutationObserver(() => {
        const isActive = item.classList.contains('active');
        question.setAttribute('aria-expanded', isActive.toString());
      });
      
      observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ========== Review Cards Auto-Highlight on Scroll ==========
    const reviewsSection = document.querySelector('.reviews-ultra');
    
    if (reviewsSection) {
      window.addEventListener('scroll', () => {
        const rect = reviewsSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
        
        if (inView) {
          reviewCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = Math.abs(cardCenter - windowCenter);
            
            // Scale based on proximity to center
            const scale = Math.max(0.95, 1 - (distance / 1000));
            const opacity = Math.max(0.7, 1 - (distance / 1500));
            
            if (!card.matches(':hover')) {
              card.style.opacity = opacity;
              card.style.transform = `scale(${scale})`;
            }
          });
        }
      });
    }

    // ========== FAQ Toggle Animation Enhancement ==========
    faqItems.forEach(item => {
      const toggle = item.querySelector('.faq-toggle');
      
      item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) {
          toggle.style.transform = 'scale(1.1) rotate(90deg)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('active')) {
          toggle.style.transform = '';
        }
      });
    });

    // ========== Auto-expand First FAQ ==========
    setTimeout(() => {
      const firstFaq = document.querySelector('.faq-item-ultra');
      if (firstFaq && !document.querySelector('.faq-item-ultra.active')) {
        firstFaq.classList.add('active');
      }
    }, 1000);

    // ========== Parallax Effect on Orbs ==========
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const orbs = document.querySelectorAll('.review-orb');
          const scrollY = window.pageYOffset;
          
          orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            const yOffset = scrollY * speed;
            orb.style.transform = `translateY(${yOffset}px)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    });

    // ========== Rating Badge Pulse Effect ==========
    const ratingBadge = document.querySelector('.rating-badge');
    
    if (ratingBadge) {
      setInterval(() => {
        ratingBadge.style.transform = 'scale(1.05)';
        setTimeout(() => {
          ratingBadge.style.transform = 'scale(1)';
        }, 200);
      }, 5000);
    }

    // ========== Review Card Click to Expand ==========
    reviewCards.forEach(card => {
      card.addEventListener('click', () => {
        // Toggle expanded state
        const isExpanded = card.classList.contains('expanded');
        
        // Remove expanded from all cards
        reviewCards.forEach(c => c.classList.remove('expanded'));
        
        // Add to clicked card if not already expanded
        if (!isExpanded) {
          card.classList.add('expanded');
        }
      });
    });

    console.log('🌟 Level 20 Reviews & FAQ initialized!');
  }

  // ========== Initialize ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsFaqUltra);
  } else {
    initReviewsFaqUltra();
  }

  // Re-initialize on visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      initReviewsFaqUltra();
    }
  });

})();

