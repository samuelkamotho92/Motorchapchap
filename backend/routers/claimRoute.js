const express = require('express');
const Claims = require('../controller/claims');
const getAuthController = require('../controller/userAuthController');
const claimRoute = express.Router();
//getAuthController.protectRoutes,getAuthController.restrict('user'),
//getAuthController.protectRoutes,getAuthController.restrict('admin'),
//getAuthController.protectRoutes,getAuthController.restrict('admin'),
claimRoute.get('/getClaims',Claims.getClaims);
claimRoute.post('/createClaim',Claims.sendClaim);
claimRoute.post('/getMyClaims',Claims.getMyclaims);
claimRoute.route('/getClaim/:id')
.get(Claims.getOneClaim)
.patch(Claims.updateClaim)
.delete(Claims.deleteClaim)
claimRoute
.get('/getApproved',Claims.getApproved)

module.exports = claimRoute;