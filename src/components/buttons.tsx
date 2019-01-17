import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// import { observer, inject } from "mobx-react";
// import { IStore } from 'src/newStore/store';
// import { ITodo } from "../newStore/models/todo";
import { Link } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    buttonContainer: {
      padding: theme.spacing.unit
    },
    active: {
      backgroundColor: "#31343A"
    }
  });

interface Props extends WithStyles<typeof styles> {
  // setTab: (i: number) => void;
  // currentTab: number;
  // todo?: ITodo;
}

// @inject((store: any, nextProps: any) => ({
//   todo: store.todo,
//   props: nextProps
// }))
// @observer
class Buttons extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    // const buttonArr = ['Event Log', 'Persons', 'Cameras'];
    return (
      <div className={classes.buttonContainer}>
        <Link to="/">Event</Link>
        <Link to="/Cameras">Camera</Link>
        <Link to="/Persons">Camera</Link>
      </div>
    );
  }
}

export default withStyles(styles)(Buttons);
