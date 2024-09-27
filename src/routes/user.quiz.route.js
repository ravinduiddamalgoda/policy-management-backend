const UserQuizController = require('../controller/userquiz.ctrl');
const express = require('express');
const UserQuizRouter = express.Router();

UserQuizRouter.get('/:userid', UserQuizController.getUserQuiz);
UserQuizRouter.post('/', UserQuizController.createUserQuiz);
UserQuizRouter.put('/:id', UserQuizController.updateUserQuiz);
UserQuizRouter.delete('/:id', UserQuizController.deleteUserQuiz);

module.exports = UserQuizRouter;