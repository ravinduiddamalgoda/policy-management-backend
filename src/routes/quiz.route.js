const QuizController = require('../controller/quiz.ctrl');

const QuizRouter = require('express').Router();

QuizRouter.get('/', QuizController.getQuiz);
QuizRouter.get('/:id', QuizController.getQuizById);
QuizRouter.post('/', QuizController.createQuiz);
QuizRouter.put('/:id', QuizController.updateQuiz);
QuizRouter.delete('/:id', QuizController.deleteQuiz);


module.exports = QuizRouter;

