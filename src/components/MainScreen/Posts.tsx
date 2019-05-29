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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: '0 40px 0 56px',
      display: 'grid',
      gridAutoColumns: '1fr',
      gridAutoRows: 'minmax(calc(50% - 8px), 1fr)',
      gridColumnGap: '16px',
      gridRowGap: '16px',
      gridTemplateColumns: '1fr 1fr 1fr',
      height: 'calc(100vh - 184px)',
      overflowY: 'auto',
      margin: '44px 56px 0 0',
      '@media screen and (max-width: 1919px)': {
        gridAutoRows: '1fr'
      },
      '@media screen and (max-width: 1600px)': {
        gridTemplateColumns: '1fr 1fr'
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
  match: any;
  location: any;
}

class Posts extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    const catID = this.props.match.params.catid;
    this.getPost(catID);
  }

  interval: NodeJS.Timer | null | undefined = null;

  componentDidMount() {
    const catID = this.props.match.params.catid;
    this.interval = setInterval(() => this.getPost(catID), 10000);
  }

  componentWillUnmount() {
    this.props.store.clearPosts();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getPost = (ID: number) => {
    fetch(`${serverUrl}ip/categories/${ID}/records`)
      .then(res => {
        return res.json();
      })
      .then(posts => store.setPosts(posts))
      .catch(error => {
        console.log(error);
        this.props.store.openNotification();
      });
  };

  render() {
    const { classes, store, location } = this.props;

    return (
      <div className={classes.root}>
        {store.posts && store.posts.length !== 0
          ? store.posts.map((postItem: IPostItem) => (
              <PostItem catName={location.state} postItem={postItem} key={postItem.id} />
            ))
          : null}
      </div>
    );
  }
}

export default inject('store')(withStyles(styles)(observer(Posts)));
