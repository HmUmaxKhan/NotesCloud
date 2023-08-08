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

    /* The code inside the `try` block is responsible for adding a new note to the database. */
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

// Route 3 for Updating notes

router.put('/updatenote/:id',fetchUser,
async(req, res) => {
    const {title, description,tag} = req.body;

    try {

    let newNote={};

    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let data = await Note.findById(req.params.id);
    
    if(!data)
    {
        return res.status(404).json({message:"  Note Not Found "});
    }

    if(data.user.toString()!== req.user.id)
    {
        res.status(404).json({message:"You don't have permission to update this note"});
    }

    let updateNote = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(updateNote);
        
    }catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
    }
})

// Route 3 for Updating notes

router.delete('/deletenote/:id',fetchUser,
async(req, res) => {
   
 try {

    let data = await Note.findById(req.params.id);
    
    if(!data)
    {
        return res.status(404).json({message:"Note Not Found"});
    }

    if(data.user.toString()!== req.user.id)
    {
        res.status(404).json({message:"You don't have permission to update this note"});
    }

    let deletenote = await Note.findByIdAndDelete(req.params.id)
    res.json("Successfully Deleted Note");
        
    } catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
    }
})

module.exports = router;