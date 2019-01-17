import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  RouteProps
} from "react-router-dom";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface Props extends WithStyles<typeof styles> {
  component: any;
  path: any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

class PrivateRouter extends React.Component<Props & RouteProps> {
  renderRoute = (props: any): any => {
    if (!localStorage.getItem("user")) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else {
      return <this.props.component {...props} />;
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <>
        <Route {...rest} render={this.renderRoute} />
      </>
    );
  }
}

export default withStyles(styles)(PrivateRouter);
