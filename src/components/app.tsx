import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

import PrivateRouter from './privateRouter';
import { Header, MainScreen, serverUrl, Connection } from './index';
import { IStore } from '../store';
import Posts from './MainScreen/Posts';
import PostInfo from './MainScreen/PostInfo';
import Notification from './Connection/notification';
import Preview from './Connection/preview';

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
  }

  render() {
    const { store } = this.props;

    return (
      <>
        {!store.ping ? (
          <PrivateRouter path="/" component={Connection} />
        ) : (
          <>
            <Route component={Header} {...this.props} />
            <Route component={Notification} />
            <Route component={Preview} />
            <PrivateRouter exact path="/" component={MainScreen} />
            <PrivateRouter path="/category/:catid" component={Posts} />
            <PrivateRouter path="/post/:postid" component={PostInfo} />
          </>
        )}
      </>
    );
  }
}

export default withRouter(inject('store')(withRoot(withStyles(styles)(observer(App as any)))));
