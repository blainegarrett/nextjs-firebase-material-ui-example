// Next Configuration
require('dotenv').config();

const Dotenv = require('dotenv-webpack');

module.exports = (phase, { defaultConfig }) => {
  console.log({ phase });
  return {
    distDir: 'build',
    publicRuntimeConfig: {
      // Available on both client and server
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
      FIREBASE_FCM_SENDER_ID: process.env.FIREBASE_FCM_SENDER_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      TACO: true
    },
    serverRuntimeConfig: {
      // Available only on server - secret keys, etc
    },

    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Add DotEnv plugin to read .env file and load into process.env
        new Dotenv({
          path: './.env.example',
          systemvars: true
        })
      ];

      return config;
    }
  };
};
