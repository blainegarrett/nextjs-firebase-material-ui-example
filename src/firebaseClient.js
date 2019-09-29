// Simple Firebase Client
import firebaseApp from 'firebase/app';
import 'firebase/auth';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class FirebaseClient {
  constructor() {
    let firebaseConfig = {
      apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
      authDomain: publicRuntimeConfig.FIREBASE_AUTH_DOMAIN,
      databaseUrl: publicRuntimeConfig.FIREBASE_DB_URL,
      projectId: publicRuntimeConfig.FIREBASE_PROJECT_ID,
      storageBucket: publicRuntimeConfig.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: publicRuntimeConfig.FIREBASE_FCM_SENDER_ID
    };

    try {
      firebaseApp.initializeApp(firebaseConfig);
    } catch (e) {
      //Firebase Initialization Error
      if (e.code != 'app/duplicate-app') {
        console.log('Firebase App initialization Error');
        console.log(e);
      }
    }

    // Store the firebaseApp instance
    this.auth = firebaseApp.auth;
  }
}

export default new FirebaseClient();
