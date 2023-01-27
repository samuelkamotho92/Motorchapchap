const express = require('express');
const getAllUsercontroller = require('../controller/userController');
const getAuthController = require('../controller/userAuthController');
const userRoute = express.Router();
userRoute.get('/getUsers',getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.getAll);
userRoute.route('/getUser/:id')
// .get(getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.getOne)
.patch(getAllUsercontroller.updateUser)
//getAuthController.protectRoutes,getAuthController.restrict('user','admin'),
// .delete(getAuthController.protectRoutes,getAuthController.restrict('admin'),getAllUsercontroller.deleteUser)

userRoute.post('/updateuser',getAuthController.protectRoutes,getAllUsercontroller.updateUser)


module.exports = userRoute;