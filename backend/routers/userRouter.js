const express = require('express');
const getAllUsercontroller = require('../controller/userController')
const userRoute = express.Router();
userRoute.get('/getUsers',getAllUsercontroller.getAll);
userRoute.route('/getUser/:id')
.get(getAllUsercontroller.getOne)
.patch(getAllUsercontroller.updateUser)
.delete(getAllUsercontroller.deleteUser)
module.exports = userRoute;