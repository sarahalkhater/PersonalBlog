const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
    name: String,
    surname: String,
    password: String,
    email: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: Date,
    dateDeleted: Date,
});

const user = mongoose.model('Users', userSchema);

module.exports = user;