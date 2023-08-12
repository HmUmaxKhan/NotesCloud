const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require('../middlewares/fetchUser')

const jwt_secret = "tuesdaymonday*fridaysunday";

/* The code `router.post('/createuser', [...]` is defining a POST route for the Express router. This route will
be triggered when a POST request is made to the specified endpoint ("/"). */
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name with more than 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be greater than 4 characters").isLength({
      min: 5,
    }),
  ],

  /* The code `async(req, res)=>{...}` is defining an asynchronous function that handles the logic for
the POST route. */
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      /* This code is checking if a user with the specified email already exists in the database. */
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ err: "Sorry User is already exits!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      /* This code is creating a new user in the database using the `User` model. It is using the
     `create` method provided by the `User` model to create a new document in the database with the
     specified name, email, and password. */
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      /* This code is generating a JSON Web Token (JWT) using the `jsonwebtoken` library. */
      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(data, jwt_secret);
         let sucess = true;
      res
        .status(200)
        .json({ sucess,Info: "User is created successfully", authtoken: jwtData });
    } catch (err) {
      res.status(500).json({ err: err.message });
      console.log(err);
    }
  }
);

/* The code `router.post("/login", [...], async (req, res) => {...}` is defining a POST route for the
Express router. This route will be triggered when a POST request is made to the "/login" endpoint. */


router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be greater than 4 characters").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        /* `const {email,password} = (req.body);` is using object destructuring to extract the `email`
        and `password` properties from the `req.body` object. */
        const {email,password} = (req.body);

        /* This code is checking if a user with the specified email exists in the database. */
        let user = await User.findOne({email});
        if (!user) {
          success = false;
            return res.status(404).json({success,ERROR:"User does not exists with this email"});
        }

        /* The code `const passwordCompare = bcrypt.compare(password, user.password);` is comparing the
        provided password with the hashed password stored in the database for the user. */
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
        return res.status(404).json({ERROR:"Enter the correct password"});
        }

        /* This code is generating a JSON Web Token (JWT) for the authenticated user. */
        const data = {
            user: {
              id: user.id,
            },
          };
    
          const jwtData = jwt.sign(data, jwt_secret);
           success=true;
          res
            .status(200)
            .json({ success ,Info: "User is Authenticated Successfully", authtoken: jwtData });

        } catch (err) {
            res.status(500).json({ err: err.message });
          }
  }
);


// Fetch user info using Token

router.post('/getuser',fetchUser,
async (req, res)=>{
    try {
        userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }

})

module.exports = router;

