const QuizService = require('../services/quiz.service');

const getQuiz = async (req, res) => {
    try {
        const quiz = await QuizService.getQuiz();
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getQuizById = async (req, res) => {
    try {
        const quiz = await QuizService.getQuizById(req.params.id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createQuiz = async (req, res) => {
    try {
        const quiz = await QuizService.createQuiz(req.body.quiz, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, req.body.answer5, req.body.correctAnswer, req.body.level, req.body.department);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const quiz = await QuizService.updateQuiz(req.params.id, req.body.quiz, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, req.body.answer5, req.body.correctAnswer, req.body.level, req.body.department);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteQuiz = async (req, res) => {
    try {
        await QuizService.deleteQuiz(req.params.id);
        res.status(200).json({ message: 'Quiz Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getQuiz,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
}