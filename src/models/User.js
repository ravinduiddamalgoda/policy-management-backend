const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
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
    },
    otp : {
        type: String,
        required: true,
        default: "-1"
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;