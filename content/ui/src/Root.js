import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import HomeContainer from './components/HomeContainer';

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      // Name of the styleSheet
      root: {
        // Name of the rule
      },
      colorPrimary: {
        backgroundColor: '#2975e9',
      },
    },
    MuiTypography: {
      title: {
        color: '#FFF',
      },
    },
  },
});

const styles = theme => ({
  appBar: {
    position: 'absolute',
  },
  content: {
    marginTop: 78,
  },
});

const Root = ({ classes, store, ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={createHistory()}>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography type="title">Bootstrapp</Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

export default withStyles(styles)(Root);
