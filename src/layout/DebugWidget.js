import React, { useEffect, useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContextProvider';
import firebase from '../firebaseClient';

import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#eeeeee'
  },
  outputPane: {
    border: '1px dotted silver',
    height: '300px',
    overflow: 'auto',
    fontSize: '.75rem'
  },
  sortaPre: {
    display: 'block',
    fontFamily: 'monospace'
  }
}));

export default function DebugWidget() {
  let classes = useStyles();

  let authCtx = useContext(AuthContext);
  let [tokenResult, setTokenResult] = useState([]);
  let [idToken, setIdToken] = useState();

  function updateStuff() {
    let user = firebase.auth().currentUser;

    console.log('updating stuff...');

    if (!user) {
      setTokenResult(null);
      setIdToken(null);
    } else {
      user
        .getIdTokenResult()
        .then(idTokenResult => {
          // Confirm the user is an Admin.
          setTokenResult(idTokenResult);
          setIdToken(idTokenResult.token);
          console.log({ idTokenResult });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  useEffect(
    () => {
      let tokenStateUnsubscribe = firebase
        .auth()
        .onIdTokenChanged(function(user) {
          if (user) {
            authCtx.snackbarLog(
              `onIdTokenChanged triggered with user ${user.uid}`,
              'default'
            );
          } else {
            authCtx.snackbarLog(
              'onIdTokenChanged triggered without user',
              'default'
            );
          }
          updateStuff();
        });

      return tokenStateUnsubscribe;
    },
    [!!authCtx.user]
  );

  useEffect(
    () => {
      // Initial Call
      updateStuff();
    },
    [!!authCtx.user, idToken]
  );

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item md={6} lg={4}>
          <Typography>AuthContext Debug</Typography>
          <div className={classes.outputPane}>
            <pre>{JSON.stringify(authCtx, null, ' ')}</pre>
          </div>
        </Grid>

        <Grid item md={6} lg={4}>
          <Typography>Firebase Token Debug</Typography>
          <div className={classes.outputPane}>
            <div className={classes.sortaPre}>
              {idToken && (
                <>
                  <li>
                    expirationTime:{' '}
                    {new Date(tokenResult.expirationTime).toString()}
                  </li>
                  <li>authTime: {new Date(tokenResult.authTime).toString()}</li>
                  <li>
                    issuedAtTime:{' '}
                    {new Date(tokenResult.issuedAtTime).toString()}
                  </li>
                  {idToken}
                </>
              )}
            </div>
          </div>
        </Grid>

        <Grid item md={6} lg={4}>
          <Typography>IdToken Claims</Typography>
          <div className={classes.outputPane}>
            <pre>
              {tokenResult && JSON.stringify(tokenResult.claims, null, ' ')}
            </pre>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
