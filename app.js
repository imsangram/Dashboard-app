const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
require('dotenv').config();
const port = process.env.PORT || 4000

const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello world !');
});

app.use('/api/users',userRouter);

// connect to db
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true } , ()=>{console.log('Connected to db') });

app.listen(port,()=> console.log(`Listening to ${port} ....`));