# WorthyTen - System Architecture

## Overview

WorthyTen is a modern Progressive Web App (PWA) for selling devices online. It uses Firebase as the backend and follows a modular, component-based architecture.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication, Analytics)
- **PWA**: Service Worker, Web App Manifest
- **Build Tools**: Node.js, npm
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   HTML/CSS   │  │  JavaScript  │  │ Service      │      │
│  │   (Static)   │  │  (Modules)   │  │ Worker       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                  │               │
│         └─────────────────┼──────────────────┘               │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
                            │ HTTPS
                            │
┌───────────────────────────┼───────────────────────────────────┐
│                    Firebase Services                          │
├───────────────────────────┼───────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Firestore   │  │  Auth (OTP)  │  │  Analytics    │       │
│  │  (Database)  │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │   Storage    │  │   Hosting    │                         │
│  │  (Images)    │  │  (Static)    │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Application Flow

### User Journey

```
1. Homepage (index.html)
   ├─> Search/Select Device
   │
2. Quote Page (quote.html)
   ├─> View Base Price
   │
3. Assessment Flow
   ├─> Assessment (assessment.html)
   ├─> Physical Condition (physical-condition.html)
   ├─> Functional Issues (functional-issues.html)
   ├─> Accessories (accessories.html)
   └─> Warranty (warranty.html)
   │
4. Summary (summary.html)
   ├─> Review Final Quote
   ├─> Schedule Pickup
   └─> Login/Register
```

## Module Structure

### Core Modules

- **config.js** - Centralized configuration
- **logger.js** - Logging utility (dev-only)
- **ui.js** - UI utilities and helpers
- **state-helper.js** - Session state management

### Feature Modules

- **script.js** - Homepage device selection
- **quote.js** - Quote page logic
- **assessment.js** - Assessment questions
- **physical-condition.js** - Physical condition assessment
- **functional-issues.js** - Functional issues
- **accessories.js** - Accessories selection
- **warranty.js** - Warranty information
- **summary.js** - Final quote summary

### Utility Modules

- **analytics.js** - Analytics tracking
- **error-tracking.js** - Sentry error tracking
- **performance.js** - Performance monitoring
- **accessibility.js** - Accessibility enhancements
- **pwa.js** - PWA functionality
- **login.js** - Authentication

### Advanced Modules

- **image-upload.js** - Image upload functionality
- **multi-device.js** - Multi-device cart
- **advanced-search.js** - Enhanced search with filters

## Data Flow

### State Management

```
SessionStorage
├─> valuationData
│   ├─> productId
│   ├─> brandName
│   ├─> modelName
│   ├─> basePrice
│   ├─> priceAfterPhysical
│   ├─> priceAfterIssues
│   ├─> priceAfterAccessories
│   ├─> finalPrice
│   └─> assessmentAnswers
│
└─> deviceCart (multi-device)
    └─> Array of device objects
```

### Firebase Collections

- **products** - Device catalog
  - name, brand, category, price, image
  
- **users** - User profiles
  - uid, email, phone, coins, wallet
  
- **pickupRequests** - Pickup bookings
  - deviceId, userId, address, date, time, status

## Security

- **CSP Headers** - Content Security Policy
- **Firestore Rules** - Database security
- **Input Validation** - Client-side validation
- **XSS Protection** - HTML escaping
- **Rate Limiting** - OTP request limiting

## Performance

- **Service Worker** - Caching strategy
- **Lazy Loading** - Images and modules
- **Code Splitting** - Route-based splitting
- **Minification** - CSS/JS optimization
- **Core Web Vitals** - Performance monitoring

## Accessibility

- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard access
- **Focus Management** - Visible focus indicators
- **Color Contrast** - WCAG AA compliance

## Deployment

- **Firebase Hosting** - Static hosting
- **CDN** - Global distribution
- **HTTPS** - Secure connections
- **Environment Variables** - Configuration

## Monitoring

- **Sentry** - Error tracking
- **Firebase Analytics** - User analytics
- **Performance Monitoring** - Web Vitals
- **Custom Events** - Business metrics

