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
import PostItem from './PostItem';
import { render } from 'react-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: '44px 56px',
      display: 'grid',
      minHeight: 'calc(100vh - 84px)',
      gridAutoColumns: '1fr',
      gridAutoRows: 'minmax(calc(50vh - 94px), 1fr)',
      gridColumnGap: '16px',
      gridRowGap: '16px'
    }
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
  match: any;
}

class Posts extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    const catID = this.props.match.params.id;
    fetch(`${serverUrl}/ip/categories/${catID}/records`)
      .then(res => {
        return res.json();
      })
      .then(posts => store.setPosts(posts));
  }

  componentWillUnmount() {
    this.props.store.clearPosts();
  }

  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        {store.posts && store.posts.length !== 0
          ? store.posts.map((postItem: IPostItem) => <PostItem postItem={postItem} key={postItem.id} />)
          : null}
      </div>
    );
  }
}

export default inject('store')(withStyles(styles)(observer(Posts)));
