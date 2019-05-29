import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

interface State {
  redirect: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      redirect: true
    };
  }
  componentDidMount() {
    document.addEventListener('click', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.props.store.clearTime();
      this.interval = setInterval(this.tick, 1000);
    });

    document.addEventListener('touchmove', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.props.store.clearTime();
      this.interval = setInterval(this.tick, 1000);
    });

    document.addEventListener('mousemove', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.props.store.clearTime();
      this.interval = setInterval(this.tick, 1000);
    });

    document.addEventListener('contextmenu', (e: any) => {
      e.stopPropagation(), e.preventDefault();
    });

    fetch(`${serverUrl}ping`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.props.store.setPing(data.connectionServer);
      });
  }

  interval: NodeJS.Timer | null = null;

  tick = () => {
    if (this.props.store.time >= 60) {
      this.props.store.preview.show();
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
    this.props.store.setTime();
  };

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
    }
  }

  render() {
    const { store } = this.props;
    const { redirect } = this.state;

    return (
      <>
        {!store.ping ? (
          <PrivateRouter path="/" component={Connection} />
        ) : redirect ? (
          <div>
            <Redirect to="/" />
          </div>
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
