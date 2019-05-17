import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';

import Category from './Category';
import { IStore } from '../../store';

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
  render() {
    const { classes, store } = this.props;
    let filteredCat = store.category.filter(item => !item.isEmpty);
    console.log(filteredCat);
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
