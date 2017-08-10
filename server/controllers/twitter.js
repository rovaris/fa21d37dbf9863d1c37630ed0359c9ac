const TwitterAPI = require('node-twitter-api');

const twitter = new TwitterAPI({
    consumerKey: PROJECT_ENV.twitterConsumerKey,
    consumerSecret: PROJECT_ENV.twitterConsumerSecret,
    callback: 'http://localhost:8000/connect',
});

// will fix it later
let requestTokenSecret;

function getAccessToken(requestToken, verifier) {
    return new Promise((resolve, reject) => {
        twitter.getAccessToken(
            requestToken, requestTokenSecret, verifier,
            (error, accessToken, accessSecret) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ accessToken, accessSecret });
                }
            },
        );
    });
}

function verifyCredentials({ accessToken, accessSecret }) {
    return new Promise((resolve, reject) => {
        twitter.verifyCredentials(
            accessToken,
            accessSecret,
            (error, user) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            },
        );
    });
}

const oauthRequestRoute = (req, res) => {
    twitter.getRequestToken((error, requestToken, tokenSecret) => {
        if (error) {
            console.error(`Error getting OAuth request token : ${JSON.stringify(error)}`);
        } else {
            requestTokenSecret = tokenSecret;
            res.status(200)
                .json({ auth: `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}` });
        }
    });
};

const connectRoute = (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;
    getAccessToken(oauth_token, oauth_verifier)
    .then(verifyCredentials)
    .then(user => res.send(user))
    .catch(error => res.status(500).send(error));
};

module.exports = {
    oauth: oauthRequestRoute,
    connect: connectRoute,
};
