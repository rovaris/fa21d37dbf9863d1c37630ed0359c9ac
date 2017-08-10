const twitterController = require('./controllers/twitter');

function registerRoutes(app) {
    app.get('/oauth_request', twitterController.oauth);
    app.get('/connect', twitterController.connect);
}

module.exports = registerRoutes;
