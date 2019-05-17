import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      zIndex: 99,
      background: 'linear-gradient(45deg, #181A20, #585D68)'
    },
    image: {
      marginBottom: 72
    },
    title: {
      marginBottom: 16
    },
    desc: {
      fontSize: 20,
      color: '#fff'
    }
  });

interface Props extends WithStyles<typeof styles> {}

const Connection: React.StatelessComponent<Props> = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <img className={classes.image} src={require('../../images/ic_disconnect.svg')} />
      <Typography variant="h2" className={classes.title}>
        Нет соединения с сервером
      </Typography>
      <Typography variant="subtitle1" className={classes.desc}>
        Обратитесь к администратору для проверки подключения к сети
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Connection);
