const express=require('express');
const { Register } = require('../controllers/Registeration');
const { login } = require('../controllers/Login');

const router = express.Router();
router.route('/register').post(Register,login)
module.exports=router