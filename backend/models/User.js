const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    date:{
        type : 'date',
        default: Date.now()
    }
})

const User = new mongoose.model('user',userSchema);

module.export = User