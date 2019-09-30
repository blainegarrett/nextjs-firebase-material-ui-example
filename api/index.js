// Main Auth API App
const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');

require('dotenv').config();

var serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URI,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_x509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

// Middleware
async function firebaseMiddleware() {}

// Handlers
router.get('/getUser', async (req, res, next) => {
  let { uid } = req.query;

  await admin
    .auth()
    .getUser(uid)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully fetched user data:', userRecord.toJSON());
      res.send(userRecord.toJSON());
    })
    .catch(function(error) {
      console.log('Error fetching user data:', error);
      next(error);
    });
});

router.get('/setClaim', async (req, res, next) => {
  let { key, value, uid, overwrite } = req.query;

  if (!uid) {
    next(new Error('Query parameter key is required'));
  }
  if (!key) {
    next(new Error('Query parameter value is required'));
  }
  if (!value) {
    next(new Error('Query parameter value is required'));
  }

  let claimData = { [key]: value };

  let existingClaims = {};
  // Get the user and existing claims
  await admin
    .auth()
    .getUser(uid)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      //console.log('Successfully fetched user data:', userRecord.toJSON());

      console.log({ fork: userRecord.customClaims });
      existingClaims = userRecord.customClaims;

      //res.send(userRecord.toJSON());
    })
    .catch(function(error) {
      console.log('Error fetching user data:', error);
      next(error);
    });

  // If we're still here then
  let finalClaims;
  if (overwrite) {
    finalClaims = claimData;
  } else {
    finalClaims = { ...existingClaims, ...claimData };
  }

  await admin
    .auth()
    .setCustomUserClaims(uid, finalClaims)
    .then(() => {
      res.send(finalClaims);
    })
    .catch(function(error) {
      console.log('Error setting user data:', error);
      next(error);
    });

  res.send('... ' + uid);
});

module.exports = router;
