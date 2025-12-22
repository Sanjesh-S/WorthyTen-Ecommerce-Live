// ===== Global Firebase OTP Verification Flow (with Wallet & Logout) =====

(function () {

  let modal, closeModal, phoneInput, otpInput, sendOtpBtn, verifyOtpBtn, phoneStep, otpStep, errorBox, successBox, globalLoginBtn, walletBalanceEl, loginBtnSpan;

  /**
   * Fetches user data from Firestore, creates a new user if one doesn't exist,
   * and updates the header UI with coin balance and account status.
   */
  async function updateUserUI(user) {
    // Get header elements - try multiple times if not found
    if (!globalLoginBtn) globalLoginBtn = document.getElementById("globalLoginBtn");
    if (!walletBalanceEl) walletBalanceEl = document.getElementById("walletCoinBalance");
    if (!loginBtnSpan) loginBtnSpan = globalLoginBtn?.querySelector('span');

    // If elements still not found, wait a bit and try again (header might not be loaded yet)
    if (!globalLoginBtn || !loginBtnSpan) {
      if (window.Logger) {
        window.Logger.log("Header elements not found, retrying in 100ms...");
      }
      setTimeout(() => {
        updateUserUI(user);
      }, 100);
      return;
    }

    if (!user) { // User is logged out
      if (loginBtnSpan) {
        loginBtnSpan.textContent = "Login";
        if (window.Logger) {
          window.Logger.log("Updated button to 'Login'");
        }
      }
      if (walletBalanceEl) walletBalanceEl.textContent = "0";
      if (globalLoginBtn) {
        globalLoginBtn.href = "login.html"; // Set link to login page
      }
      return;
    }

    // User is logged in - update button text immediately (BEFORE Firestore check)
    if (loginBtnSpan) {
      loginBtnSpan.textContent = "My Account";
      if (window.Logger) {
        window.Logger.log("Updated button to 'My Account'");
      }
    }
    if (globalLoginBtn) {
      globalLoginBtn.href = "account.html"; // Set link to account page
    }

    // Update coins if Firestore is available
    if (!firebase.firestore) {
      // Firestore not loaded yet, but button text is already updated
      if (walletBalanceEl) walletBalanceEl.textContent = "0";
      return;
    }

    try {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(user.uid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        if (walletBalanceEl) walletBalanceEl.textContent = userData.coins || 0;
        // Ensure button text is still "My Account"
        if (loginBtnSpan) loginBtnSpan.textContent = "My Account";
      } else {
        const newUser = {
          phoneNumber: user.phoneNumber,
          coins: 0,
          createdAt: new Date().toISOString()
        };
        await userRef.set(newUser);
        if (walletBalanceEl) walletBalanceEl.textContent = 0;
        // Ensure button text is still "My Account"
        if (loginBtnSpan) loginBtnSpan.textContent = "My Account";
      }
    } catch (e) {
      if (window.Logger) {
        window.Logger.error("Error fetching/creating user data:", e);
      }
      // Even on error, show "My Account" if user is logged in
      if (loginBtnSpan) loginBtnSpan.textContent = "My Account";
      if (walletBalanceEl) walletBalanceEl.textContent = "!";
    }
  }

  // --- NEW: Handle Logout (defined outside) ---
  function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
      firebase.auth().signOut().then(() => {
        if (window.Logger) {
          window.Logger.log("User logged out.");
        }
        // The onAuthStateChanged listener will automatically update the UI
      }).catch((error) => {
        if (window.Logger) {
          window.Logger.error("Error logging out:", error);
        }
      });
    }
  }

  /**
   * Finds all DOM elements and attaches listeners.
   */
  function setupLoginModal() {
    // Find all elements
    globalLoginBtn = document.getElementById("globalLoginBtn");
    modal = document.getElementById("simple-login-modal"); // This is the OLD modal
    closeModal = document.getElementById("login-modal-close");
    phoneInput = document.getElementById("login-phone");
    otpInput = document.getElementById("login-otp");
    sendOtpBtn = document.getElementById("send-otp-btn");
    verifyOtpBtn = document.getElementById("verify-otp-btn");
    phoneStep = document.getElementById("login-step-phone");
    otpStep = document.getElementById("login-step-otp");
    errorBox = document.getElementById("login-error");
    successBox = document.getElementById("login-success");
    walletBalanceEl = document.getElementById("walletCoinBalance");
    loginBtnSpan = globalLoginBtn?.querySelector('span');

    // --- This is the function for the OLD modal on summary.html etc. ---
    function showOldLoginModal(e) {
      if (e) e.preventDefault();
      // If modal elements are on the current page, show the modal
      if (modal && errorBox && successBox) {
        modal.style.display = "flex";
        errorBox.style.display = "none";
        successBox.style.display = "none";

        // Initialize reCAPTCHA for the modal
        if (!window.recaptchaVerifier) {
          let recaptchaContainer = document.getElementById('recaptcha-container');
          if (!recaptchaContainer) {
            recaptchaContainer = document.createElement('div');
            recaptchaContainer.id = 'recaptcha-container';
            document.body.appendChild(recaptchaContainer);
          }

          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: function (response) {
              if (window.Logger) window.Logger.log("reCAPTCHA verified");
            }
          });
        }
      } else {
        // If no modal on this page, redirect to the login page
        window.location.href = 'login.html';
      }
    }

    // --- Initialize reCAPTCHA if on a page that has it ---
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer) {
      // This is for login.html OR the old modal
      try {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            if (window.Logger) window.Logger.log("reCAPTCHA verified, now sending OTP.");
          }
        });
        // Render it (it's invisible, but this prepares it)
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          if (window.Logger) window.Logger.log("reCAPTCHA rendered.");
        });
      } catch (e) {
        if (window.Logger) window.Logger.error("reCAPTCHA Error:", e);
        if (errorBox) {
          errorBox.textContent = "Could not load reCAPTCHA. Please check your network or refresh.";
          errorBox.style.display = "block";
        }
      }
    }

    // --- Smart Login/Logout Button ---
    globalLoginBtn?.addEventListener("click", (e) => {
      const user = firebase.auth().currentUser;
      if (user) {
        // User is logged in - go to account page
        e.preventDefault();
        window.location.href = "account.html";
      } else {
        // User is not logged in - go to login page
        e.preventDefault();
        // On homepage, redirect to login page instead of showing modal
        if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.includes('index.html')) {
          window.location.href = "login.html";
        } else {
          // On other pages, show modal if available
          showOldLoginModal(e);
        }
      }
    });

    // Close modal
    closeModal?.addEventListener("click", () => {
      modal.style.display = "none";
      if (phoneInput) phoneInput.value = "";
      if (otpInput) otpInput.value = "";
      if (phoneStep) phoneStep.style.display = "block";
      if (otpStep) otpStep.style.display = "none";
    });

    // Send OTP
    sendOtpBtn?.addEventListener("click", () => {
      const number = phoneInput.value.trim();

      // Rate limiting check
      if (window.rateLimiters && window.rateLimiters.otp) {
        if (!window.rateLimiters.otp.isAllowed('sendOtp')) {
          const waitTime = Math.ceil(window.rateLimiters.otp.getResetTime('sendOtp') / 1000);
          errorBox.textContent = `Too many attempts. Please wait ${waitTime} seconds.`;
          errorBox.style.display = "block";
          if (window.SecurityLogger) window.SecurityLogger.logRateLimitViolation('sendOtp');
          return;
        }
      }

      // Input validation
      if (window.SecurityValidator && window.SecurityValidator.hasSuspiciousPatterns(number)) {
        errorBox.textContent = "Invalid input detected.";
        errorBox.style.display = "block";
        if (window.SecurityLogger) window.SecurityLogger.logSuspiciousInput('phone', number);
        return;
      }

      if (number.length !== 10) {
        errorBox.textContent = "Please enter a valid 10-digit number.";
        errorBox.style.display = "block";
        return;
      }

      const fullPhone = "+91" + number;

      // --- FIXED: Ensure appVerifier exists ---
      if (!window.recaptchaVerifier) {
        errorBox.textContent = "reCAPTCHA not loaded. Please refresh.";
        errorBox.style.display = "block";
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      // --- End of Fix ---

      sendOtpBtn.disabled = true;
      sendOtpBtn.textContent = "Sending...";
      errorBox.style.display = "none";

      firebase.auth().signInWithPhoneNumber(fullPhone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          if (phoneStep) phoneStep.style.display = "none";
          if (otpStep) otpStep.style.display = "block";
          if (errorBox) errorBox.style.display = "none";
          alert("OTP sent successfully!");
        })
        .catch((error) => {
          if (window.Logger) {
            window.Logger.error("Error sending OTP:", error);
          }
          if (errorBox) {
            errorBox.textContent = "Error: " + error.message;
            errorBox.style.display = "block";
          }
          // Reset reCAPTCHA if it fails
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.render().catch(err => {
              if (window.Logger) window.Logger.error("Recaptcha reset error", err);
            });
          }
        })
        .finally(() => {
          sendOtpBtn.disabled = false;
          sendOtpBtn.textContent = "Send OTP";
        });
    });

    // Verify OTP
    verifyOtpBtn?.addEventListener("click", () => {
      const code = otpInput.value.trim();

      if (code.length !== 6) {
        errorBox.textContent = "Please enter a valid 6-digit OTP.";
        errorBox.style.display = "block";
        return;
      }

      verifyOtpBtn.disabled = true;
      verifyOtpBtn.textContent = "Verifying...";
      errorBox.style.display = "none";

      if (!window.confirmationResult) {
        errorBox.textContent = "Please send an OTP first.";
        errorBox.style.display = "block";
        verifyOtpBtn.disabled = false;
        verifyOtpBtn.textContent = "Verify & Login";
        return;
      }

      window.confirmationResult.confirm(code)
        .then((result) => {
          const user = result.user;
          if (window.Logger) {
            window.Logger.log("Verified:", user.phoneNumber);
          }

          try { sessionStorage.setItem('isVerified', '1'); } catch (e) { }

          successBox.textContent = "✅ Phone verified successfully!";
          successBox.style.display = "block";

          // --- Update UI with user data ---
          updateUserUI(user);

          setTimeout(() => {
            // If on the login page, check if we have return URL, otherwise go to home
            if (window.location.pathname.endsWith('/login.html')) {
              // Check if there's a return URL in sessionStorage
              const returnUrl = sessionStorage.getItem('loginReturnUrl');
              if (returnUrl) {
                sessionStorage.removeItem('loginReturnUrl');
                // Call callback if it exists before redirecting
                if (typeof window.onLoginVerified === 'function') {
                  // Store callback to call after redirect
                  sessionStorage.setItem('pendingLoginCallback', 'true');
                }
                window.location.href = returnUrl;
              } else {
                window.location.href = 'index.html';
              }
            } else if (modal) {
              // Close modal and reset
              modal.style.display = "none";
              phoneStep.style.display = "block";
              otpStep.style.display = "none";
              otpInput.value = "";
              phoneInput.value = "";

              // Call the callback AFTER closing modal
              // This allows summary page to open pickup modal after login
              if (typeof window.onLoginVerified === 'function') {
                window.onLoginVerified();
              }

              // If on summary page and user just logged in, automatically open pickup modal
              if (window.location.pathname.includes('summary.html')) {
                // Small delay to ensure modal is closed
                setTimeout(() => {
                  const pickupBtn = document.getElementById('bookPickupBtnDesktop') || document.getElementById('bookPickupBtnMobile');
                  if (pickupBtn) {
                    pickupBtn.click();
                  }
                }, 300);
              }
            } else {
              // No modal but callback exists (shouldn't happen, but handle it)
              if (typeof window.onLoginVerified === 'function') {
                window.onLoginVerified();
              }
            }
          }, 1500);

        })
        .catch((error) => {
          if (window.Logger) {
            window.Logger.error("Verification failed:", error);
          }
          errorBox.textContent = "Invalid OTP. Please try again.";
          errorBox.style.display = "block";
        })
        .finally(() => {
          verifyOtpBtn.disabled = false;
          verifyOtpBtn.textContent = "Verify & Login";
        });
    });

    // --- Check auth state - wait for Firebase to be ready ---
    // onAuthStateChanged will fire immediately when Firebase is ready, even if user is already logged in
    let authStateChecked = false;

    // Function to check and update auth state
    function checkAuthState() {
      if (!firebase || !firebase.auth) {
        if (window.Logger) {
          window.Logger.log("Firebase auth not ready yet, retrying...");
        }
        setTimeout(checkAuthState, 100);
        return;
      }

      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!authStateChecked) {
          authStateChecked = true;
          if (window.Logger) {
            window.Logger.log("Firebase auth ready. Initial state check.");
          }
        }

        if (user) {
          if (window.Logger) {
            window.Logger.log("User is logged in:", user.phoneNumber);
          }
          try { sessionStorage.setItem('isVerified', '1'); } catch (e) { }
          updateUserUI(user);
        } else {
          if (window.Logger) {
            window.Logger.log("User is not logged in.");
          }
          try { sessionStorage.removeItem('isVerified'); } catch (e) { }
          updateUserUI(null);
        }
      });

      // Also do an immediate check
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        if (window.Logger) {
          window.Logger.log("Immediate check: User is logged in");
        }
        try { sessionStorage.setItem('isVerified', '1'); } catch (e) { }
        updateUserUI(currentUser);
      }
    }

    // Start checking
    checkAuthState();

    // Fallback: Also check after delays in case Firebase was slow to initialize
    setTimeout(() => {
      if (firebase && firebase.auth) {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          if (window.Logger) {
            window.Logger.log("Delayed check: User is logged in");
          }
          try { sessionStorage.setItem('isVerified', '1'); } catch (e) { }
          updateUserUI(currentUser);
        }
      }
    }, 500);

    setTimeout(() => {
      if (firebase && firebase.auth) {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          if (window.Logger) {
            window.Logger.log("Second delayed check: User is logged in");
          }
          try { sessionStorage.setItem('isVerified', '1'); } catch (e) { }
          updateUserUI(currentUser);
        }
      }
    }, 1000);

    // Expose the showLoginModal function globally (for the old modal)
    window.LoginModal = {
      show: showOldLoginModal
    };

  } // end setupLoginModal

  // Run setup *after* the header is loaded
  // This waits for the 'headerLoaded' event we created in js/header.js
  document.addEventListener("headerLoaded", setupLoginModal);

  // Also check on DOMContentLoaded as a fallback
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // If headerLoaded hasn't fired yet, wait a bit more
      setTimeout(() => {
        if (!globalLoginBtn) {
          setupLoginModal();
        }
      }, 500);
    });
  } else {
    // DOM already loaded, check after a delay
    setTimeout(() => {
      if (!globalLoginBtn) {
        setupLoginModal();
      }
    }, 500);
  }

  // Final fallback: Check auth state periodically until header is found
  let retryCount = 0;
  const maxRetries = 10;
  const checkAuthState = setInterval(() => {
    retryCount++;
    if (globalLoginBtn && loginBtnSpan) {
      clearInterval(checkAuthState);
      // Header found, check auth state one more time
      if (firebase && firebase.auth) {
        const user = firebase.auth().currentUser;
        if (user) {
          updateUserUI(user);
        }
      }
    } else if (retryCount >= maxRetries) {
      clearInterval(checkAuthState);
    }
  }, 200);

})(); // <-- This is the closing brace for the IIFE