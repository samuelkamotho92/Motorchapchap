const express = require('express');
const Claims = require('../controller/claims');
const getAuthController = require('../controller/userAuthController');
const claimRoute = express.Router();
claimRoute.get('/getClaims',Claims.getClaims);
claimRoute.get('/getApproved',Claims.getApproved);
claimRoute.post('/createClaim',Claims.sendClaim);
claimRoute.post('/getMyClaims',Claims.getMyclaims);
claimRoute.route('/:id')
.get(Claims.getOneClaim)
.patch(Claims.updateClaim)
.delete(Claims.deleteClaim);
module.exports = claimRoute;