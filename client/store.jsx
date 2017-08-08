import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const createAsyncStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : func => func,
)(createStore);

// sagaMiddleware.run(mySaga)

// export default createAsyncStore(
//     combineReducers(reducers),
// );

