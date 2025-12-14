/**
 * Jest Test Setup
 * Global test configuration and mocks
 */

// Mock window objects
global.window = {
  location: {
    href: 'http://localhost:8000',
    hostname: 'localhost',
    pathname: '/',
    search: ''
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  performance: {
    timing: {
      navigationStart: 0,
      domainLookupStart: 0,
      domainLookupEnd: 0,
      connectStart: 0,
      connectEnd: 0,
      requestStart: 0,
      responseStart: 0,
      responseEnd: 0,
      domInteractive: 0,
      domComplete: 0,
      loadEventEnd: 0
    }
  }
};

global.document = {
  createElement: jest.fn(() => ({
    setAttribute: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => [])
  })),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  getElementById: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: 'complete'
};

// Mock Firebase
global.window.firebase = {
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    currentUser: null
  })),
  firestore: jest.fn(),
  analytics: jest.fn()
};

// Mock Logger
global.window.Logger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
};

// Mock Analytics
global.window.Analytics = {
  trackPageView: jest.fn(),
  trackEvent: jest.fn(),
  trackError: jest.fn(),
  trackPerformance: jest.fn()
};

// Mock Config
global.window.Config = {
  app: {
    name: 'WorthyTen',
    version: '1.0.0'
  },
  sentry: {
    dsn: '',
    enabled: false
  }
};

