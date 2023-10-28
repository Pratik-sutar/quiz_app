const express=require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { saveResultQuestion } = require('../controllers/SaveREsultQuestions');
const router = express.Router();
router.route('/saveUserResultsQuestions').post(isAuthenticatedUser,saveResultQuestion)
module.exports=router