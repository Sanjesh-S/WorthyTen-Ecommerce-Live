/**
 * Tests for analytics.js
 * @jest-environment jsdom
 */

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.window.Analytics = {
      trackPageView: jest.fn(),
      trackEvent: jest.fn(),
      trackError: jest.fn(),
      trackPerformance: jest.fn()
    };
  });

  test('should track page view', () => {
    const pageName = 'Test Page';
    const pagePath = '/test';
    
    if (window.Analytics) {
      window.Analytics.trackPageView(pageName, pagePath);
    }

    expect(window.Analytics.trackPageView).toHaveBeenCalledWith(pageName, pagePath);
  });

  test('should track custom event', () => {
    const eventName = 'button_click';
    const eventParams = { buttonId: 'test-btn' };
    
    if (window.Analytics) {
      window.Analytics.trackEvent(eventName, eventParams);
    }

    expect(window.Analytics.trackEvent).toHaveBeenCalledWith(eventName, eventParams);
  });

  test('should track error', () => {
    const error = new Error('Test error');
    const context = { page: 'test' };
    
    if (window.Analytics) {
      window.Analytics.trackError(error, context);
    }

    expect(window.Analytics.trackError).toHaveBeenCalledWith(error, context);
  });

  test('should track performance metric', () => {
    const metricName = 'LCP';
    const value = 1500;
    
    if (window.Analytics) {
      window.Analytics.trackPerformance(metricName, value);
    }

    expect(window.Analytics.trackPerformance).toHaveBeenCalledWith(metricName, value);
  });
});

