import { put, takeEvery, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    ACTION_TWITTER_SIGN_IN,
    twitterSignInError,
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

function* loginSaga() {
    yield takeEvery(ACTION_TWITTER_SIGN_IN, twitterOauthSignIn);
}

export default loginSaga;
