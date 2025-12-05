/**
 * Image Upload for Device Assessment
 * Allows users to upload device photos during assessment
 * @file js/image-upload.js
 */

(function() {
  'use strict';

  /**
   * Initialize image upload functionality
   */
  function initImageUpload() {
    const uploadContainers = document.querySelectorAll('.image-upload-container');
    
    uploadContainers.forEach(container => {
      const input = container.querySelector('input[type="file"]');
      const preview = container.querySelector('.image-preview');
      const removeBtn = container.querySelector('.remove-image-btn');
      
      if (!input) return;

      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          handleImageUpload(file, preview, container);
        }
      });

      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          removeImage(input, preview, container);
        });
      }
    });
  }

  /**
   * Handle image upload
   */
  function handleImageUpload(file, preview, container) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError('Image size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (preview) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      
      // Show remove button
      const removeBtn = container.querySelector('.remove-image-btn');
      if (removeBtn) {
        removeBtn.style.display = 'block';
      }

      // Store image data in sessionStorage
      storeImageData(e.target.result, container.dataset.imageType || 'device');
    };

    reader.readAsDataURL(file);
  }

  /**
   * Remove uploaded image
   */
  function removeImage(input, preview, container) {
    input.value = '';
    if (preview) {
      preview.src = '';
      preview.style.display = 'none';
    }
    
    const removeBtn = container.querySelector('.remove-image-btn');
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }

    // Remove from sessionStorage
    const imageType = container.dataset.imageType || 'device';
    removeImageData(imageType);
  }

  /**
   * Store image data in sessionStorage
   */
  function storeImageData(imageData, imageType) {
    try {
      const valuationData = JSON.parse(sessionStorage.getItem('valuationData') || '{}');
      valuationData[`${imageType}Image`] = imageData;
      sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error storing image data:', e);
      }
    }
  }

  /**
   * Remove image data from sessionStorage
   */
  function removeImageData(imageType) {
    try {
      const valuationData = JSON.parse(sessionStorage.getItem('valuationData') || '{}');
      delete valuationData[`${imageType}Image`];
      sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error removing image data:', e);
      }
    }
  }

  /**
   * Show error message
   */
  function showError(message) {
    if (window.UI && window.UI.showToast) {
      window.UI.showToast(message, 'error');
    } else {
      alert(message);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageUpload);
  } else {
    initImageUpload();
  }

  // Expose globally
  window.ImageUpload = {
    initImageUpload,
    handleImageUpload,
    removeImage
  };

})();

