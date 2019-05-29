import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';

import { inject, observer } from 'mobx-react';
import { IStore } from '../../store';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden ',
      position: 'relative'
    },
    image: {
      width: '100vw',
      height: '100vh',
      objectFit: 'cover'
    },
    title: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      color: '#F0D1A8',
      textAlign: 'center',
      fontSize: '150px',
      width: '90%',
      fontFamily: '"Elizabeth Unicode", sans-serif',
      lineHeight: 0.7
    }
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
}

const Preview: React.StatelessComponent<Props> = props => {
  const { classes, store } = props;

  return (
    <Drawer anchor="bottom" open={store.preview.isShow} onClose={() => store.preview.close()} transitionDuration={600}>
      <div
        className={classes.root}
        tabIndex={0}
        role="button"
        onClick={() => store.preview.close()}
        onKeyDown={() => store.preview.close()}
      >
        <Typography className={classes.title} variant="h1">
          {store.category.length !== 0 ? store.category[0].block.name : null}
        </Typography>
        <img className={classes.image} src={store.preview.image} alt="" />
      </div>
    </Drawer>
  );
};

export default inject('store')(withStyles(styles)(observer(Preview)));
