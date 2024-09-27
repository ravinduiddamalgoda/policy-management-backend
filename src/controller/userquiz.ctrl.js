const UserQuizService = require('../services/user.quiz.service');

const getUserQuiz = async (req, res) => {
    try {
        const userQuiz = await UserQuizService.getUserQuiz(req.params.userid);
        res.status(200).send(userQuiz);
    } catch (error) {
        res.status(400).send(error);
    }
}


const createUserQuiz = async (req, res) => {
    try {
        const userQuiz = await UserQuizService.createUserQuiz(req.body.userid, req.body.quizid, req.body.givenanswer, req.body.correctanswer);
        res.status(200).send(userQuiz);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUserQuiz = async (req, res) => {
    try {
        const userQuiz = await UserQuizService.updateUserQuiz(req.params.id, req.body.userid, req.body.quizid, req.body.givenanswer, req.body.correctanswer);
        res.status(200).send(userQuiz);
    } catch (error) {
        res.status(400).send(error);
    }
} 

const deleteUserQuiz = async (req, res) => {
    try {
        await UserQuizService.deleteUserQuiz(req.params.id);
        res.status(200).send('UserQuiz Deleted Successfully');
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    getUserQuiz,
    createUserQuiz,
    updateUserQuiz,
    deleteUserQuiz
}


