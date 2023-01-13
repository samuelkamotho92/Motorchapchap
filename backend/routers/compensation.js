const express = require('express');
const Comp = require('../controller/compensation');
const getAuthController = require('../controller/userAuthController');
const compRoute = express.Router();
compRoute.get('/getClaims',getAuthController.protectRoutes,getAuthController.restrict('admin'),Comp.getClaims);
compRoute.post('/createClaim',getAuthController.protectRoutes,getAuthController.restrict('user'),Comp.sendCompensate);
compRoute.route('/getClaim/:id')
.get(getAuthController.protectRoutes,getAuthController.restrict('admin'),Comp.getOneCompensate)
.patch(getAuthController.protectRoutes,getAuthController.restrict('admin'),Comp.updateCompensate)
.delete(getAuthController.protectRoutes,getAuthController.restrict('asmin'),Comp.deleteCompensate)