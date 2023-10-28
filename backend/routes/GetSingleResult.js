const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUserSingleResult } = require('../controllers/GetSingleResult');
const router = express.Router();
router.route('/getUserSingleResults').post(isAuthenticatedUser,getUserSingleResult)
module.exports=router