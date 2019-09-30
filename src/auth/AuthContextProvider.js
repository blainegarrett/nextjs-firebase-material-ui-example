// Auth Context for the Custom Auth Token
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();
import firebase from '../firebaseClient';
import { SnackbarProvider, useSnackbar } from 'notistack';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    claims: [],
    loading: false,
    error: false
  });

  const { enqueueSnackbar } = useSnackbar();
  function snackbarLog(msg, variant) {
    enqueueSnackbar(`${new Date().getTime()}: ${msg}`, { variant });
  }

  useEffect(
    () => {
      // Use this on useState
      let authStateUnsubscribe = firebase
        .auth()
        .onAuthStateChanged(function(user) {
          if (user) {
            setAuthState({
              ...authState,
              loading: false,
              user: user,
              error: false
            });

            // variant could be success, error, warning, info, or default
            snackbarLog(
              `onAuthStateChanged triggered. user.uid: ${user.uid}`,
              'default'
            );
          } else {
            setAuthState({
              ...authState,
              loading: false,
              user: null,
              error: false
            });
            snackbarLog(
              'onAuthStateChanged triggered without user ',
              'default'
            );
          }
        });

      //firebase.auth().onIdTokenChanged(function(user) {
      return authStateUnsubscribe;
    },
    [!!authState.user]
  );

  // Functions
  function masterLogin() {
    snackbarLog('user clicked login', 'info');
    setAuthState({ ...authState, loading: true });

    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        snackbarLog('user successfully logged in to firebase', 'success');
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        setAuthState({ ...authState, loading: false });

        //console.log(token);
      })
      .catch(error => {
        snackbarLog(`failure logging into firebase: ${error.code}`, 'error');
        console.error('Sign In Error', error);
      });
  }

  async function forceRefreshToken() {
    let user = firebase.auth().currentUser;
    await user.getIdToken(true);
    snackbarLog('Firebase Id Token force refreshed', 'info');
    setAuthState({ ...authState, user: user, loading: false });
  }

  function masterLogout() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          snackbarLog('Successfully signed out of Firebase', 'success');
          setAuthState({ ...authState, user: null });
        },
        function(error) {
          // I could not get into this case...
          snackbarLog(`Failed to sign out of Firebase ${error.code}`, 'error');
          console.error('Sign Out Error', error);
        }
      );
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,

        masterLogin,
        masterLogout,
        forceRefreshToken,
        snackbarLog
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

// Wrap in snackbar for event display
export default function withSnackBar({ ...props }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider {...props} />
    </SnackbarProvider>
  );
}
