// @flow
import { uniqueId } from 'lodash';

export const ACTION_LOAD_SESSION: string = uniqueId('ACTION_LOAD_SESSION');
export const ACTION_TWITTER_SIGN_IN: string = uniqueId('TWITTER_SIGN_IN');
export const ACTION_TWITTER_SIGN_IN_LOADED: string = uniqueId('ACTION_TWITTER_SIGN_IN_LOADED');
export const ACTION_TWITTER_SIGN_IN_ERROR: string = uniqueId('ACTION_TWITTER_SIGN_IN_ERROR');
export const ACTION_REDUCER_RESET: string = uniqueId('ACTION_REDUCER_RESET');
export const ACTION_TWITTER_DISCONNECT: string = uniqueId('ACTION_TWITTER_DISCONNECT');
export const ACTION_TWITTER_DISCONNECT_SUCCESS: string = uniqueId('ACTION_TWITTER_DISCONNECT_SUCCESS');
export const ACTION_TWITTER_DISCONNECT_ERROR: string = uniqueId('ACTION_TWITTER_DISCONNECT_ERROR');

type Action = {
    type: string,
    payload: ?{},
};

export const loadSession: Action = session => ({
    type: ACTION_LOAD_SESSION,
    payload: session,
});

export const twitterSignIn: Action = () => ({
    type: ACTION_TWITTER_SIGN_IN,
});

export const twitterSignInLoaded: Action = () => ({
    type: ACTION_TWITTER_SIGN_IN_LOADED,
});

export const twitterSignInError = error => ({
    type: ACTION_TWITTER_SIGN_IN_ERROR,
    payload: error,
});

export const twitterDisconnect: Action = () => ({
    type: ACTION_TWITTER_DISCONNECT,
});

export const twitterDisconnectSuccess: Action = () => ({
    type: ACTION_TWITTER_DISCONNECT_SUCCESS,
});

export const twitterDisconnectError: Action = error => ({
    type: ACTION_TWITTER_DISCONNECT_ERROR,
    payload: error,
});

export const reset: Action = () => ({
    type: ACTION_REDUCER_RESET,
});
