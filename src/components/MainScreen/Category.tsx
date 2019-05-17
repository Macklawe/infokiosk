import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../serverUri';
import { observer } from 'mobx-react';
import { ICategoryItem } from '../../store/models/category/item';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      background: 'rgba(24,26,32,0.2)',
      borderRadius: 4,
      position: 'relative',
      minHeight: 200,
      '&:before, &:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        border: '1px solid rgba(220,190,152,0.1)',
        borderRadius: 4
      },
      '&:before': {
        width: 'calc(100% - 80px)',
        height: 'calc(100% - 48px)',
        top: 24,
        left: 40
      },
      '&:after': {
        width: 'calc(100% - 48px)',
        height: 'calc(100% - 80px)',
        top: 40,
        left: 24
      }
    },
    title: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 400,
      width: '80%',
      marginTop: 24
    }
  });

interface Props extends WithStyles<typeof styles> {
  item: ICategoryItem;
}

const Category: React.StatelessComponent<Props> = props => {
  const { classes, item } = props;
  return (
    <Link to={`/category/${item.id}`} className={classes.container}>
      <img src={serverUrl + 'categories/image/' + item.icon} alt="" />
      <Typography variant="h3" className={classes.title}>
        {item.name}
      </Typography>
    </Link>
  );
};

export default inject('item')(withStyles(styles)(observer(Category)));
