// @flow
import { uniqueId } from 'lodash';

export const ACTION_LOAD_TWEETS: string = uniqueId('ACTION_LOAD_TWEETS');
export const ACTION_LOAD_TWEETS_SUCCESS: string = uniqueId('ACTION_LOAD_TWEETS_SUCCESS');
export const ACTION_LOAD_TWEETS_ERROR: string = uniqueId('ACTION_LOAD_TWEETS_ERROR');
export const ACTION_REDUCER_RESET: string = uniqueId('ACTION_REDUCER_RESET');

type Action = {
    type: string,
    payload: ?{},
};

export type Tweet = {
    text: string,
    id: string,
};

export const loadTweets: Action = () => ({
    type: ACTION_LOAD_TWEETS,
});

export const loadTweetsSuccess: Action = tweetList => ({
    type: ACTION_LOAD_TWEETS_SUCCESS,
    payload: tweetList,
});

export const loadTweetError: Action = error => ({
    type: ACTION_LOAD_TWEETS_ERROR,
    payload: error,
});

export const reset: Action = () => ({
    type: ACTION_REDUCER_RESET,
});
