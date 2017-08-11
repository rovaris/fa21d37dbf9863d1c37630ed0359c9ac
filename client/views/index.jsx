import { fork } from 'redux-saga/effects';
import LoginView, { LoginReducer, LoginSaga } from './login';
import DashboardView from './dashboard';

export const reducers = { LoginReducer };

export function* rootSagas() {
    yield [
        fork(LoginSaga),
    ];
}

export {
    LoginView,
    DashboardView,
};
