const userResolver = require('./user');
const flatmateResolver = require('./flatmate');
const commentsResolver = require('./comments');

const rootResolver = {
    ...userResolver,
    ...flatmateResolver,
    ...commentsResolver
}

module.exports = rootResolver;