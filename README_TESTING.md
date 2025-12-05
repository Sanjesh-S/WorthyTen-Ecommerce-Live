# Testing Guide - WorthyTen

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Run tests in watch mode:**
   ```bash
   npm run test:watch
   ```

4. **Generate coverage report:**
   ```bash
   npm run test:coverage
   ```

## Test Structure

```
tests/
├── setup.js              # Global test configuration
├── state-helper.test.js  # State management tests
└── analytics.test.js     # Analytics tests
```

## Writing Tests

### Example Test

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  test('should do something', () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

## Coverage Goals

- **Branches:** 50%
- **Functions:** 50%
- **Lines:** 50%
- **Statements:** 50%

## Running Linting

```bash
npm run lint
npm run lint:fix
```

## Code Formatting

```bash
npm run format
```

