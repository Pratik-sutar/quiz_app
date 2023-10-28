const express=require('express');

const { isAuthenticatedUser } = require('../middleware/auth');
const { getCategoriesBasedQuestion } = require('../controllers/Question');
const router = express.Router();
router.route('/getCategoryBasedQuestion').post(isAuthenticatedUser,getCategoriesBasedQuestion)
module.exports=router