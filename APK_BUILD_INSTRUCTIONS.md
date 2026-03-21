# Building Calculator App APK

## Option 1: Using Capacitor Cloud Build (Recommended)

1. Install Capacitor CLI globally:
```bash
npm install -g @capacitor/cli
```

2. Create an Ionic account (free):
```bash
eas login
```

3. Build the APK:
```bash
eas build --platform android
```

## Option 2: Using GitHub Actions

1. Push this repository to GitHub
2. GitHub Actions will automatically build the APK
3. Download from the releases section

## Option 3: Using Local Android Studio

1. Install Android Studio
2. Open the `android/` folder as an Android project
3. Build → Build Bundle(s) / APK(s) → Build APK(s)

## Project Details

- **App Name**: آلة حاسبة متقدمة (Advanced Calculator)
- **Package Name**: com.calculator.app
- **Version**: 1.0
- **Keystore**: calculator-key.jks (already created)

## What's Included

✅ Basic Calculator Operations
✅ Scientific Calculator (sin, cos, tan, log, etc.)
✅ Unit Converter (Length, Weight, Temperature, Volume, Area, Speed, Energy)
✅ Age Calculator
✅ Currency Converter (Live Exchange Rates)
✅ Bottom Navigation Bar with Toggle
✅ Professional Icon
✅ PWA Support (Web App)

## Next Steps

Choose one of the options above to build your APK!
