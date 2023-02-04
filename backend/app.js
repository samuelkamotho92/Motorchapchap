const express = require('express');
const userAuthRoute = require('./routers/userAuthRouter');
const userRoute = require('./routers/userRouter');
const claimRoute = require('./routers/claimRoute');
const paymentRoute = require('./routers/userPayments');
const AppError = require('./utility/AppError');
const globalError = require('./controller/globalErrorController');
const cors = require('cors');
const app = express();
app.use(cors({origin:`http://localhost:5173`,
credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 


// app.post('/api/Auth/working',(req,resp)=>{
//     resp.status(200).json({
//     message:'sent succe'
//     })
// })
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   })
app.use('/api/Auth',userAuthRoute);
app.use('/api/user',userRoute);
app.use('/api/claim',claimRoute);
app.use('/api/checkout',paymentRoute);
// app.use('/api/payments',)
app.all('*',(req,resp,next)=>{
// const err = new Error(`cant locate ${req.originalUrl}`)
// err.statuscode = 404;
// err.status = 'fail';
next(new AppError(`cant locate ${req.originalUrl}`,404));
})

app.use(globalError)
module.exports = app

