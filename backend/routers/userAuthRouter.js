const userAuthController = require('../controller/userAuthController');
const express = require('express');
const authRoute = express.Router();

authRoute.post("/signUp",userAuthController.userSignUp);
authRoute.post("/signIn",userAuthController.userLogin);
authRoute.post('/forgotPassword',userAuthController.resetTokensend);
authRoute.post('/resetPassword/:token',userAuthController.resetPassword);
authRoute.post('/updateMypassword',userAuthController.protectRoutes,userAuthController.updatePassword);
module.exports = authRoute;