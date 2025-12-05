// js/warranty.js (v4 - Global Login)

document.addEventListener("DOMContentLoaded", () => {
  // Check if we just returned from login
  const pendingCallback = sessionStorage.getItem('pendingLoginCallback');
  if (pendingCallback === 'true') {
    sessionStorage.removeItem('pendingLoginCallback');
    // Wait a bit for page to fully load, then reveal price
    setTimeout(() => {
      if (window.onLoginVerified) {
        window.onLoginVerified();
      }
    }, 500);
  }
  
  // Safe read of valuationData
  let vd = null;
  try {
    if (window.StateHelper && typeof window.StateHelper.safeGetValuationData === 'function') {
      vd = window.StateHelper.safeGetValuationData();
    } else {
      const dataStr = sessionStorage.getItem("valuationData");
      if (dataStr) vd = JSON.parse(dataStr);
    }
  } catch (err) {
    if (window.Logger) {
      window.Logger.error('Error reading valuationData:', err);
    }
    vd = null;
  }

  if (!vd) {
    if (window.StateHelper && typeof window.StateHelper.showMissingStateMessage === 'function') {
      window.StateHelper.showMissingStateMessage('This page needs data from the start flow. Click Start Over to begin again.');
    } else {
      window.location.href = "index.html";
    }
    return;
  }

  // DOM elements
  const img = document.getElementById("deviceImage");
  const nameEl = document.getElementById("deviceName");
  const finalEl = document.getElementById("finalPrice");
  const finalBox = document.getElementById("finalQuoteDisplay");
  const finishBtn = document.getElementById("finishBtn"); // Corrected ID from 'finishButton' to 'finishBtn'
  const ageRadios = document.querySelectorAll('input[name="device_age"]');
  const finalPriceLabel = finalBox ? finalBox.querySelector('h3') : null;

  // Show the box, hide the price
  if (finalBox) finalBox.classList.remove("hidden");
  if (finalPriceLabel) finalPriceLabel.classList.add("hidden");
  if (finalEl) finalEl.classList.add("hidden");
  
  if (img && vd.imageUrl) img.src = vd.imageUrl;
  if (nameEl) nameEl.textContent = `${vd.brandName || ""} ${vd.modelName || ""}`.trim();

  const basePrice = Number(vd.priceAfterAccessories || 0);

  function calcFinal() {
    let price = basePrice;
    const age = document.querySelector('input[name="device_age"]:checked')?.value;
    const warrantyBonus = window.Config?.pricing?.warrantyBonusPercentage || 0.05;
    
    // Apply warranty bonus for devices under 1 year with valid bill
    if (age === 'less-than-1' && Array.isArray(vd.accessories) && vd.accessories.includes("bill")) {
      price *= (1 + warrantyBonus);
    }
    
    // Apply age-based deductions for older devices
    const ageDeductions = {
      'less-than-1': 0,     // No deduction - newest
      '1-to-2': 0.05,       // 5% deduction
      'more-than-2': 0.15   // 15% deduction for older devices
    };
    
    if (ageDeductions[age] !== undefined) {
      price *= (1 - ageDeductions[age]);
    }
    
    price = Math.round(price);
    if (finalEl) finalEl.textContent = `₹${price.toLocaleString("en-IN")}`;
    vd.priceAfterWarranty = price;
    vd.deviceAge = age; // Store selected age
    try { sessionStorage.setItem("valuationData", JSON.stringify(vd)); } catch (e) {}
    try { window.updateOfferDrawer?.(vd); } catch {}
  }

  ageRadios.forEach(r => r.addEventListener("change", calcFinal));

  let armed = false;

  function isSessionVerified() {
    try {
      return sessionStorage.getItem('isVerified') === '1';
    } catch (e) {
      return false;
    }
  }

  function revealFinalAndArm() {
    calcFinal(); 
    
    if (finalPriceLabel) finalPriceLabel.classList.remove("hidden");
    if (finalEl) finalEl.classList.remove("hidden");

    if (finishBtn) finishBtn.textContent = "Confirm Order";
    armed = true;
  }
  
  // --- NEW: Define a callback function ---
  // This lets js/login.js tell this page "verification is done"
  window.onLoginVerified = () => {
    if (window.Logger) {
      window.Logger.log("Login verified callback executed on warranty page.");
    }
    // Ensure age is selected before revealing price
    const selectedAge = document.querySelector('input[name="device_age"]:checked')?.value;
    if (selectedAge) {
      revealFinalAndArm();
    } else {
      // If age not selected, show message
      alert('Please select the device age to see the final price.');
    }
  };

  // Click handler
  if (finishBtn) {
    finishBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (armed) {
        window.location.href = "summary.html";
        return;
      }

      const selectedAge = document.querySelector('input[name="device_age"]:checked')?.value;
      if (!selectedAge) {
        alert('Please select the device age before finishing.');
        return;
      }

      if (isSessionVerified()) {
        revealFinalAndArm();
        return;
      }

      // Save current page URL in case of redirect
      try {
        sessionStorage.setItem('loginReturnUrl', window.location.pathname);
      } catch (e) {
        if (window.Logger) {
          window.Logger.warn('Could not save return URL:', e);
        }
      }

      // --- Show login modal directly (NO ALERT - direct modal display) ---
      // Wait a tiny bit to ensure LoginModal is initialized
      setTimeout(() => {
        if (window.LoginModal && typeof window.LoginModal.show === 'function') {
          // Show login modal directly - no alert dialog
          window.LoginModal.show(); 
        } else {
          // Fallback: redirect to login page with return URL
          if (window.Logger) {
            window.Logger.warn("Global login modal not found, redirecting to login page.");
          }
          window.location.href = 'login.html';
        }
      }, 50);
    });
  } else {
    if (window.Logger) {
      window.Logger.warn('warranty.js: finish button (#finishBtn) not found.');
    }
  }

  // init
  calcFinal();
});