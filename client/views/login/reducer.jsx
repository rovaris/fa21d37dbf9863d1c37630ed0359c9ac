// @flow
import { handleActions } from 'redux-actions';

import {
    ACTION_LOAD_SESSION,
    ACTION_TWITTER_SIGN_IN,
    ACTION_TWITTER_SIGN_IN_LOADED,
    ACTION_TWITTER_SIGN_IN_ERROR,
    ACTION_REDUCER_RESET,
} from './actions';

export type Reducer = {
    loggedIn: boolean,
    name: string,
    screenName: string,
    profileImageUrl: string,
    loading: boolean,
    error: ?string,
};

export const LOGIN_VIEW_REDUCER: Reducer = {
    isLoggedIn: false,
    name: '',
    screenName: '',
    profileImageUrl: '',
    loading: false,
    error: null,
};

const LoginViewReducer = handleActions({
    [ACTION_LOAD_SESSION]: (state, { payload }) => ({
        ...state,
        ...payload,
        isLoggedIn: true,
    }),
    [ACTION_TWITTER_SIGN_IN]: state => ({
        ...state,
        loading: true,
    }),
    [ACTION_TWITTER_SIGN_IN_LOADED]: state => ({
        ...state,
        loading: false,
        error: null,
    }),
    [ACTION_TWITTER_SIGN_IN_ERROR]: (state, error) => ({
        ...state,
        loading: false,
        error,
    }),
    [ACTION_REDUCER_RESET]: () => ({
        ...LOGIN_VIEW_REDUCER,
    }),
}, LOGIN_VIEW_REDUCER);

export default LoginViewReducer;
