import SagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    twitterSignInError,
    twitterDisconnectSuccess,
    twitterDisconnectError,
} from '../../../client/views/login/actions';

import {
    redirectToUrl,
    twitterOauthSignIn,
    disconnectTwitter,
} from '../../../client/views/login/saga';

import { loadUserSession } from '../../../client/helpers/session';

describe('* Sign-in flow saga', () => {
    describe(`Scenario 1:
        When a user tries to get an authentication uri and gets it`, () => {
        const it = SagaHelper(twitterOauthSignIn());
        const jsonResponse = { auth: 'https://twitter.api.mock.endpoint/' };

        it('should GET the oauth_request endpoint', (result) => {
            expect(result).toEqual(call(fetch, '/oauth_request', { method: 'GET' }));
            return { json: () => ({ ...jsonResponse }) };
        });

        it('should be able to parse the json string response into a object', (result) => {
            expect(result).toEqual(jsonResponse);
            return jsonResponse;
        });

        it('then should redirect the user to the uri', (result) => {
            expect(result).toEqual(call(redirectToUrl, jsonResponse.auth));
        });

        it('then nothing', (result) => {
            expect(result).toBeUndefined();
        });
    });

    describe(`Scenario 2:
        When a user tries to get an authentication uri and the endpoint fail`, () => {
        const it = SagaHelper(twitterOauthSignIn());
        const error = new Error('something went wrong');

        it('should GET the oauth_request endpoint and fail', (result) => {
            expect(result).toEqual(call(fetch, '/oauth_request', { method: 'GET' }));
            return error;
        });

        it('should trigger action that describes the fail', (result) => {
            expect(result).toEqual(put(twitterSignInError(error)));
        });

        it('then nothing', (result) => {
            expect(result).toBeUndefined();
        });
    });

    describe(`Scenario 3:
        When a user tries to get an authentication uri and the body is malformed`, () => {
        const it = SagaHelper(twitterOauthSignIn());
        const error = new Error('malformed json when .json() is called');

        it('should GET the oauth_request endpoint', (result) => {
            expect(result).toEqual(call(fetch, '/oauth_request', { method: 'GET' }));
            return { json: () => { throw error; } };
        });

        it('should throw a runtime error when parsing', (result) => {
            expect(result).toEqual(put(twitterSignInError(error)));
        });

        it('then nothing', (result) => {
            expect(result).toBeUndefined();
        });
    });
});

describe('* Sign-off flow saga', () => {
    describe(`Scenario 1:
        When a user tries to disconnect and succeded `, () => {
        const it = SagaHelper(disconnectTwitter());
        const resultStatus = 200;

        it('should POST the /disconnect endpoint', (result) => {
            expect(result).toEqual(
                call(
                    fetch,
                    '/disconnect',
                    { method: 'POST', credentials: 'same-origin' },
                ),
            );

            return { status: resultStatus };
        });

        it('should receive a valid status code', (result) => {
            expect(result).toEqual(resultStatus);
            return result;
        });

        it('then should trigger action for disconnect success', (result) => {
            expect(result).toEqual(put(twitterDisconnectSuccess()));
        });

        it('then nothing', (result) => {
            expect(result).toBeUndefined();
        });
    });

    describe(`Scenario 2:
        When a user tries to disconnect and fails to do so`, () => {
        const it = SagaHelper(disconnectTwitter());
        const errorStatus = 500;
        const error = new Error(`Disconnect fail due to status: ${errorStatus}`);

        it('should POST the /disconnect endpoint', (result) => {
            expect(result).toEqual(
                call(
                    fetch,
                    '/disconnect',
                    { method: 'POST', credentials: 'same-origin' },
                ),
            );

            return { status: errorStatus };
        });

        it('should receive a invalid status code', (result) => {
            expect(result).toEqual(errorStatus);
            return error;
        });

        it('then should trow an error ', (result) => {
            expect(result).toEqual(put(twitterDisconnectError(error)));
        });

        it('then nothing', (result) => {
            expect(result).toBeUndefined();
        });
    });
});

describe('* Session flow', () => {
    describe(`Scenario 1:
        User was successfully signed in, and a session cookie was provided`, () => {
        const user = {
            name: 'John doe',
            screenName: 'Doe',
            profile_images: 'http://example.com/image.jpg',
        };

        beforeAll(() => {
            const userCodedData = `user=${encodeURIComponent(JSON.stringify(user))}`;
            setMockCookie(userCodedData);
        });

        afterAll(() => {
            removeAllCookies();
        });

        it('should be able to find the cookie and get the user data', () => {
            const userData = loadUserSession();
            expect(userData).toEqual(user);
        });
    });
});
