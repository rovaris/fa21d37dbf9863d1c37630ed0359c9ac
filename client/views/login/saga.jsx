// @flow

import { put, takeEvery, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    ACTION_TWITTER_SIGN_IN,
    ACTION_TWITTER_DISCONNECT,
    twitterSignInError,
    twitterDisconnectSuccess,
    twitterDisconnectError,
} from './actions';

type SignInResponse = {
    auth: string,
};

export function* redirectToUrl(uri) {
    yield window.location = uri;
}

export function* twitterOauthSignIn() {
    try {
        const response = yield call(
            fetch,
            '/oauth_request',
            { method: 'GET' },
        );

        const result: SignInResponse = yield response.json();

        yield call(redirectToUrl, result.auth);
    } catch (err) {
        yield put(twitterSignInError(err));
    }
}

export function* disconnectTwitter() {
    try {
        const response = yield call(
            fetch,
            '/disconnect',
            { method: 'POST', credentials: 'same-origin' },
        );

        const status = yield response.status;

        if (status !== 200) {
            destroySession();
            const error = new Error(`Disconnect fail due to status: ${status}`);
            yield put(twitterDisconnectError({ error }));
        }

        yield put(twitterDisconnectSuccess());
    } catch (err) {
        yield put(twitterDisconnectError(err));
    }
}

function* loginSaga() {
    yield takeEvery(ACTION_TWITTER_SIGN_IN, twitterOauthSignIn);
    yield takeEvery(ACTION_TWITTER_DISCONNECT, disconnectTwitter);
}

export default loginSaga;
