module.exports = function(req, res, next) {

    // 401 - Unauthorized, used when user tries to access resource but didnot provide a valid access web token
    // 403 - Forbidden, used when user tries to access resource with a valid web token but don't have permissions to access it

    if (!req.user.isAdmin) {
        return res.status(403).send('Access denied');
    }
    next();
}