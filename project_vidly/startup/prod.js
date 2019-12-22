// helmet is used to protect the app from different kinds of web vulnerabilities on production
// compression is used to compress html requests on production
const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
    app.use(helmet());
    app.use(compression());
}