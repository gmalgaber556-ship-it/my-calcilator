#!/bin/bash

echo "🚀 Setting up EAS Build for Calculator App"
echo ""
echo "This script will prepare your project for APK building"
echo ""

# Check if eas-cli is installed
if ! command -v eas &> /dev/null; then
    echo "📥 Installing EAS CLI..."
    npm install -g eas-cli
fi

# Create app.json if it doesn't exist
if [ ! -f "app.json" ]; then
    echo "📝 Creating app.json..."
    cat > app.json << 'APPJSON'
{
  "expo": {
    "name": "آلة حاسبة متقدمة",
    "slug": "calculator-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./client/public/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./client/public/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTabletMode": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./client/public/icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.calculator.app"
    },
    "web": {
      "favicon": "./client/public/favicon.ico"
    }
  }
}
APPJSON
fi

echo "✅ Setup complete!"
echo ""
echo "📱 Next steps:"
echo ""
echo "1. Create a free Expo account:"
echo "   eas login"
echo ""
echo "2. Build your APK:"
echo "   eas build --platform android"
echo ""
echo "3. Follow the prompts and your APK will be built!"
echo ""

