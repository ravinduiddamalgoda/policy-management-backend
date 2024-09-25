const mongoose = require('mongoose');
const Policy = require('./Policy');

const MCQSchema = new mongoose.Schema({
    mcq: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        required: true
    },
    Policy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true
    },
    level : {
        type: String,
        enum: ['novice', 'intermediate', 'expert', 'Novice', 'Intermediate', 'Expert'],
        required: true
    },
    department : {
        type: String,
        required: true
    }

});

const MCQ = mongoose.model('MCQ', MCQSchema);

module.exports = MCQ;