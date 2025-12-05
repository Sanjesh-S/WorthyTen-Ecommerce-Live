# WorthyTen - API Documentation

## Overview

WorthyTen uses Firebase services for backend functionality. This document describes the API structure and usage.

## Firebase Configuration

### Initialization

```javascript
// js/firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Firestore Collections

### Products Collection

**Path:** `products`

**Structure:**
```javascript
{
  name: string,        // Device model name
  brand: string,       // Brand name
  category: string,    // Category (Camera, Phone, etc.)
  price: number,       // Base price in INR
  image: string        // Image URL
}
```

**Operations:**

```javascript
// Get all products
const db = firebase.firestore();
const snapshot = await db.collection('products').get();

// Get product by ID
const product = await db.collection('products').doc(productId).get();

// Add product (Admin only)
await db.collection('products').add({
  name: 'Canon EOS R5',
  brand: 'Canon',
  category: 'Camera',
  price: 350000,
  image: 'https://...'
});
```

### Users Collection

**Path:** `users`

**Structure:**
```javascript
{
  uid: string,           // Firebase Auth UID
  email: string,         // Email (optional)
  phone: string,         // Phone number
  coins: number,         // User coins
  wallet: number,        // Wallet balance
  createdAt: timestamp,  // Account creation date
  lastLogin: timestamp   // Last login date
}
```

**Operations:**

```javascript
// Get user data
const userDoc = await db.collection('users').doc(userId).get();

// Update user coins
await db.collection('users').doc(userId).update({
  coins: firebase.firestore.FieldValue.increment(100)
});
```

### Pickup Requests Collection

**Path:** `pickupRequests`

**Structure:**
```javascript
{
  userId: string,        // User ID
  deviceId: string,      // Device ID
  deviceName: string,    // Device name
  finalPrice: number,    // Final quote price
  customerName: string,  // Customer name
  customerPhone: string, // Customer phone
  customerCity: string, // Customer city
  customerPincode: string, // Pincode
  customerAddress: string, // Full address
  pickupDate: string,    // Pickup date
  pickupTime: string,    // Pickup time slot
  status: string,        // pending, confirmed, completed, cancelled
  createdAt: timestamp,  // Request creation date
  updatedAt: timestamp  // Last update date
}
```

**Operations:**

```javascript
// Create pickup request
await db.collection('pickupRequests').add({
  userId: currentUser.uid,
  deviceId: deviceId,
  deviceName: deviceName,
  finalPrice: finalPrice,
  customerName: name,
  customerPhone: phone,
  customerCity: city,
  customerPincode: pincode,
  customerAddress: address,
  pickupDate: selectedDate,
  pickupTime: selectedTime,
  status: 'pending',
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

// Get user's pickup requests
const requests = await db.collection('pickupRequests')
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .get();
```

## Firebase Authentication

### Phone Authentication (OTP)

```javascript
// Send OTP
const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);

// Verify OTP
const result = await confirmationResult.confirm(otpCode);
const user = result.user;
```

### Auth State Listener

```javascript
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User:', user.uid);
  } else {
    // User is signed out
  }
});
```

## Firebase Storage

### Image Upload

```javascript
// Upload device image
const storageRef = firebase.storage().ref();
const imageRef = storageRef.child(`devices/${deviceId}/${imageName}`);
await imageRef.put(imageFile);
const imageUrl = await imageRef.getDownloadURL();
```

## Analytics Events

### Custom Events

```javascript
// Track page view
window.Analytics.trackPageView(pageName, pagePath);

// Track custom event
window.Analytics.trackEvent('button_click', {
  buttonId: 'get-quote-btn',
  page: 'quote'
});

// Track error
window.Analytics.trackError(error, {
  page: 'assessment',
  userId: userId
});

// Track performance
window.Analytics.trackPerformance('LCP', 1500);
```

## Error Tracking

### Sentry Integration

```javascript
// Capture exception
window.ErrorTracking.captureException(error, {
  page: 'assessment',
  userId: userId
});

// Capture message
window.ErrorTracking.captureMessage('Custom message', 'info', {
  context: 'additional data'
});
```

## Session Storage API

### Valuation Data

```javascript
// Store valuation data
const valuationData = {
  productId: '...',
  brandName: '...',
  modelName: '...',
  basePrice: 10000,
  // ... other fields
};
sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

// Retrieve valuation data
const data = JSON.parse(sessionStorage.getItem('valuationData') || '{}');
```

### Multi-Device Cart

```javascript
// Add to cart
window.MultiDevice.addToCart(deviceData);

// Get cart
const cart = window.MultiDevice.getCart();

// Remove from cart
window.MultiDevice.removeFromCart(deviceId);

// Get cart total
const total = window.MultiDevice.getCartTotal();
```

## Configuration

### Config Object

```javascript
// Access configuration
window.Config.app.name;           // 'WorthyTen'
window.Config.cities;              // Array of cities
window.Config.timeSlots;           // Time slot configuration
window.Config.pricing;             // Pricing rules
window.Config.sentry.dsn;          // Sentry DSN
```

## Security Rules

### Firestore Rules (Example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read only for all, write for admins
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
    
    // Users - read own data, write own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Pickup requests - read own requests, create own requests
    match /pickupRequests/{requestId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## Rate Limiting

### OTP Requests

- Maximum 3 OTP requests per hour per phone number
- Implemented in `js/login.js`

## Error Handling

All Firebase operations should be wrapped in try-catch:

```javascript
try {
  const snapshot = await db.collection('products').get();
  // Process data
} catch (error) {
  if (window.Logger) {
    window.Logger.error('Error:', error);
  }
  if (window.ErrorTracking) {
    window.ErrorTracking.captureException(error);
  }
  // Show user-friendly error message
}
```

