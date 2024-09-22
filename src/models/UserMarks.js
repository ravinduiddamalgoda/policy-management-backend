const mongoose = require('mongoose');

const userMarksSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    attempt:{
        type: Number,
        required: true,       
    },
    score: {
        type: Number,
        required: true
    }
});