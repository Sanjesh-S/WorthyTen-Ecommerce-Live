# Deployment Next Steps - WorthyTen

## ✅ Firebase Initialization Complete!

## 🔧 **Step 1: Fix firebase.json (Already Done)**

The `firebase.json` has been updated to:
- Serve from root directory (`.`) instead of `public/`
- Restore security headers (CSP, X-Frame-Options, etc.)

## 🔐 **Step 2: Set Up GitHub Secrets (Required for CI/CD)**

For automatic deployments to work, you need to add the Firebase service account secret to GitHub:

### Option A: Automatic Setup (Recommended)
```bash
firebase init hosting:github
```
This will guide you through setting up the secret automatically.

### Option B: Manual Setup

1. **Get Firebase Service Account JSON:**
   - Go to: https://console.firebase.google.com/project/worthyten-otp-a925d/settings/serviceaccounts/adminsdk
   - Click "Generate new private key"
   - Save the JSON file (keep it secure!)

2. **Add Secret to GitHub:**
   - Go to: https://github.com/Sanjesh-S/WorthyTen-Ecommerce/settings/secrets/actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT_WORTHYTEN_OTP_A925D`
   - Value: Paste the entire JSON content from the downloaded file
   - Click "Add secret"

## 🚀 **Step 3: Deploy to Firebase Hosting**

### First Deployment (Manual)

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your site will be live at:
- **Primary URL:** https://worthyten-otp-a925d.web.app
- **Alternative URL:** https://worthyten-otp-a925d.firebaseapp.com

### Verify Deployment

After deployment, check:
- [ ] Site loads correctly
- [ ] All pages work (index, quote, assessment, summary)
- [ ] Service worker registers
- [ ] PWA is installable
- [ ] Firebase connection works
- [ ] Analytics tracking active

## 🔄 **Step 4: Automatic Deployments (After Secret Setup)**

Once the GitHub secret is set up:

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Configure Firebase Hosting"
   git push origin main
   ```

2. **Automatic deployment will:**
   - Run on every push to `main` branch
   - Deploy to production automatically
   - Create preview URLs for pull requests

## 📝 **Step 5: Commit Changes**

```bash
# Add the updated firebase.json
git add firebase.json
git commit -m "Fix firebase.json: restore root directory and security headers"
git push origin main
```

## 🌐 **Step 6: Custom Domain (Optional)**

To use a custom domain like `worthyten.com`:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning (can take a few hours)

## ✅ **Checklist**

- [x] Firebase initialization complete
- [x] firebase.json configured correctly
- [ ] Firebase service account secret added to GitHub
- [ ] First deployment completed
- [ ] Site verified working
- [ ] Custom domain configured (optional)

## 🐛 **Troubleshooting**

### If deployment fails:
- Check Firebase CLI is logged in: `firebase login`
- Verify project ID: `firebase use`
- Check firebase.json syntax

### If GitHub Actions fail:
- Verify secret is added correctly
- Check secret name matches: `FIREBASE_SERVICE_ACCOUNT_WORTHYTEN_OTP_A925D`
- Ensure JSON is valid

### If site doesn't load:
- Check Firebase Console → Hosting for errors
- Verify firebase.json `public` directory is correct
- Check browser console for errors

---

**Ready to deploy?** Run: `firebase deploy --only hosting`

