const userRouter = require('../modules/users/user.routes'),
    authorise = require('./authorise'),
    loginRouter = require('../modules/login/login.routes');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello world !');
    });

    // Login router
    app.use('/api/login', loginRouter);

    // Enabled authorisation for all the routes specified after this middleware
    app.use(authorise);

    app.use('/api/users', userRouter);
}