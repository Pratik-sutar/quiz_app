const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getProfile } = require('../controllers/Profile');
const router = express.Router();
router.route('/getProfile').get(isAuthenticatedUser,getProfile)
module.exports=router