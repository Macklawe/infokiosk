import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { store } from './store';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
