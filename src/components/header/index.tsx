import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import { observer, inject } from "mobx-react";
// import { IStore } from 'src/newStore/store';
// import { ITodo } from "../newStore/models/todo";
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    header: {
      padding: theme.spacing.unit * 3,
      background: 'rgba(24, 26, 32, 0.2)'
    }
  });

interface Props extends WithStyles<typeof styles> {}

class Buttons extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <Typography align="center" variant="h2">
          Военная книга
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Buttons);
