const mongoose = require('mongoose');

const UserQuiz = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true     
    },
    givenanswer: {
        type: String,
        required: true
    },
    correctanswer: {
        type: String,
        required: true
    },
    panelty: {
        type: Number,
    },
    
});

const UserQuizSchema = mongoose.model('UserQuiz', UserQuiz);
module.exports = UserQuizSchema;
