import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';

import Category from './Category';
import { IStore } from '../../store';
import { serverUrl } from '..';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: '0 40px 0 56px',
      display: 'grid',
      gridAutoColumns: '1fr',
      gridAutoRows: 'minmax(calc(50% - 8px), 1fr)',
      gridColumnGap: '16px',
      gridRowGap: '16px',
      height: 'calc(100vh - 184px)',
      overflowY: 'auto',
      margin: '44px 56px 0 0',
      '@media screen and (max-width: 1919px)': {
        gridAutoRows: '1fr'
      }
    },
    grid2: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    grid3: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    grid4: {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  });

interface Props extends WithStyles<typeof styles> {
  store: IStore;
}

class MainScreen extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.getCat();
  }

  interval: NodeJS.Timer | null | undefined = null;

  componentDidMount() {
    this.interval = setInterval(() => this.getCat(), 10000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getCat = () => {
    fetch(`${serverUrl}ip/categories/active`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        let { store } = this.props;
        store.setCategories(data);
        store.preview.setImage(`${serverUrl}blocks/image/${data[0].block.id}`);
        store.preview.firstTime ? (store.preview.show(), store.preview.toggleFirstTime()) : null;
      })
      .catch(error => {
        console.log(error);
        this.props.store.openNotification();
      });
  };

  render() {
    const { classes, store } = this.props;
    let filteredCat = store.category.filter(item => !item.isEmpty);
    return (
      <div
        className={classNames(
          classes.root,
          filteredCat.length === 2
            ? classes.grid2
            : filteredCat.length === 3
            ? classes.grid3
            : filteredCat.length === 4
            ? classes.grid2
            : filteredCat.length === 5 || filteredCat.length === 6
            ? classes.grid3
            : classes.grid4
        )}
      >
        {store.category && store.category.length !== 0
          ? store.category.map(item => (!item.isEmpty ? <Category item={item} key={item.id} /> : null))
          : null}
      </div>
    );
  }
}

export default inject('store')(withStyles(styles)(observer(MainScreen)));
