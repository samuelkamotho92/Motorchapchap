const userController = require('../controller/userAuthController');
const express = require('express');
const authRoute = express.Router();

authRoute.post("/signUp",userController.userSignUp);
authRoute.post("/signIn",userController.userLogin);

module.exports = authRoute;