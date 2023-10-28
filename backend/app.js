"use strict";
const express = require('express');
const path = require('path');
// const app = express();
const app = require('./api')
const dotenv = require('dotenv');



dotenv.config({ path: './config/config.env' })


app.listen(process.env.PORT, () => {
  console.log(`app is working at port http://localhost:${process.env.PORT}`)
})