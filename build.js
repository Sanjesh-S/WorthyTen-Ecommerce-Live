/**
 * Build Script for WorthyTen
 * Minifies CSS and JavaScript, optimizes assets
 * @file build.js
 */

const fs = require('fs');
const path = require('path');

// Simple minification (for production, use proper minifiers like terser, cssnano)
function minifyJS(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*/g, '') // Remove line comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, ';}') // Remove space before closing brace
    .replace(/\s*{\s*/g, '{') // Remove space around opening brace
    .replace(/;\s*/g, ';') // Remove space after semicolon
    .trim();
}

function minifyCSS(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*{\s*/g, '{') // Remove space around braces
    .replace(/\s*}\s*/g, '}') // Remove space around closing braces
    .replace(/\s*:\s*/g, ':') // Remove space around colons
    .replace(/\s*;\s*/g, ';') // Remove space around semicolons
    .replace(/\s*,\s*/g, ',') // Remove space around commas
    .trim();
}

// Build configuration
const config = {
  input: {
    css: 'css/style.css',
    js: 'js/**/*.js'
  },
  output: {
    dir: 'dist',
    css: 'dist/css/style.min.css',
    js: 'dist/js'
  }
};

// Create output directory
if (!fs.existsSync(config.output.dir)) {
  fs.mkdirSync(config.output.dir, { recursive: true });
  fs.mkdirSync('dist/css', { recursive: true });
  fs.mkdirSync('dist/js', { recursive: true });
}

// Minify CSS
try {
  const cssContent = fs.readFileSync(config.input.css, 'utf8');
  const minifiedCSS = minifyCSS(cssContent);
  fs.writeFileSync(config.output.css, minifiedCSS);
  console.log(`✅ Minified CSS: ${config.output.css}`);
} catch (error) {
  console.error('❌ Error minifying CSS:', error.message);
}

// Copy and minify JS files
const jsDir = 'js';
const distJsDir = 'dist/js';

if (fs.existsSync(jsDir)) {
  const files = fs.readdirSync(jsDir);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      try {
        const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
        const minified = minifyJS(content);
        fs.writeFileSync(path.join(distJsDir, file.replace('.js', '.min.js')), minified);
        console.log(`✅ Minified JS: ${file}`);
      } catch (error) {
        console.error(`❌ Error minifying ${file}:`, error.message);
      }
    }
  });
}

console.log('\n✅ Build complete!');
console.log('📦 Output directory: dist/');

