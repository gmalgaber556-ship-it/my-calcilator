#!/usr/bin/env python3
import os
import subprocess
import sys
import json

def run_command(cmd, description):
    """Run a shell command and return success status"""
    print(f"\n📌 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=300)
        if result.returncode == 0:
            print(f"✅ {description} - SUCCESS")
            return True
        else:
            print(f"⚠️  {description} - WARNING/ERROR")
            if result.stderr:
                print(f"Error: {result.stderr[:200]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"⏱️  {description} - TIMEOUT")
        return False
    except Exception as e:
        print(f"❌ {description} - FAILED: {e}")
        return False

def main():
    print("=" * 60)
    print("🚀 CALCULATOR APP - APK BUILD SYSTEM")
    print("=" * 60)
    
    os.chdir("/home/ubuntu/calculator-app")
    
    # Step 1: Build web app
    if not run_command("pnpm run build", "Building web application"):
        print("❌ Web build failed. Exiting.")
        sys.exit(1)
    
    # Step 2: Sync with Capacitor
    run_command("npx cap sync android", "Syncing with Capacitor")
    
    # Create build info
    build_info = {
        "app_name": "آلة حاسبة متقدمة",
        "package_name": "com.calculator.app",
        "version": "1.0",
        "status": "READY_FOR_APK_BUILD",
        "next_steps": [
            "Use Expo EAS Build (recommended)",
            "Use GitHub Actions",
            "Use Android Studio locally"
        ]
    }
    
    # Save build info
    with open("BUILD_INFO.json", "w") as f:
        json.dump(build_info, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print("✅ BUILD PREPARATION COMPLETE")
    print("=" * 60)
    print("\n📋 Build Information:")
    print(json.dumps(build_info, indent=2, ensure_ascii=False))
    
    print("\n" + "=" * 60)
    print("📱 TO BUILD YOUR APK:")
    print("=" * 60)
    print("\n1️⃣  RECOMMENDED: Expo EAS Build")
    print("   npm install -g eas-cli")
    print("   eas login")
    print("   eas build --platform android")
    
    print("\n2️⃣  ALTERNATIVE: GitHub Export")
    print("   Use Manus Management UI → Settings → GitHub → Export")
    
    print("\n3️⃣  LOCAL: Android Studio")
    print("   Open 'android' folder in Android Studio")
    print("   Build → Build APK(s)")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
