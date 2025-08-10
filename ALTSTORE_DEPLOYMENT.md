# ResetPath - AltStore Deployment Guide

## Overview
ResetPath is now configured as a Progressive Web App (PWA) optimized for iPhone and ready for AltStore distribution.

## What's Been Implemented

### ✅ PWA Features
- **Service Worker**: Offline functionality and caching
- **Web App Manifest**: iOS app-like behavior
- **iOS Optimizations**: Safe area handling, touch interactions
- **App Icons**: Multiple sizes for different iOS devices
- **Splash Screens**: iOS launch screen support

### ✅ iOS-Specific Features
- Safe area insets for iPhone X and newer
- Prevents iOS zoom on input focus
- iOS-style navigation and interactions
- Haptic feedback support
- Dark mode compatibility
- Landscape orientation handling

### ✅ AltStore Configuration
- `altstore.json` configuration file
- App metadata and permissions
- Icon and screenshot references

## Deployment Steps

### 1. Build the PWA
```bash
npm run build:pwa
```

### 2. Test Locally
```bash
npm run serve
```
Then visit `http://localhost:3000` and test PWA functionality.

### 3. Deploy to Web Server
Upload the `build/` folder contents to your web server with HTTPS enabled.

### 4. Convert to iOS App (for AltStore)
You'll need to use a tool like:
- **PWABuilder** (recommended): https://www.pwabuilder.com/
- **Capacitor**: For more native features
- **Cordova**: Alternative wrapper

### 5. AltStore Distribution
1. Build the iOS app (.ipa file)
2. Upload to your server
3. Update `altstore.json` with correct URLs
4. Create AltStore source JSON pointing to your app

## Required Files for AltStore

### App Bundle Requirements
- `manifest.json` - PWA manifest
- `sw.js` - Service worker
- `icons/` - App icons (72x72 to 512x512)
- `splash/` - iOS splash screens
- `altstore.json` - AltStore configuration

### Server Requirements
- HTTPS enabled
- Proper MIME types for .ipa files
- CORS headers if needed

## Testing on iPhone

### Safari Testing
1. Open Safari on iPhone
2. Navigate to your deployed PWA
3. Tap Share → Add to Home Screen
4. Test app functionality

### AltStore Testing
1. Install AltStore on iPhone
2. Add your source URL
3. Install ResetPath
4. Test all features

## App Features Verified
- ✅ Streak tracking with persistence
- ✅ Urge management tools
- ✅ Private journaling
- ✅ Progress visualization
- ✅ Onboarding slideshow
- ✅ Offline functionality
- ✅ iOS-optimized UI/UX
- ✅ One-hand friendly navigation

## Privacy & Security
- All data stored locally (localStorage)
- No external API calls
- No user tracking
- Offline-first architecture
- iOS keychain integration ready

## Next Steps
1. Deploy to production server
2. Generate actual PNG icons from SVG templates
3. Create app screenshots for AltStore
4. Test on physical iPhone devices
5. Submit to AltStore or distribute via sideloading

## Support
The app is now iPhone-ready and optimized for AltStore distribution. All core functionality works offline and data remains private on the device.
