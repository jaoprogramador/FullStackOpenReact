/* import 'dotenv/config'; */

export default {
  name: 'rate-repository-FRONT',
  slug: 'rate-repository-FRONT',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  extra: {
      env: "development",
      apolloUri: "http://localhost:4000/graphql" // Definir aquí el endpoint de Apollo
    }
};







