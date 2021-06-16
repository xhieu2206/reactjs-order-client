import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/* redux configuration */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// for redux saga
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas/auth';

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
