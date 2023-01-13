const express = require('express');
const Claims = require('../controller/claims');
const getAuthController = require('../controller/userAuthController');
const claimRoute = express.Router();
claimRoute.get('/getClaims',getAuthController.protectRoutes,getAuthController.restrict('admin'),Claims.getClaims);
claimRoute.post('/createClaim',getAuthController.protectRoutes,getAuthController.restrict('user'),Claims.sendClaim);
claimRoute.route('/getClaim/:id')
.get(getAuthController.protectRoutes,getAuthController.restrict('admin'),Claims.getOneClaim)
.patch(getAuthController.protectRoutes,getAuthController.restrict('admin'),Claims.updateClaim)
.delete(getAuthController.protectRoutes,getAuthController.restrict('asmin'),Claims.deleteClaim)