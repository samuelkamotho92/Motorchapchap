const express = require('express');
const getAllUsercontroller = require('../controller/userController');
const getAuthController = require('../controller/userAuthController');
const userRoute = express.Router();
//getAuthController.protectRoutes,getAuthController.restrict('admin')
userRoute.get('/getUser',getAllUsercontroller.getAll);
userRoute
.route('/:id')
// .get(getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.getOne)
.patch(getAllUsercontroller.updateUser)
//getAuthController.protectRoutes,getAuthController.restrict('user','admin'),
.delete(getAllUsercontroller.deleteUser)

userRoute.post('/createUser',getAllUsercontroller.createUser)


module.exports = userRoute;