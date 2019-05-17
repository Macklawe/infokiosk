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
    root: {}
  });

interface Props extends WithStyles<typeof styles> {
  postItem: IPostItem;
}

const PostItem: React.StatelessComponent<Props> = (props: Props) => {
  const { classes, postItem } = props;
  console.log(postItem, '123');

  return (
    <div className={classes.root}>
      <img src={serverUrl + '/records/image/' + postItem.titleImage.name} alt="" />
    </div>
  );
};

export default withStyles(styles)(PostItem);
