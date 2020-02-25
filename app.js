const dotenv = require('dotenv').config(),
  express = require('express'),
  constants = require('./config/constants'),
  database = require('./config/database'),
  appSetup = require('./middleware/appSetup'),
  routeSetup = require('./middleware/routeSetup');

const app = express();

// middleware code
appSetup(app);
routeSetup(app);

app.listen(constants.PORT, () => console.log(`Listening to ${constants.PORT} ....`));
