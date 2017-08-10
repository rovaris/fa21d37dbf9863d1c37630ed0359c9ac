import 'babel-polyfill';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSagas, reducers } from './views';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSagas);


export default store;

