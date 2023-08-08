const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require('../middlewares/fetchUser')

// Route 1 for checking notes

router.get('/checkingnotes',fetchUser,
async (req,res)=>{
   let notes = await Note.find({user:req.user.id});
   res.json(notes);
})


// Route 2 for adding notes

router.post('/addnotes',fetchUser,
[
    body("title", "Enter a valid title with more than 3 characters").isLength({
      min: 3,
    }),
    body("description", "description must be greater than 4 characters").isLength({
        min: 5,
      }),
  ],
async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    const {title,description,tag}=req.body
    
    let notes = {title:title,description:description,tag:tag,user:req.user.id};
    let added = new Note(notes);
    added.save();
    res.json(added);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }
})


module.exports = router;