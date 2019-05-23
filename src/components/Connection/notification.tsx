import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../store';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    title: {
      fontSize: 22,
      marginBottom: 16
    },
    desc: {
      fontSize: 16
    },
    close: {}
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
}

const Notification: React.StatelessComponent<Props> = props => {
  const { classes, store } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={store.notification}
      autoHideDuration={6000}
      onClose={store.closeNotification}
      message={
        <>
          <p className={classes.title}>Нет соединения с сервером</p>
          <span className={classes.desc}>Обратитесь к администратору для проверки подключения к сети</span>
        </>
      }
      action={[
        <IconButton className={classes.close} onClick={store.closeNotification}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default inject('store')(withStyles(styles)(observer(Notification)));
