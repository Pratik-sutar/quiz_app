const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUserResult } = require('../controllers/GetResults');
const router = express.Router();
router.route('/getUserResults').get(isAuthenticatedUser,getUserResult)
module.exports=router