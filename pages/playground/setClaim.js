import React, { useState, useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../../src/auth/AuthContextProvider';
import PageBase from '../../src/layout/PageBase';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '200px',
    padding: theme.spacing(3),
    marginBottom: '200px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function Secure() {
  let classes = useStyles();

  let authCtx = useContext(AuthContext);
  let [formState, setFormState] = useState({
    overwrite: false,
    key: '',
    value: ''
  });

  const handleSwitchChange = name => event => {
    setFormState({ ...formState, [name]: event.target.checked });
  };
  const handleChange = name => event => {
    setFormState({ ...formState, [name]: event.target.value });
  };

  function setClaim() {
    let uid = authCtx.user.uid;

    let overWriteParam = '';
    if (formState.overwrite) {
      overWriteParam = '&overwrite=true';
    }

    // TODO: This should really be a post request
    axios
      .get(
        `/api/setClaim?key=${formState.key}&value=${
          formState.value
        }&uid=${uid}${overWriteParam}`
      )
      .then(function(response) {
        authCtx.snackbarLog(
          JSON.stringify(response.data, null, ' '),
          'success'
        );
        authCtx.forceRefreshToken();
      })
      .catch(function(error) {
        authCtx.snackbarLog(error, 'error');
      });
  }

  return (
    <PageBase signInRequired={true}>
      <h1>Set Claim</h1>
      <Typography>
        Custom claims can be set by the Admin Client on any user given their
        uid. Specify a custom claim key and value below to update your own
        claims. See them reflected in the debug output below.
      </Typography>

      <Grid containter justify="center">
        <Grid item xs="12" lg="6">
          <Paper className={classes.root}>
            <TextField
              variant="outlined"
              onChange={handleChange('key')}
              value={formState.key}
              className={classes.input}
              placeholder="Claim Key"
              inputProps={{ 'aria-label': 'enter claim key' }}
            />
            <TextField
              variant="outlined"
              value={formState.value}
              onChange={handleChange('value')}
              className={classes.input}
              placeholder="Claim Value"
              inputProps={{ 'aria-label': 'enter claim value' }}
            />

            <FormControlLabel
              className={classes.input}
              control={
                <Switch
                  checked={formState.overwrite}
                  onChange={handleSwitchChange('overwrite')}
                  value="true"
                  title="Overwrite existing claims"
                  inputProps={{ 'aria-label': 'overwrite existing claims' }}
                />
              }
              label="Overwrite Other Claims"
            />
            <Divider className={classes.divider} orientation="vertical" />
            <Button
              variant="contained"
              color="primary"
              onClick={setClaim}
              className={classes.iconButton}
              aria-label="directions"
              disabled={!formState.key || !formState.value}
            >
              Set Claim
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </PageBase>
  );
}
