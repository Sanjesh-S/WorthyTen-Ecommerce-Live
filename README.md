# WorthyTen - Device Selling Platform

A modern, responsive web application for selling devices instantly. Get the best price for your cameras, phones, and electronics with a fast, secure, and hassle-free experience.

## 🚀 Features

- **Multi-Step Device Assessment**: Complete workflow from device selection to final quote
- **Real-Time Price Calculation**: Dynamic pricing based on device condition and accessories
- **Firebase Integration**: Secure authentication (OTP) and Firestore database
- **Progressive Web App (PWA)**: Installable app with offline support
- **Admin Dashboard**: Full CRUD operations for product management
- **Pickup Request System**: Schedule device pickup with date/time selection
- **User Account System**: Profile management and coin/wallet system
- **Responsive Design**: Mobile-first approach with modern UI

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication)
- **PWA**: Service Worker, Web App Manifest
- **Analytics**: Firebase Analytics
- **Error Tracking**: Sentry-ready (configurable)

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project with:
  - Firestore database
  - Authentication (Phone Auth enabled)
  - Firebase Analytics (optional)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JS-fix-main
   ```

2. **Configure Firebase**
   - Update `js/firebase-config.js` with your Firebase project credentials
   - Ensure Firestore security rules are properly configured
   - Enable Phone Authentication in Firebase Console

3. **Set up Firestore Collections**
   - Create `products` collection with fields: `name`, `brand`, `category`, `price`, `image`
   - Create `users` collection for user profiles
   - Create `pickupRequests` collection for pickup bookings

4. **Deploy**
   - Deploy to Firebase Hosting, Netlify, Vercel, or any static hosting service
   - Ensure HTTPS is enabled (required for PWA and service workers)

## 📁 Project Structure

```
JS-fix-main/
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── config.js         # Centralized configuration
│   ├── logger.js         # Logging utility
│   ├── analytics.js      # Analytics and error tracking
│   ├── pwa.js            # PWA functionality
│   ├── firebase-config.js # Firebase configuration
│   ├── header.js          # Header component
│   ├── ui.js              # UI utilities
│   ├── script.js          # Homepage logic
│   ├── quote.js           # Quote page logic
│   ├── assessment.js      # Assessment flow
│   ├── physical-condition.js
│   ├── functional-issues.js
│   ├── accessories.js
│   ├── warranty.js
│   ├── summary.js         # Summary page
│   ├── login.js           # Authentication
│   ├── account.js         # User account
│   ├── admin-dashboard.js # Admin panel
│   └── state-helper.js    # State management
├── images/               # Image assets
├── index.html            # Homepage
├── quote.html
├── assessment.html
├── summary.html
├── login.html
├── account.html
├── admin.html
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker
├── robots.txt
├── sitemap.xml
└── README.md
```

## ⚙️ Configuration

All configuration is centralized in `js/config.js`:

- **Cities**: Tamil Nadu cities for pickup
- **Time Slots**: Available pickup time slots
- **Pricing**: Deduction percentages and minimum prices
- **Coins**: Coin system configuration
- **Session**: Session storage keys
- **API**: Rate limiting settings
- **UI**: Animation and UI settings
- **Features**: Feature flags

## 🔐 Security

- **Firebase Security Rules**: Ensure Firestore rules are properly configured
- **Input Validation**: All forms have client-side validation
- **XSS Protection**: HTML escaping implemented
- **Rate Limiting**: OTP request rate limiting
- **HTTPS**: Required for production (PWA requirement)

## 📱 PWA Features

- **Installable**: Users can install the app on their devices
- **Offline Support**: Service worker caches static assets
- **App Icons**: Custom icons for home screen (add to `/images/`)
- **Manifest**: Web app manifest for app-like experience

## 📊 Analytics

Firebase Analytics is integrated for:
- Page views
- User actions
- Custom events
- Performance metrics (Core Web Vitals)
- Error tracking

## 🧪 Development

### Code Quality

- **ESLint**: Configured in `.eslintrc.json`
- **Prettier**: Configured in `.prettierrc.json`

### Running Locally

1. Use a local server (required for service workers):
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # VS Code Live Server extension
   ```

2. Open `http://localhost:8000` in your browser

### Development Mode

Logger automatically detects development mode:
- `localhost`
- `127.0.0.1`
- Domains containing `dev`
- URL parameter `?debug=true`

## 🚢 Deployment

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### Other Platforms

- **Netlify**: Drag and drop the folder or connect Git repository
- **Vercel**: Connect repository or use CLI
- **GitHub Pages**: Enable in repository settings

## 📝 Environment Variables

For production, consider moving Firebase config to environment variables:

```javascript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // ... other config
};
```

## 🐛 Troubleshooting

### Service Worker Not Registering
- Ensure HTTPS (or localhost)
- Check browser console for errors
- Verify `sw.js` is accessible

### Firebase Errors
- Verify Firebase config is correct
- Check Firestore security rules
- Ensure Authentication is enabled

### PWA Not Installable
- Verify `manifest.json` is valid
- Check that icons exist at specified paths
- Ensure HTTPS in production

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Team/Contributors]

## 📞 Support

For issues and questions, please [create an issue](link-to-issues) or contact [support email].

---

**Last Updated**: December 2024
