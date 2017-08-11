import { fork } from 'redux-saga/effects';
import LoginView, { LoginReducer, LoginSaga } from './login';
import DashboardView, { DashboardReducer, DashboardSaga } from './dashboard';

export const reducers = { LoginReducer, DashboardReducer };

export function* rootSagas() {
    yield [
        fork(LoginSaga),
        fork(DashboardSaga),
    ];
}

export {
    LoginView,
    DashboardView,
};
