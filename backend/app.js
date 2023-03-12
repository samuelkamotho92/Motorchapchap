const express = require('express');
const userAuthRoute = require('./routers/userAuthRouter');
const userRoute = require('./routers/userRouter');
const claimRoute = require('./routers/claimRoute');
const paymentRoute = require('./routers/userPayments');
const AppError = require('./utility/AppError');
const globalError = require('./controller/globalErrorController');
const cors = require('cors');
const app = express();
app.use(cors({
origin:[`http://localhost:5173`,`http://localhost:3000`],
credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 


app.use('/api/Auth',userAuthRoute);
app.use('/api/user',userRoute);
app.use('/api/claim',claimRoute);
app.use('/api/checkout',paymentRoute);
app.all('*',(req,resp,next)=>{
next(new AppError(`cant locate ${req.originalUrl}`,404));
})

app.use(globalError)
module.exports = app

