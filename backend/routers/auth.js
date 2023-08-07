const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


router.post('/',[
    body("name","Enter a valid name with more than 3 characters").isLength({min:3}),
body('email',"Enter a valid email").isEmail(),
body("password", "Password must be greater than 4 characters").isLength({min:5})
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array})
    }
})


module.exports = router;