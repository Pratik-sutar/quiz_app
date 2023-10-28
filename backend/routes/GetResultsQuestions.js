const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getResultQuestions } = require('../controllers/GetResultQuestions');
const router = express.Router();
router.route('/getResultQuestions').post(isAuthenticatedUser,getResultQuestions)
module.exports=router