# Deploy to GitHub Pages - Step by Step

## Your git is already set up! ✅
- User: Sanjesh-S
- Email: sanjeshsrinivasan2006@gmail.com
- Repository initialized and committed

## Follow these steps:

### Step 1: Create a New GitHub Repository
1. Open your browser and go to: https://github.com/new
2. Fill in:
   - **Repository name**: `WorthyTen-Ecommerce`
   - **Description**: "WorthyTen E-commerce website for selling devices"
   - **Visibility**: Select **Public** (required for free GitHub Pages)
   - **DO NOT check** "Initialize this repository with a README"
3. Click "Create repository"

### Step 2: Copy Your Repository URL
After creating, GitHub will show you a URL like:
`https://github.com/Sanjesh-S/WorthyTen-Ecommerce.git`

Copy this URL!

### Step 3: Run These Commands
Open your terminal in this project folder and run:

```bash
# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/Sanjesh-S/WorthyTen-Ecommerce.git

# Rename branch to main
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository: `https://github.com/Sanjesh-S/WorthyTen-Ecommerce`
2. Click the **"Settings"** tab (top right)
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select **"Deploy from a branch"**
   - Branch: **"main"**
   - Folder: **"/ (root)"**
5. Click **"Save"**

### Step 5: Wait and Access Your Site
- GitHub will take 2-5 minutes to build and deploy
- Your site will be live at: `https://sanjesh-s.github.io/WorthyTen-Ecommerce/`
- You'll see a green checkmark when it's ready

---

## Alternative: If you want to use a custom domain
After GitHub Pages is working, you can:
1. Buy a domain (like worthyten.com)
2. Add it in GitHub Pages settings
3. Update DNS records

---

## Need Help?
If you get any errors, let me know and I'll help you fix them!

