const QuizRouter = require('express').Router();

const QuizController = require('../controller/quiz.ctrl');

QuizRouter.get('/', QuizController.getQuiz);
QuizRouter.post('/', QuizController.checkQuiz);

module.exports = QuizRouter;