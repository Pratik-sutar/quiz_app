const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getAllResults } = require('../controllers/AdminGetAllResults');
const router = express.Router();
router.route('/getAllResults').get(isAuthenticatedUser,getAllResults)
module.exports=router