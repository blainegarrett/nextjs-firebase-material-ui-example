import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../auth/AuthContextProvider';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function AppBar({ signInRequired }) {
  const classes = useStyles();

  let authCtx = useContext(AuthContext);

  // Construct the UI based on auth
  let authJewel;
  if (authCtx && authCtx.user) {
    let avatarNode;
    if (authCtx.user.photoURL) {
      avatarNode = (
        <Avatar
          onClick={authCtx.masterLogout}
          alt={authCtx.user.displayName}
          title={authCtx.user.displayName}
          src={authCtx.user.photoURL}
        />
      );
    } else {
      avatarNode = <AccountCircle onClick={authCtx.masterLogout} />;
    }
    authJewel = <div>{avatarNode}</div>;
  } else {
    authJewel = (
      <Button onClick={authCtx.masterLogin} color="inherit">
        Login
      </Button>
    );
  }

  let color = 'primary';
  if (signInRequired) {
    color = 'secondary';
  }

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color={color}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Example {color}
          </Typography>
          {authJewel}
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}
