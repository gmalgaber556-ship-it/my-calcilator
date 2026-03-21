#!/bin/bash

# Simple APK builder using Capacitor
echo "Building Calculator App APK..."

# Build web app
echo "Step 1: Building web app..."
pnpm run build

# Sync with Android
echo "Step 2: Syncing with Android..."
npx cap sync android

# Build APK
echo "Step 3: Building APK (this may take 10-15 minutes)..."
cd android
chmod +x gradlew
./gradlew assembleRelease

# Check if APK was created
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo "✅ APK built successfully!"
    echo "📱 APK location: $(pwd)/app/build/outputs/apk/release/app-release.apk"
    cp app/build/outputs/apk/release/app-release.apk ../calculator-app.apk
    echo "📦 Copied to: ../calculator-app.apk"
else
    echo "❌ APK build failed!"
    exit 1
fi
