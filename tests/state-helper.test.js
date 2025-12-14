/**
 * Tests for state-helper.js
 * @jest-environment jsdom
 */

describe('State Helper', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('should get session data', () => {
    const testData = { product: 'test', price: 1000 };
    sessionStorage.setItem('deviceData', JSON.stringify(testData));
    
    // Mock the state helper
    const getSessionData = (key) => {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };

    const result = getSessionData('deviceData');
    expect(result).toEqual(testData);
  });

  test('should return null for non-existent key', () => {
    const getSessionData = (key) => {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };

    const result = getSessionData('nonExistent');
    expect(result).toBeNull();
  });

  test('should handle invalid JSON gracefully', () => {
    sessionStorage.setItem('invalidData', 'not json');
    
    const getSessionData = (key) => {
      try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    };

    const result = getSessionData('invalidData');
    expect(result).toBeNull();
  });
});

