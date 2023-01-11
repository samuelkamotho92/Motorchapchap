const express = require('express');
const userAuthRoute = require('./routers/userAuthRouter');
const userRoute = require('./routers/userRouter');
const AppError = require('./utility/AppError');
const globalError = require('./controller/globalErrorController')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use('/api/Auth',userAuthRoute);
app.use('/api/user',userRoute);
app.all('*',(req,resp,next)=>{
// const err = new Error(`cant locate ${req.originalUrl}`)
// err.statuscode = 404;
// err.status = 'fail';
next(new AppError(`cant locate ${req.originalUrl}`,404));
})

app.use(globalError)
module.exports = app

