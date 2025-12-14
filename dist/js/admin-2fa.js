/**
 * Two-Factor Authentication for Admin
 * Provides secure 2FA using Firebase Phone Authentication
 * @file js/admin-2fa.js
 */

(function() {
  'use strict';

  const STORAGE_KEY = '2fa_setup_temp';

  /**
   * Check if 2FA is enabled for user
   * @param {string} userId - User ID
   * @returns {Promise<boolean>}
   */
  async function is2FAEnabled(userId) {
    try {
      const doc = await firebase.firestore()
        .collection('staffUsers')
        .doc(userId)
        .get();
      
      if (!doc.exists) return false;
      
      const data = doc.data();
      return data.twoFactorEnabled === true;
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error checking 2FA status:', error);
      }
      return false;
    }
  }

  /**
   * Initialize 2FA setup process
   * @returns {Promise<Object>} Setup data including phone auth flow
   */
  async function init2FASetup() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // For Firebase Phone Auth, we'll use the user's phone number
      const phoneNumber = user.phoneNumber;
      
      if (!phoneNumber) {
        throw new Error('Phone number not found. Please ensure your account has a phone number.');
      }

      return {
        success: true,
        phoneNumber: phoneNumber,
        message: 'Ready to set up 2FA. You will receive an SMS for verification.'
      };
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error initializing 2FA setup:', error);
      }
      throw error;
    }
  }

  /**
   * Send 2FA verification code via SMS
   * @param {string} phoneNumber - Phone number to send code to
   * @returns {Promise<Object>} Confirmation result
   */
  async function send2FACode(phoneNumber) {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-2fa-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved
          if (window.Logger) {
            window.Logger.log('reCAPTCHA verified for 2FA');
          }
        },
        'expired-callback': () => {
          if (window.Logger) {
            window.Logger.warn('reCAPTCHA expired');
          }
        }
      });

      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      
      // Store confirmation result temporarily
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        timestamp: Date.now(),
        phoneNumber: phoneNumber
      }));

      return {
        success: true,
        confirmationResult: confirmationResult,
        message: 'Verification code sent successfully'
      };
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error sending 2FA code:', error);
      }
      throw error;
    }
  }

  /**
   * Verify 2FA code and enable 2FA
   * @param {Object} confirmationResult - Firebase confirmation result
   * @param {string} code - Verification code
   * @returns {Promise<boolean>}
   */
  async function verify2FASetup(confirmationResult, code) {
    try {
      // Verify the code
      await confirmationResult.confirm(code);
      
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Enable 2FA in Firestore
      await firebase.firestore()
        .collection('staffUsers')
        .doc(user.uid)
        .update({
          twoFactorEnabled: true,
          twoFactorMethod: 'phone',
          twoFactorPhone: user.phoneNumber,
          twoFactorEnabledAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      // Clean up temp storage
      sessionStorage.removeItem(STORAGE_KEY);

      if (window.Logger) {
        window.Logger.log('2FA enabled successfully');
      }

      return true;
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error verifying 2FA setup:', error);
      }
      throw error;
    }
  }

  /**
   * Verify 2FA code during login
   * @param {string} userId - User ID
   * @param {string} phoneNumber - Phone number
   * @param {string} code - Verification code
   * @returns {Promise<boolean>}
   */
  async function verify2FALogin(confirmationResult, code) {
    try {
      // Verify the code
      const result = await confirmationResult.confirm(code);
      
      if (result.user) {
        if (window.Logger) {
          window.Logger.log('2FA login verification successful');
        }
        return true;
      }
      
      return false;
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error verifying 2FA login:', error);
      }
      throw error;
    }
  }

  /**
   * Disable 2FA for user
   * @param {string} code - Verification code to confirm action
   * @returns {Promise<boolean>}
   */
  async function disable2FA(confirmationResult, code) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Verify the code first
      await confirmationResult.confirm(code);

      // Disable 2FA in Firestore
      await firebase.firestore()
        .collection('staffUsers')
        .doc(user.uid)
        .update({
          twoFactorEnabled: false,
          twoFactorDisabledAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      if (window.Logger) {
        window.Logger.log('2FA disabled successfully');
      }

      return true;
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error disabling 2FA:', error);
      }
      throw error;
    }
  }

  /**
   * Get 2FA status for user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} 2FA status information
   */
  async function get2FAStatus(userId) {
    try {
      const doc = await firebase.firestore()
        .collection('staffUsers')
        .doc(userId)
        .get();
      
      if (!doc.exists) {
        return {
          enabled: false,
          method: null,
          phone: null
        };
      }
      
      const data = doc.data();
      return {
        enabled: data.twoFactorEnabled === true,
        method: data.twoFactorMethod || null,
        phone: data.twoFactorPhone || null,
        enabledAt: data.twoFactorEnabledAt || null
      };
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error getting 2FA status:', error);
      }
      return {
        enabled: false,
        method: null,
        phone: null,
        error: error.message
      };
    }
  }

  /**
   * Initialize reCAPTCHA for 2FA
   * @param {string} containerId - Container element ID
   */
  function initRecaptcha(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container ${containerId} not found`);
      }

      // Clear any existing reCAPTCHA
      container.innerHTML = '';

      return new firebase.auth.RecaptchaVerifier(containerId, {
        'size': 'normal',
        'callback': (response) => {
          if (window.Logger) {
            window.Logger.log('reCAPTCHA verified');
          }
        },
        'expired-callback': () => {
          if (window.Logger) {
            window.Logger.warn('reCAPTCHA expired');
          }
        }
      });
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error initializing reCAPTCHA:', error);
      }
      throw error;
    }
  }

  /**
   * Request 2FA verification during login
   * @param {string} phoneNumber - Phone number to verify
   * @param {Object} appVerifier - reCAPTCHA verifier
   * @returns {Promise<Object>} Confirmation result
   */
  async function request2FAVerification(phoneNumber, appVerifier) {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      
      if (window.Logger) {
        window.Logger.log('2FA verification code sent');
      }

      return confirmationResult;
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error requesting 2FA verification:', error);
      }
      throw error;
    }
  }

  // Expose API
  window.Admin2FA = {
    is2FAEnabled,
    init2FASetup,
    send2FACode,
    verify2FASetup,
    verify2FALogin,
    disable2FA,
    get2FAStatus,
    initRecaptcha,
    request2FAVerification
  };

  if (window.Logger) {
    window.Logger.log('✅ Admin 2FA module loaded');
  }

})();

