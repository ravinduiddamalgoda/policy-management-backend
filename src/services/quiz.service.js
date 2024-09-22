const Quiz = require('../models/Quiz');

const getQuiz = async () => {
    try {
        const quiz = await Quiz.find({});
        return quiz;
    } catch (error) {
        throw new Error(error);
    }
}

const getQuizById = async (id) => {
    try {
        const quiz = await Quiz.findById(id);
        return quiz;
    }
    catch (error) {
        throw new Error(error);
    }
}

const createQuiz = async (quiz , answer1 , answer2 , answer3 , answer4 , answer5 , correctAnswer , level , department) => {
    try {
        const newQuiz = new Quiz(quiz , answer1 , answer2 , answer3 , answer4 , answer5 , correctAnswer , level , department);
        await newQuiz.save();
        return newQuiz;
    } catch (error) {
        throw new Error(error);
    }
}

const updateQuiz = async (id , quiz , answer1 , answer2 , answer3 , answer4 , answer5 , correctAnswer , level , department) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id , quiz , answer1 , answer2 , answer3 , answer4 , answer5 , correctAnswer , level , department);
        return updatedQuiz;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteQuiz = async (id) => {
    try {
        await Quiz.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getQuiz,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
}