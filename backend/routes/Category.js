const express=require('express');
const { getCategories } = require('../controllers/Category');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();
router.route('/getAllCategories').get(isAuthenticatedUser,getCategories)
module.exports=router