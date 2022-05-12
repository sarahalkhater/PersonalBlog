const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const postSchema = new Schema({
    title: String,
    userName: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: null
    },
    dateDeleted: {
        type: Date,
        default: null
    }
});

const post = mongoose.model('Posts', postSchema);

module.exports = post;