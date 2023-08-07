const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


/* The code `router.post('/createuser', [...]` is defining a POST route for the Express router. This route will
be triggered when a POST request is made to the specified endpoint ("/"). */
router.post('/createuser',[
    body("name","Enter a valid name with more than 3 characters").isLength({min:3}),
body('email',"Enter a valid email").isEmail(),
body("password", "Password must be greater than 4 characters").isLength({min:5})
],


/* The code `async(req, res)=>{...}` is defining an asynchronous function that handles the logic for
the POST route. */
async(req, res)=>{

    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
 
    
   /* This code is checking if a user with the specified email already exists in the database. */
    let user = await User.findOne({email:req.body.email});
    if (user) {
       return res.status(400).json({err:"Sorry User is already exits!"})
    }


     /* This code is creating a new user in the database using the `User` model. It is using the
     `create` method provided by the `User` model to create a new document in the database with the
     specified name, email, and password. */
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.status(200).json({Info:"User is created successfully"})
}
catch (err) {res.status(500).json({err : err.message})
 res.send(console.error(err));
}
}) 

module.exports = router;