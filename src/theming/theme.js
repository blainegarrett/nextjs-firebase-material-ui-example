// Defines theme to use with material-ui components
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  }
});

export default muiTheme;
