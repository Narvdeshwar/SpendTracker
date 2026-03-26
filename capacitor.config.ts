import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.financial.atelier',
  appName: 'Financial Atelier',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: 'none',
      style: 'dark'
    }
  }
};


export default config;
