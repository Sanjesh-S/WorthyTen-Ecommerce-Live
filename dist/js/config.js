// js/config.js
// Centralized configuration for WorthyTen

const Config = {
  // App Information
  app: {
    name: 'WorthyTen',
    version: '1.0.0',
    description: 'Sell your old devices instantly and get the best price'
  },
  
  // Error Tracking (Sentry)
  sentry: {
    dsn: 'https://af596d6b7b8b3f63ab4a1c323750b931@o4510460851650560.ingest.us.sentry.io/4510460853813248', // Add your Sentry DSN here: https://sentry.io/settings/YOUR_ORG/projects/YOUR_PROJECT/keys/
    enabled: true, // Set to false to disable Sentry
    environment: 'production' // Will be auto-detected based on hostname
  },
  
  // Tamil Nadu Cities (for pickup)
  cities: [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Dindigul', 'Thanjavur',
    'Tuticorin', 'Kanchipuram', 'Nagercoil', 'Karur', 'Udhagamandalam',
    'Hosur', 'Neyveli', 'Cuddalore', 'Kumbakonam', 'Tiruppur',
    'Sivakasi', 'Pollachi', 'Rajapalayam', 'Pudukkottai', 'Vaniyambadi',
    'Ambur', 'Nagapattinam', 'Gudiyatham', 'Palani', 'Paramakudi',
    'Arakkonam', 'Tiruvannamalai', 'Ranipet', 'Karaikudi', 'Valparai',
    'Sankarankovil', 'Tenkasi', 'Palladam', 'Pattukkottai', 'Tirupathur'
  ],
  
  // Time Slots for Pickup
  timeSlots: {
    morning: ['10:00 AM - 01:00 PM', '11:00 AM - 02:00 PM'],
    afternoon: ['02:00 PM - 05:00 PM', '03:00 PM - 06:00 PM'],
    evening: ['05:00 PM - 08:00 PM', '06:00 PM - 09:00 PM']
  },
  
  // Price Calculation
  pricing: {
    // Deduction percentages for assessment questions
    deductions: {
      powerOn: 0.30,
      bodyDamage: 0.25,
      lcdScreen: 0.20,
      lensCondition: 0.15,
      autofocusZoom: 0.15
    },
    // Minimum price (10% of original)
    minPricePercentage: 0.10,
    // Warranty bonus (5% if bill present and device under 11 months)
    warrantyBonusPercentage: 0.05
  },
  
  // Coin System
  coins: {
    // Default coin percentage (5% of final price)
    defaultPercentage: 0.05,
    // Minimum coins
    minCoins: 0
  },
  
  // Session Management
  session: {
    // Session storage keys
    keys: {
      valuationData: 'valuationData',
      isVerified: 'isVerified'
    },
    // Quote validity (days)
    quoteValidityDays: 7
  },
  
  // API Configuration
  api: {
    // Rate limiting
    rateLimit: {
      otpRequests: 3, // per hour
      otpWindow: 3600000 // 1 hour in milliseconds
    }
  },
  
  // UI Configuration
  ui: {
    // Animation durations (ms)
    animation: {
      fast: 150,
      normal: 200,
      slow: 300
    },
    // Toast notification duration (ms)
    toastDuration: 3000,
    // Loading states
    loading: {
      minDisplayTime: 500 // Minimum time to show loading (ms)
    }
  },
  
  // Feature Flags
  features: {
    pwa: true,
    analytics: true,
    errorTracking: true,
    offlineSupport: true
  }
};

// Freeze config to prevent accidental modifications
Object.freeze(Config);
Object.freeze(Config.cities);
Object.freeze(Config.timeSlots);
Object.freeze(Config.pricing);
Object.freeze(Config.coins);
Object.freeze(Config.session);
Object.freeze(Config.api);
Object.freeze(Config.ui);
Object.freeze(Config.features);

// Export globally
window.Config = Config;


