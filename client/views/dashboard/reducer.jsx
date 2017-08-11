// @flow
import { handleActions } from 'redux-actions';
import type Tweet from './actions';

import {
    ACTION_LOAD_TWEETS,
    ACTION_LOAD_TWEETS_SUCCESS,
    ACTION_LOAD_TWEETS_ERROR,
    ACTION_REDUCER_RESET,
} from './actions';

export type DashboardReducerType = {
    tweets: Array<Tweet>,
    loading: boolean,
    error: ?string
};

export const DASHBOARD_VIEW_REDUCER: DashboardReducerType = {
    tweets: [],
    loading: false,
    error: null,
};

const DashboardViewReducer = handleActions({
    [ACTION_LOAD_TWEETS]: state => ({
        ...state,
        loading: true,
        error: null,
    }),
    [ACTION_LOAD_TWEETS_SUCCESS]: (state, { payload }) => ({
        ...state,
        tweets: payload,
        loading: false,
        error: null,
    }),
    [ACTION_LOAD_TWEETS_ERROR]: (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
    }),
    [ACTION_REDUCER_RESET]: () => DASHBOARD_VIEW_REDUCER,
}, DASHBOARD_VIEW_REDUCER);

export default DashboardViewReducer;
