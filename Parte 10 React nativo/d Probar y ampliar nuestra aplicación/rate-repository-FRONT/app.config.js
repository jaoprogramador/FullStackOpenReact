/* import 'dotenv/config'; */
/* import dotenv from 'dotenv';
dotenv.config(); 
/* import dotenv from 'dotenv';
dotenv.config(); */  
//console.log('Environment Variables:', process.env);
//console.log('app.config.js::::ENV:', process.env.ENV); // Debería imprimir 'development'
//console.log('app.config.js::::APOLLO_URI:', process.env.APOLLO_URI);
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
  expo: {
    jsEngine: 'jsc',
    
  },
};







