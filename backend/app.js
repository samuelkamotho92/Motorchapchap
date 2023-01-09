const express = require('express');
const userAuthRoute = require('./routers/userAuthRouter')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use('/api/Auth',userAuthRoute);

module.exports = app

