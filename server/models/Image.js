const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const imageSchema = new Schema({
    url: {
        type: String,
        unique: true,
        required: true,
        match: [/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/, 'URL must be valid!']
    },
    caption: {
        type: String,
        required: true,
        minlength: 1
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }

});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;