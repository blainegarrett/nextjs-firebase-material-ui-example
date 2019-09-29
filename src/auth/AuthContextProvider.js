// Auth Context for the Custom Auth Token
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();
import firebase from '../firebaseClient';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    claims: [],
    loading: false
  });

  useEffect(
    () => {
      // Use this on useState
      let authStateUnsubscribe = firebase
        .auth()
        .onAuthStateChanged(function(user) {
          console.log('authstate changed!');

          if (user) {
            setAuthState({ ...authState, loading: false, user: user });
          } else {
            setAuthState({ ...authState, loading: false, user: null });
          }
        });

      //firebase.auth().onIdTokenChanged(function(user) {
      return authStateUnsubscribe;
    },
    [!!authState.user]
  );

  // Functions
  function masterLogin() {
    console.log('login');
    setAuthState({ ...authState, loading: true });

    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token);
      });
  }

  function masterLogout() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          setAuthState({ ...authState, user: null });
        },
        function(error) {
          console.error('Sign Out Error', error);
        }
      );
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        cheese: true,

        masterLogin,
        masterLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthProvider;
