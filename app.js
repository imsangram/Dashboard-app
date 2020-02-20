const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const authorise = require('./routes/authorise')
const loginRouter = require('./routes/login');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world !');
});

// Login router
app.use('/login', loginRouter);

app.use(authorise);

//Register Middlewares
app.use('/api/users', userRouter);

// connect to db
console.log(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected to db');
});

app.listen(port, () => console.log(`Listening to ${port} ....`));
