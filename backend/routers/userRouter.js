const express = require('express');
const getAllUsercontroller = require('../controller/userController');
const getAuthController = require('../controller/userAuthController');
const userRoute = express.Router();
userRoute.get('/getUsers',getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.getAll);
userRoute.route('/getUser/:id')
.get(getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.getOne)
.patch(getAuthController.protectRoutes,getAuthController.restrict('user','admin'),getAllUsercontroller.updateUser)
.delete(getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.deleteUser)
module.exports = userRoute;