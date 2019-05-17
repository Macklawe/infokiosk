import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Divider } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import PrivateRouter from './privateRouter';
import { Header, MainScreen, serverUrl, Connection } from './index';
import { IStore } from '../store';
import Posts from './MainScreen/Posts';

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
}

class App extends React.Component<Props> {
  componentDidMount() {
    fetch(`${serverUrl}/ping`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.props.store.setPing(data.connectionServer);
      });

    fetch(`${serverUrl}/ip/categories/active`)
      .then(res => {
        return res.json();
      })
      .then(data => this.props.store.setCategories(data));
  }

  render() {
    const { store } = this.props;

    return (
      <>
        <Route component={Header} />
        {!store.ping ? (
          <PrivateRouter path="/" component={Connection} />
        ) : (
          <>
            <PrivateRouter exact path="/" component={MainScreen} />
            <PrivateRouter path="/category/:id" component={Posts} />
          </>
        )}
      </>
    );
  }
}

export default withRouter(inject('store')(withRoot(withStyles(styles)(observer(App as any)))));
