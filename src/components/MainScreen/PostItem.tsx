import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { IStore, store } from '../../store';
import { inject, observer } from 'mobx-react';
import { serverUrl } from '..';
import { Link } from 'react-router-dom';
import { IPostItem } from '../../store/models/posts/item';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      border: '1px solid rgba(220,190,152, 0.1)',
      borderRadius: 4,
      padding: 16
    },
    image: {
      width: '90px'
    },
    title: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 400,
      width: '80%',
      marginTop: 24
    },
    subtitle: {
      color: 'rgba(255,255,255, .6)',
      fontSize: 20,
      marginTop: 16
    }
  });

interface Props extends WithStyles<typeof styles> {
  postItem: IPostItem;
  catName: string;
}

const PostItem: React.StatelessComponent<Props> = (props: Props) => {
  const { classes, postItem, catName } = props;

  console.log('123');

  return (
    <Link to={{ pathname: `/post/${postItem.id}`, state: catName }} className={classes.root}>
      <img className={classes.image} src={serverUrl + '/records/image/' + postItem.titleImage.name} alt="" />
      <Typography className={classes.title} variant="h3" align="center">
        {postItem.title}
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle1" align="center">
        {postItem.subtitle}
      </Typography>
    </Link>
  );
};

export default withStyles(styles)(PostItem);
