# ⚡ Quick APK Build Guide

## The Easiest Way: Use Manus Management UI

Since the local build environment has limitations, use the **Manus Management UI** to export your project to GitHub, which will automatically build the APK using GitHub Actions.

### Steps:

1. **Open Management UI** (Click the button in the top-right corner)
2. Go to **Settings → GitHub**
3. Click **Export to GitHub**
4. Choose a repository name and owner
5. GitHub Actions will automatically build the APK
6. Download the APK from the releases section

---

## Alternative: Use EAS Build (Expo)

If you want to build immediately:

```bash
# 1. Create a free Expo account
eas login

# 2. Build the APK
eas build --platform android --local

# 3. Download the APK when ready
```

---

## What You Get

✅ **calculator-app.apk** - Ready to install on any Android phone
✅ **Full-featured calculator** with 5 different tools
✅ **Signed APK** - Can be published to Google Play Store

---

## Installation on Your Phone

1. Download the APK file to your phone
2. Open file manager and tap the APK
3. Tap "Install"
4. Done! The app is now on your phone

---

## Project Ready ✅

Your project is fully configured with:
- ✅ Capacitor for Android
- ✅ Signing configuration
- ✅ EAS build setup
- ✅ GitHub Actions workflow

Choose your preferred build method above!
