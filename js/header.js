// js/header.js - Injects consistent navigation header across all pages
(function () {
  'use strict';

  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  // Check if we're on the homepage (already has inline header)
  const existingHeader = document.querySelector('header.site-header');
  if (existingHeader) {
    // Already has an inline header, just initialize
    initHeader();
    return;
  }

  // Inject the header HTML
  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <div class="header-logo">
          <a href="index.html" aria-label="WorthyTen Home">
            <h1 class="logo-text">WorthyTen</h1>
          </a>
        </div>

        <nav class="header-nav" aria-label="Main navigation">
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="our-stores.html">Our Stores</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <a href="account.html" class="btn-secondary" id="headerAccountBtn">
            <i class="fa-solid fa-user"></i> Account
          </a>
          <a href="index.html#categories" class="btn-primary">Sell Now</a>
        </div>

        <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;

  initHeader();

  function initHeader() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');

    if (menuToggle && headerNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpen);
        menuToggle.classList.toggle('active');
        headerNav.classList.toggle('mobile-active');
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });

      // Close menu when clicking a link
      headerNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          headerNav.classList.remove('mobile-active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    // Highlight current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });

    // Update progress bar if exists
    injectProgress();

    // Dispatch event for other scripts
    document.dispatchEvent(new Event('headerLoaded'));
  }

  function injectProgress() {
    const step = Number(document.body.getAttribute('data-step') || '0');
    const fill = document.getElementById('stepsFill');
    if (fill && step > 0) {
      const percent = (step / 8) * 100;
      fill.style.width = percent + '%';
    }
  }
})();
