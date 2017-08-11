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

function getRecentTweets(session) {
    const { user, secret, token } = session;
    const params = {
        user_id: user.id,
        screen_name: user.screen_name,
        count: 100,
    };

    return new Promise((resolve, reject) => {
        twitter.getTimeline(
            'user_timeline', params, token, secret, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
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
    .then((keyPair) => {
        req.session.token = keyPair.accessToken;
        req.session.secret = keyPair.accessSecret;
        return verifyCredentials(keyPair);
    }).then((user) => {
        req.session.user = user;
        const name = user.name;
        const screenName = user.screen_name;
        const profileImageUrl = user.profile_image_url;
        res.cookie('user', JSON.stringify({ name, screenName, profileImageUrl }));
        res.redirect('/');
    })
    .catch((error) => {
        req.session.token = null;
        req.session.secret = null;
        res.status(500).send(error);
    });
};


const tweets = (req, res) => {
    getRecentTweets(req.session)
    .then((results) => {
        const processedData = results.map(entry => ({
            id: entry.id,
            text: entry.text,
        }));

        res.status(200).json(processedData);
    })
    .catch((error) => {
        console.error(`Error getting list of tweets due to: ${JSON.stringify(error)}`);
        res.status(500).json(error);
    });
};

const disconnect = (req, res) => {
    if (!req.session.user) {
        res.status(403).json({ error: 'User not authenticated' });
    }

    res.clearCookie('user');
    req.session = null;
    res.status(200).send({});
};

module.exports = {
    oauth: oauthRequestRoute,
    connect: connectRoute,
    tweets,
    disconnect,
};
