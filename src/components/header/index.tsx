import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { observer, inject } from 'mobx-react';

import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { IStore } from '../../store';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    header: {
      padding: theme.spacing.unit * 3,
      background: 'rgba(24, 26, 32, 0.2)'
    },
    icon: {
      marginRight: 24
    }
  });

interface Props extends WithStyles<typeof styles> {
  location: any;
  store: IStore;
  history: any;
}

class Buttons extends React.Component<Props> {
  render() {
    const { classes, location, store, history } = this.props;

    return (
      <div className={classes.header}>
        {location.pathname === '/' ? (
          <Typography align="center" variant="h2">
            {store.blockName}
          </Typography>
        ) : location.pathname.indexOf('category') !== -1 ? (
          <>
            <Typography
              align="left"
              variant="h2"
              style={{ position: 'absolute', fontSize: '28px', cursor: 'pointer', lineHeight: '36px' }}
              onClick={() => history.goBack()}
            >
              <img className={classes.icon} src={require('../../images/ic_arrow_back.svg')} alt="" />
              {store.blockName}
            </Typography>
            <Typography align="center" variant="h2">
              {location.state}
            </Typography>
          </>
        ) : (
          <Typography
            align="left"
            variant="h2"
            style={{ fontSize: '28px', cursor: 'pointer' }}
            onClick={() => history.goBack()}
          >
            <img className={classes.icon} src={require('../../images/ic_arrow_back.svg')} alt="" />
            {location.state}
          </Typography>
        )}
      </div>
    );
  }
}

export default inject('store')(withStyles(styles)(observer(Buttons)));
