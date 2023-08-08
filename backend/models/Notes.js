const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const noteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
