// js/home.js - lightweight slider + footer year + mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // Set the current year in the footer
  const yearEl = document.getElementById('yearNow');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const headerNav = document.querySelector('.header-nav');
  const headerActions = document.querySelector('.header-actions');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle mobile menu classes
      if (headerNav) headerNav.classList.toggle('mobile-active');
      if (headerActions) headerActions.classList.toggle('mobile-active');
      
      // Animate hamburger icon
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main-content') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Review slider (if exists)
  const slider = document.querySelector('.review-slider');
  if (!slider) return;
  const slides = slider.querySelector('.slides');
  const items  = slider.querySelectorAll('.review');
  const prev   = slider.querySelector('.prev');
  const next   = slider.querySelector('.next');
  let idx = 0;

  function go(i){
    idx = (i + items.length) % items.length;
    slides.style.transform = `translateX(-${idx*100}%)`;
  }

  prev?.addEventListener('click', ()=>go(idx-1));
  next?.addEventListener('click', ()=>go(idx+1));

  if (slider.getAttribute('data-autoplay') === 'true'){
    setInterval(()=>go(idx+1), 4500);
  }
});
