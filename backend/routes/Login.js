const express=require('express');
const { Register } = require('../controllers/Registeration');
const { login } = require('../controllers/Login');

const router = express.Router();
router.route('/login').post(login)
module.exports=router