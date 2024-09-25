const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    department : {
        type: String,
        enum: ['UI-UX Design Department','Brand Identity Department','Product Engineering Department','Web Development Department'],
        required: true
    },
    firstLogin : {
        type: Boolean,
        required: true,
        default: true
    },
    quizCompleted : {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;