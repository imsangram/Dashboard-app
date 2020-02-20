const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = extractToken(req);
    if (token == null) {
        return res.status(401).json('Unautherised');
    }
    else {

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            if (verified)
                next();
            else
                return res.status(401).json('Access denied !!');
        }
        catch (err) {
            res.status(400).json('error:' + err);
        }
    }

}

function extractToken(req) {
    if (req.header('Authorization') && req.header('Authorization').split(' ')[0].toLowerCase() === 'bearer') {
        return req.header('Authorization').split(' ')[1];
    }
    else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
