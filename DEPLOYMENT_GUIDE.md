# Deployment Guide - WorthyTen

**Last Updated:** December 2024

## Overview

This guide covers deployment of WorthyTen to various hosting platforms. - WorthyTen

This guide covers deploying the WorthyTen application to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Firebase project configured
- [ ] Firestore security rules set
- [ ] Firebase Authentication enabled (Phone Auth)
- [ ] Environment variables configured (if needed)
- [ ] All console.log statements removed/wrapped
- [ ] Service worker tested
- [ ] PWA manifest validated
- [ ] Images optimized
- [ ] HTTPS enabled (required for PWA)

## 🔥 Firebase Hosting (Recommended)

### Prerequisites
- Firebase account
- Firebase CLI installed: `npm install -g firebase-tools`

### Steps

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   
   Select options:
   - Use existing project or create new
   - Public directory: `.` (current directory)
   - Configure as single-page app: `No`
   - Set up automatic builds: `No` (or `Yes` if using CI/CD)

3. **Configure `firebase.json`**
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "node_modules/**",
         ".git/**",
         "*.md",
         ".eslintrc.json",
         ".prettierrc.json"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "/sw.js",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "no-cache"
             }
           ]
         },
         {
           "source": "**/*.@(js|css|png|jpg|jpeg|gif|svg|ico)",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "public, max-age=31536000, immutable"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

5. **Verify**
   - Visit your Firebase Hosting URL
   - Test service worker registration
   - Verify PWA installability

## 🌐 Netlify

### Option 1: Drag and Drop

1. Go to [Netlify](https://netlify.com)
2. Drag and drop your project folder
3. Netlify will automatically deploy

### Option 2: Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: (leave empty for static site)
   - Publish directory: `.`

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/*.@(js|css|png|jpg|jpeg|gif|svg|ico)"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## ▲ Vercel

### Via CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts

### Via Dashboard

1. Import project from Git repository
2. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `.`

### Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache"
        }
      ]
    }
  ]
}
```

## 📦 GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select source branch (usually `main` or `gh-pages`)
   - Select folder: `/ (root)`

2. **Custom Domain (Optional)**
   - Add `CNAME` file with your domain
   - Configure DNS records

3. **Note**: GitHub Pages serves over HTTPS, which is good for PWA

## 🔒 Security Headers

Add these headers for better security:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com;

X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install -g firebase-tools
      - run: firebase deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## 📊 Post-Deployment

1. **Verify Deployment**
   - [ ] All pages load correctly
   - [ ] Service worker registers
   - [ ] PWA installable
   - [ ] Firebase connection works
   - [ ] Analytics tracking active

2. **Performance Check**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify caching works

3. **Security Check**
   - Test HTTPS
   - Verify security headers
   - Check Firestore rules

## 🐛 Common Issues

### Service Worker Not Updating
- Clear browser cache
- Unregister old service worker
- Hard refresh (Ctrl+Shift+R)

### Firebase Errors
- Verify Firebase config
- Check CORS settings
- Verify API keys are correct

### PWA Not Working
- Ensure HTTPS (required)
- Verify manifest.json is valid
- Check icon paths

## 📝 Environment-Specific Configs

For different environments, you can use:

```javascript
// js/config.js
const Config = {
  // ... other config
  environment: window.location.hostname === 'worthyten.com' ? 'production' : 'development',
  api: {
    baseUrl: window.location.hostname === 'worthyten.com' 
      ? 'https://api.worthyten.com' 
      : 'http://localhost:3000'
  }
};
```

---

**Last Updated**: December 2024


