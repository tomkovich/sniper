const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: 'string',
    name: 'string',
    photo: 'string'
})

const User = mongoose.model('User', userSchema)

module.exports = User