const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3,
        max:256
    },
    email: {
        type: String,
        required: true,
        min:6,
        max:256
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024
    }
});

module.exports = mongoose.model('users', userSchema);
