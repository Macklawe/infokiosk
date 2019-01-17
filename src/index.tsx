import * as React from "react";
import * as ReactDOM from "react-dom";
import Index from "./components/index";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { Store } from "./reducer/store";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

// const store = createStore(
//   Store,
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
// );

const history = createBrowserHistory();

ReactDOM.render(
  // <Provider store={store}>
  <Router history={history}>
    <Index />
  </Router>,
  // </Provider>,
  document.querySelector("#root")
);
