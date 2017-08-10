import SagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { twitterSignInError } from '../../../client/views/login/actions';
import { redirectToUrl, twitterOauthSignIn } from '../../../client/views/login/saga';

describe('Login saga', () => {

    describe(`Scenario 1:
        When a user tries to get an authentication uri and gets it`, () => {

        const it = SagaHelper(twitterOauthSignIn());
        const jsonResponse = { auth: 'https://twitter.api.mock.endpoint/' };

        it('should call the oauth_request endpoint', result => {
            expect(result).toEqual(call(fetch,'/oauth_request', { method: 'GET'}));
            return { json: () => ({ ...jsonResponse })};
        });

        it('should be able to parse the json string response into a object', result =>{
            expect(result).toEqual(jsonResponse);
            return jsonResponse;
        });

        it('then should redirect the user to the uri', result => {
            expect(result).toEqual(call(redirectToUrl, jsonResponse.auth))
        });

        it('then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe(`Scenario 2:
        When a user tries to get an authentication uri and the endpoint fail`, () => {

        const it = SagaHelper(twitterOauthSignIn());
        const error = new Error('something went wrong');

        it('should call the oauth_request endpoint and fail', result => {
            expect(result).toEqual(call(fetch,'/oauth_request', { method: 'GET'}));
            return error;
        });

        it('should trigger action that describes the fail', result => {
            expect(result).toEqual(put(twitterSignInError(error)));
        });

        it('then nothing', result => {
            expect(result).toBeUndefined();
        });

    });

    describe(`Scenario 3:
        When a user tries to get an authentication uri and the body is malformed`, () => {

        const it = SagaHelper(twitterOauthSignIn());
        const error = new Error('malformed json when .json() is called');

        it('should call the oauth_request endpoint', result => {
            expect(result).toEqual(call(fetch,'/oauth_request', { method: 'GET'}));
            return { json: () => { throw error; } };
        });

        it('should throw a runtime error when parsing', result => {
            // console.log(result)
            expect(result).toEqual(put(twitterSignInError(error)));
        });

        it('then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

});
