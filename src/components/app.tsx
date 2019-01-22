import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import withRoot from "../withRoot";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { Divider } from "@material-ui/core";
import { inject, observer } from "mobx-react";

import PrivateRouter from "./privateRouter";
import { Header, EventLog, Cameras, Persons, serverUrl } from "./index";
import { IStore } from "../store";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
}

class App extends React.Component<Props> {
  componentDidMount() {
    fetch(
      `${serverUrl}/api/get_events_in_interval?begin=${
        this.props.store.eventLog.lastHour
      }&end=${this.props.store.eventLog.localTime}`
    )
      .then(res => res.json())
      .then(
        data =>
          this.props.store.eventLog &&
          this.props.store.eventLog.setData(data.data)
      )
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.props);
    return (
      <>
        <Route component={Header} />
        <Divider />
        <PrivateRouter exact path="/" component={EventLog} />
        <PrivateRouter exact path="/Cameras" component={Cameras} />
        <PrivateRouter exact path="/Persons" component={Persons} />
      </>
    );
  }
}

export default withRouter(
  inject("store")(withRoot(withStyles(styles)(observer(App as any))))
);
