// @ts-nocheck
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';
import { pluginVueLynx } from 'vue-lynx/plugin';

const lynxConfig = defineConfig({
  source: {
    entry: {
      main: './src/index.ts',
    },
  },
  output: {
    assetPrefix: 'asset:///',
    filename: {
      bundle: '[name].lynx.bundle',
    },
  },
  plugins: [
    pluginQRCode({
      schema(url: string): string {
        return `${url}?fullscreen=true`;
      },
    }),
    pluginVueLynx({
      optionsApi: false,
      enableCSSInheritance: true,
      enableCSSInlineVariables: true,
    }),
    pluginTailwindCSS({
      config: 'tailwind.config.ts',
      exclude: [/[\\/]node_modules[\\/]/],
    }),
  ],
});

const config = {
  lynxConfig,
  appName: 'vue-lynx-todo',
  platform: {
    android: {
      packageName: 'com.example.vuelynx.todo',
    },
    ios: {
      bundleIdentifier: 'com.example.vuelynx.todo',
    },
  },
  paths: {
    androidAssets: 'android/app/src/main/assets',
    iosAssets: 'ios/SparklingGo/SparklingGo/Resources/Assets',
  },
  appIcon: './resource/app_icon.png',
  router: {
    main: {
      path: './lynxPages/main',
    },
  },
  plugin: [
    [
      'splash-screen',
      {
        backgroundColor: '#0c0a09',
        image: './resource/app_icon.png',
        dark: {
          image: './resource/app_icon.png',
          backgroundColor: '#0c0a09',
        },
        imageWidth: 200,
      },
    ],
  ],
};

export default config;
