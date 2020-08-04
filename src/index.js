import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import ReduxHelper from './Redux'

import ApiManager from './Api/ApiManager';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'


// Font awesome
library.add(fas, faCloud)

// Redux persist
let persistRootStore = createStore(
  ReduxHelper.persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
let persistor = persistStore(persistRootStore);
ApiManager.shared = new ApiManager(persistRootStore)

// React
ReactDOM.render(
  <React.StrictMode>
    <Provider store={persistRootStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
