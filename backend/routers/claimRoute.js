const express = require('express');
const Claims = require('../controller/claims');
const getAuthController = require('../controller/userAuthController');
const claimRoute = express.Router();
//getAuthController.protectRoutes,getAuthController.restrict('user'),
//getAuthController.protectRoutes,getAuthController.restrict('admin'),
claimRoute.get('/getClaims',Claims.getClaims);
claimRoute.post('/createClaim',Claims.sendClaim);
claimRoute.route('/getClaim/:id')
.get(getAuthController.protectRoutes,getAuthController.restrict('admin'),Claims.getOneClaim)
.patch(getAuthController.protectRoutes,getAuthController.restrict('admin'),Claims.updateClaim)
.delete(getAuthController.protectRoutes,getAuthController.restrict('asmin'),Claims.deleteClaim)


module.exports = claimRoute;