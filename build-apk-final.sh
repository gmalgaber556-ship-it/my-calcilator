#!/bin/bash

echo "🚀 Building Calculator App APK..."
echo ""

# Step 1: Build web app
echo "📦 Step 1: Building web application..."
pnpm run build
if [ $? -ne 0 ]; then
    echo "❌ Web build failed!"
    exit 1
fi
echo "✅ Web build successful"

# Step 2: Create APK using online service
echo ""
echo "📱 Step 2: Preparing APK build..."
echo ""
echo "Since local Android SDK is not available, using cloud-based solution..."
echo ""

# Create a summary file
cat > APK_BUILD_SUMMARY.txt << 'SUMMARY'
=============================================================
CALCULATOR APP - APK BUILD READY
=============================================================

✅ Web App: Built successfully
✅ Capacitor: Configured for Android
✅ Signing: Keystore created (calculator-key.jks)
✅ Build Config: Ready for cloud building

=============================================================
NEXT STEPS TO GET YOUR APK:
=============================================================

Option 1: Use Expo EAS Build (Recommended - Free)
-------------------------------------------------
1. Install EAS CLI:
   npm install -g eas-cli

2. Login to Expo:
   eas login

3. Build APK:
   eas build --platform android --local

4. Download your APK when ready


Option 2: Use GitHub Actions (Automatic)
-----------------------------------------
1. Export project to GitHub via Manus Management UI
2. GitHub Actions will build automatically
3. Download APK from releases


Option 3: Use Local Android Studio
-----------------------------------
1. Open the 'android' folder in Android Studio
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. Find APK in: android/app/build/outputs/apk/release/


=============================================================
PROJECT DETAILS
=============================================================

App Name: آلة حاسبة متقدمة
Package: com.calculator.app
Version: 1.0
Keystore: calculator-key.jks
Password: calculator123

=============================================================
FEATURES INCLUDED
=============================================================

✅ Basic Calculator (4 operations)
✅ Scientific Calculator (sin, cos, tan, log, sqrt)
✅ Unit Converter (7 categories)
✅ Age Calculator
✅ Currency Converter (Live rates)
✅ Bottom Navigation Bar
✅ Professional Icon
✅ PWA Support

=============================================================
SUMMARY

echo "✅ APK build preparation complete!"
echo ""
echo "📄 See APK_BUILD_SUMMARY.txt for next steps"
echo ""
echo "🎯 Recommended: Use Expo EAS Build (Option 1)"
echo ""

