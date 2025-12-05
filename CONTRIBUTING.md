# Contributing to WorthyTen

Thank you for your interest in contributing to WorthyTen! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/worthyten.git
   cd worthyten
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up Firebase:**
   - Create a Firebase project
   - Copy `js/firebase-config.js.example` to `js/firebase-config.js`
   - Add your Firebase configuration

## Development Workflow

### Code Style

- Follow ESLint rules (run `npm run lint`)
- Use Prettier for formatting (run `npm run format`)
- Use meaningful variable and function names
- Add JSDoc comments for functions

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation
- `refactor/refactor-description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
feat: Add image upload functionality
fix: Fix price calculation bug
docs: Update API documentation
refactor: Improve error handling
test: Add tests for state-helper
```

### Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain test coverage above 50%

### Pull Request Process

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write code
   - Add tests
   - Update documentation
   - Run linter: `npm run lint`
   - Run tests: `npm test`

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request:**
   - Provide a clear description
   - Reference related issues
   - Include screenshots if UI changes

## Code Standards

### JavaScript

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions where appropriate
- Use template literals for strings
- Add error handling with try-catch

### HTML

- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Add proper alt text to images
- Use meaningful class names

### CSS

- Use CSS variables for theming
- Follow BEM naming convention
- Keep selectors specific
- Use mobile-first approach

## Project Structure

```
worthyten/
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── config.js         # Configuration
│   ├── logger.js         # Logging utility
│   ├── analytics.js      # Analytics
│   └── ...               # Feature modules
├── images/               # Image assets
├── tests/                # Test files
├── index.html            # Homepage
└── ...                   # Other HTML pages
```

## Adding New Features

1. **Create a new module** in `js/` directory
2. **Add JSDoc comments** at the top
3. **Follow the existing pattern** for structure
4. **Add tests** in `tests/` directory
5. **Update documentation** if needed

## Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

## Feature Requests

1. **Check existing issues** for similar requests
2. **Create a new issue** with:
   - Clear title
   - Detailed description
   - Use case/benefits
   - Mockups if applicable

## Questions?

- Open an issue for questions
- Check existing documentation
- Review code comments

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to WorthyTen! 🎉

