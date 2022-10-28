const mongoose = require('mongoose');
const {isEmail}= require("validator")
const uniqueValidator = require('mongoose-unique-validator');

const schemaUser = mongoose.Schema({
    pseudo: {type: String, required: true, maxlength : 30, minlength : 2, unique: true},
    email: {type: String, required: true, unique: true, validate: [isEmail]},
    password: {type: String, required: true, minlength: 6},
    picture : {type: String, default: "/random-user.png"},
    isAdmin : {type: Boolean, default: false},
    bio : {type : String, maxlength: 1024 },
    followers: {type:[String]},
    following : {type: [String]},
    likes: {type: [String]}
    },
    {
        timestamps : true,
    }
);

schemaUser.plugin(uniqueValidator);

module.exports = mongoose.model('User', schemaUser)