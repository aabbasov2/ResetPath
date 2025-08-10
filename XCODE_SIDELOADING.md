# ResetPath - Xcode Sideloading Guide

## Overview
ResetPath is now ready to be sideloaded through Xcode as a native iOS app using Capacitor. The app wraps our React-based PWA in a native iOS container.

## Prerequisites
- macOS with Xcode installed
- iOS device connected via USB
- Apple Developer account (free account works for sideloading)

## Sideloading Steps

### 1. Open the iOS Project in Xcode
```bash
npx cap open ios
```
This will open the ResetPath iOS project in Xcode automatically.

**Alternative method:**
- Navigate to `ios/App/App.xcworkspace`
- Double-click to open in Xcode

### 2. Configure Signing & Capabilities
1. In Xcode, select the **App** target in the project navigator
2. Go to **Signing & Capabilities** tab
3. Check **Automatically manage signing**
4. Select your **Team** (Apple ID)
5. Xcode will automatically generate a provisioning profile

### 3. Configure Bundle Identifier (if needed)
- The bundle identifier is already set to `com.resetpath.app`
- If you get signing conflicts, change it to something unique like:
  - `com.yourname.resetpath`
  - `com.yourdomain.resetpath`

### 4. Connect Your iPhone
1. Connect your iPhone to your Mac via USB
2. Trust the computer on your iPhone when prompted
3. In Xcode, select your iPhone from the device dropdown (top toolbar)

### 5. Build and Install
1. Click the **Play** button (▶️) in Xcode, or press `Cmd + R`
2. Xcode will build and install the app on your iPhone
3. The first build may take a few minutes

### 6. Trust the Developer Certificate
1. On your iPhone, go to **Settings > General > VPN & Device Management**
2. Find your Apple ID under **Developer App**
3. Tap it and select **Trust**
4. Confirm by tapping **Trust** again

### 7. Launch ResetPath
- The ResetPath app will now appear on your iPhone home screen
- Tap to launch and enjoy the full native iOS experience!

## App Features (Native iOS)
✅ **Native iOS wrapper** - Runs as a real iOS app
✅ **Offline functionality** - Works without internet
✅ **iOS-optimized UI** - Respects safe areas and iOS design
✅ **Local data storage** - All data stays on device
✅ **iOS gestures** - Native swipe and touch interactions
✅ **Background processing** - App state persists
✅ **iOS notifications** - Ready for push notifications (if added)

## Project Structure
```
ResetPath/
├── ios/                    # Native iOS project
│   └── App/
│       ├── App.xcworkspace  # Open this in Xcode
│       └── App/
│           ├── Info.plist   # iOS app configuration
│           └── public/      # Web app assets
├── build/                  # Built React app
├── src/                    # React source code
└── capacitor.config.ts     # Capacitor configuration
```

## Troubleshooting

### Build Errors
- **"No provisioning profile"**: Make sure you're signed in to Xcode with your Apple ID
- **"Bundle identifier already exists"**: Change the bundle ID in Xcode
- **"Device not found"**: Ensure iPhone is connected and trusted

### App Not Installing
- Check that your iPhone is unlocked during installation
- Verify the device is selected in Xcode's device dropdown
- Try cleaning the build folder: Product > Clean Build Folder

### App Crashes on Launch
- Check Xcode console for error messages
- Ensure the React build completed successfully
- Try rebuilding: `npm run build && npx cap sync ios`

## Development Workflow

### Making Changes
1. Edit your React code in `src/`
2. Build the app: `npm run build`
3. Sync with Capacitor: `npx cap sync ios`
4. Build and run in Xcode

### Quick Sync Command
```bash
npm run build && npx cap sync ios && npx cap open ios
```

## Distribution Options

### Sideloading (Current Method)
- Install directly via Xcode
- Requires renewal every 7 days (free account) or 1 year (paid account)
- Perfect for personal use and testing

### App Store Distribution
- Requires paid Apple Developer account ($99/year)
- Full App Store review process
- Permanent installation for users

### Enterprise Distribution
- For internal company distribution
- Requires Apple Developer Enterprise account

## Security & Privacy
- All user data remains on the device
- No external API calls or tracking
- iOS keychain integration available for sensitive data
- Follows iOS privacy guidelines

## Next Steps
The ResetPath app is now ready for sideloading! You can:
1. Install it on your iPhone using the steps above
2. Share the project with others for sideloading
3. Consider App Store submission for wider distribution
4. Add native iOS features like push notifications

The app maintains all its core functionality while providing a native iOS experience.
