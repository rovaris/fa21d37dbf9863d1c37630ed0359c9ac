// @flow

import { put, takeEvery, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import type Tweet from './actions';

import {
    ACTION_LOAD_TWEETS,
    loadTweetsSuccess,
    loadTweetError,
} from './actions';

export function* loadTweets() {
    try {
        const response = yield call(
            fetch,
            '/tweets',
            { method: 'GET', credentials: 'same-origin' },
        );

        const result:Array<Tweet> = yield response.json();

        yield put(loadTweetsSuccess(result));
    } catch (err) {
        yield put(loadTweetError(err));
    }
}


function* dashboardSaga() {
    yield takeEvery(ACTION_LOAD_TWEETS, loadTweets);
}

export default dashboardSaga;
