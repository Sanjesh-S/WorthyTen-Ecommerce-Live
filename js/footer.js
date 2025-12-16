// js/footer.js - Injects consistent footer across all pages
(function () {
  'use strict';

  // Find or create footer container
  let footerContainer = document.getElementById('footer');

  // Check if page already has inline footer
  const existingFooter = document.querySelector('footer.site-footer');
  if (existingFooter) {
    initFooter();
    return;
  }

  // If no container, create one before closing body
  if (!footerContainer) {
    footerContainer = document.createElement('div');
    footerContainer.id = 'footer';
    document.body.appendChild(footerContainer);
  }

  // Inject the footer HTML
  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-container">
          <!-- Company Info - Always visible -->
          <div class="footer-brand">
            <h3 class="footer-logo">WorthyTen</h3>
            <p class="footer-description">Sell your old devices instantly and get the best price. Fast, secure, and hassle-free device selling experience.</p>
            <div class="footer-social">
              <span class="social-label">Follow us on</span>
              <div class="social-icons">
                <a href="https://twitter.com/worthyten" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-link"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.facebook.com/worthyten" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-link"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/worthytenofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-link"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.youtube.com/@WorthyTen" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-link"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>
            
            <!-- WhatsApp Chat Button -->
            <a href="https://wa.me/919843010746?text=Hi%20WorthyTen,%20I%20want%20to%20sell%20my%20device" target="_blank" rel="noopener noreferrer" class="whatsapp-chat-btn">
              <i class="fa-brands fa-whatsapp"></i>
              <div class="chat-text">
                <span class="chat-title">Chat with Us</span>
                <span class="chat-subtitle">Got questions? Just ask.</span>
              </div>
            </a>
          </div>

          <!-- Collapsible Sections for Mobile -->
          <div class="footer-sections">
            <!-- Quick Links -->
            <div class="footer-column collapsible">
              <h4 class="footer-title" data-toggle="links">
                Quick Links
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
              </h4>
              <ul class="footer-links collapsible-content">
                <li><a href="index.html#how-it-works">How It Works</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="our-stores.html">Our Stores</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="account.html">My Account</a></li>
              </ul>
            </div>

            <!-- Policies -->
            <div class="footer-column collapsible">
              <h4 class="footer-title" data-toggle="policies">
                Policies
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
              </h4>
              <ul class="footer-links collapsible-content">
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                <li><a href="warranty-policy.html">Warranty Policy</a></li>
                <li><a href="refund-policy.html">Return/Refund Policy</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div class="footer-column collapsible">
              <h4 class="footer-title" data-toggle="contact">
                Contact Us
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
              </h4>
              <ul class="footer-contact collapsible-content">
                <li>
                  <i class="fa-solid fa-envelope"></i>
                  <a href="mailto:support@worthyten.com">support@worthyten.com</a>
                </li>
                <li>
                  <i class="fa-solid fa-phone"></i>
                  <a href="tel:+919843010746">+91 98430 10746</a>
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-container">
          <div class="footer-bottom-content">
            <p class="copyright">© <span id="footerYear"></span> WorthyTen Recommerce Pvt Ltd. All rights reserved.</p>
            <div class="footer-legal">
              <a href="privacy-policy.html">Privacy Policy</a>
              <a href="terms-conditions.html">Terms of Service</a>
              <a href="warranty-policy.html">Warranty Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <!-- Floating WhatsApp Button (Mobile) -->
    <a href="https://wa.me/919843010746?text=Hi%20WorthyTen,%20I%20want%20to%20sell%20my%20device" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Chat on WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  `;

  initFooter();

  function initFooter() {
    // Set current year
    const yearEl = document.getElementById('footerYear') || document.getElementById('yearNow');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Mobile collapsible sections
    const titles = document.querySelectorAll('.footer-title[data-toggle]');
    titles.forEach(title => {
      title.addEventListener('click', () => {
        // Only toggle on mobile
        if (window.innerWidth <= 768) {
          const column = title.closest('.footer-column');
          column.classList.toggle('expanded');
        }
      });
    });
  }
})();

