const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required : true
    },
    isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id:this._id, isAdmin : this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

module.exports = User;