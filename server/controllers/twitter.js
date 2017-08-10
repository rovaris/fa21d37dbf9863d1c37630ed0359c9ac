const TwitterAPI = require('node-twitter-api');

const twitter = new TwitterAPI({
    consumerKey: PROJECT_ENV.twitterConsumerKey,
    consumerSecret: PROJECT_ENV.twitterConsumerSecret,
    callback: 'http://localhost:8000/connect',
});

function getAccessToken(requestToken, verifier) {
    return new Promise((resolve, reject) => {
        twitter.getAccessToken(
            requestToken, null, verifier,
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
    twitter.getRequestToken((error, requestToken) => {
        if (error) {
            console.error(`Error getting OAuth request token : ${JSON.stringify(error)}`);
        } else {
            res.status(200)
                .json({ auth: `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}` });
        }
    });
};

const connectRoute = (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;
    const { tokenSecret } = req.session;

    getAccessToken(oauth_token, oauth_verifier, tokenSecret)
    .then(keyPair => verifyCredentials(keyPair))
    .then((user) => {
        req.session.user = user;
        const name = user.name;
        const hashtag = user.screen_name;
        const profileImageUrl = user.profile_image_url;
        res.cookie('user', { name, hashtag, profileImageUrl });
        res.redirect('/');
    })
    .catch(error => res.status(500).send(error));
};

module.exports = {
    oauth: oauthRequestRoute,
    connect: connectRoute,
};
