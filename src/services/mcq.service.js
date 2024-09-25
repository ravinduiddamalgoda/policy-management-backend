const MCQ = require('../models/MCQ');

const getMCQ = async () => {
    try {
        const mcq = await MCQ.find({});
        return mcq;
    } catch (error) {
        throw new Error(error);
    }
}

const getMCQById = async (id) => {
    try {
        const mcq = await MCQ.findById(id);
        return mcq;
    }
    catch (error) {
        throw new Error(error);
    }
}

const createMCQ = async (mcq , answers , correctAnswer , Policy, level , department) => {
    try {
        const newMCQ = new MCQ({mcq, answers , correctAnswer , Policy, level , department});
        await newMCQ.save();
        return newMCQ;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const updateMCQ = async (id , mcq, answers , correctAnswer, Policy, level, department) => {
    try {
        const updatedMCQ = await MCQ.findByIdAndUpdate(id, {mcq , answers, correctAnswer, Policy, level, department}, {new: true});
        return updatedMCQ;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteMCQ = async (id) => {
    try {
        await MCQ.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getMCQ,
    getMCQById,
    createMCQ,
    updateMCQ,
    deleteMCQ
}