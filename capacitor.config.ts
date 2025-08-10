import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resetpath.app',
  appName: 'ResetPath',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  ios: {
    scheme: 'ResetPath',
    contentInset: 'automatic',
    backgroundColor: '#0f1419'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f1419',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#4a9eff',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0f1419'
    }
  }
};

export default config;
