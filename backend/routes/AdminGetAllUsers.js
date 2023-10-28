const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getAllUsers } = require('../controllers/AdminGetAllUsers');
const router = express.Router();
router.route('/getAllUsers').get(isAuthenticatedUser,getAllUsers)
module.exports=router