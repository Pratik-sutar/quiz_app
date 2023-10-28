const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const {saveUserResult} = require('../controllers/SaveResults')
const router = express.Router();
router.route('/saveUserResults').post(isAuthenticatedUser,saveUserResult)
module.exports=router