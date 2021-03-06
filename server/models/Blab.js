const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const blabSchema = new Schema({
    blabText: {
        type: String,
        default: "... you didn't blab..."
    },
    imageUrl: {
        type: String,
        default: "https://res.cloudinary.com/tinablab/image/upload/v1621565724/Jasper_o9dcn9.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
//     likes: {

//         type: Number,
//         default: 0


//     },
    comments: [commentSchema]
}, {
    toJSON: {
        getters: true
    }
});

blabSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Blab = model('Blab', blabSchema);

module.exports = Blab;