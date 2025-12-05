// js/header.js (FIXED)
(function injectHeader() {
  // This function now runs *after* the HTML is loaded
  function runInit() {
    injectProgress();
    // NEW: Dispatch a custom event so other scripts know the header is ready
    document.dispatchEvent(new Event('headerLoaded'));
  }

  // Header injection removed - all pages now use inline headers
  // If a page has <div id="header"></div>, it will remain empty
  // All main pages (index.html, etc.) have inline headers
  runInit();

  // Simple step progress setup based on <body data-step="">
  function injectProgress() {
    const step = Number(document.body.getAttribute('data-step') || '1');
    // If you later render a visual stepper here, you can read `step`
    // Currently styling is handled via CSS; this keeps room for future enhancements.
  }
})();
