import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import withRoot from "../withRoot";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Divider } from "@material-ui/core";

import PrivateRouter from "./privateRouter";
import Cameras from "./cameras";
import Persons from "./persons";
import Buttons from "./buttons";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface Props extends WithStyles<typeof styles> {}

class Index extends React.Component<Props> {
  render() {
    return (
      <>
        <Buttons />
        <Divider />
        <Route component={Buttons} />
        <PrivateRouter exact path="/Cameras" component={Cameras} />
        <PrivateRouter exact path="/Persons" component={Persons} />
        {/* {Content[currentTab]} */}
      </>
    );
  }
}

export default withRoot(withStyles(styles)(Index as any));
