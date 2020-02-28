const userRouter = require('../modules/users/user.routes'),
    authorise = require('./authorise'),
    loginRouter = require('../modules/login/login.routes'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json'),
    cors = require('cors');

module.exports = app => {

    //enable cors
    app.use(cors());
    app.get('/', (req, res) => {
        res.send('Hello world !');
    });


    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Login router
    app.use('/api/login', loginRouter);

    // Enabled authorisation for all the routes specified after this middleware
    app.use(authorise);

    app.use('/api/users', userRouter);
}