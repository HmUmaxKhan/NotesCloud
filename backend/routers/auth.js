const express = require('express');
const router = express();
const User = require('../models/User');


router.get('/', function (req, res){
    console.log("Hello world!");
})

module.exports = router;