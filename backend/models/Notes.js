const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const noteSchema = new Schema({
    title : {
        type: 'string',
    },
    description:{
        type: 'string',
    },
    date:{
        type : 'date',
        default: Date.now()
    }
})

const Note = new mongoose.model('note',noteSchema);

module.export = Note