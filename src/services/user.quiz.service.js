const UserQuiz = require('../models/UserMarks');
const UserService = require('./user.service');


const getUserQuiz = async (userID) => {
    try{
        const user = await UserService.getUserById(userID);
        if(user){
            const userQuiz = await UserQuiz.findOne({user:user});
            return userQuiz;
        }else{
            throw new Error('User not found');
        }

    }catch(err){
        throw new Error(err);
    }
}


const createUserQuiz = async (userid , quizid , givenanswer , correctanswer ) => {
    try{
        const user = await UserService.getUserById(userid);
        if(user){
            const quiz = await QuizService.getQuizById(quizid);
            if(quiz){
                const newUserQuiz = new UserQuiz({
                    user,
                    quiz,
                    givenanswer,
                    correctanswer
                });
                await newUserQuiz.save();
                return newUserQuiz;
            }else{
                throw new Error('Quiz not found');
            }
        }else{
            throw new Error('User not found');
        }
    }catch(err){
        throw new Error(err);
    }
}

// const addPanelty = async (userid , panelty) => {
//     try{
//         const user = await UserService.getUserById(userid);
//         if(user){
//             const userQuiz = await UserQuiz.findOne({user});
//             userQuiz.panelty = panelty;
//             await userQuiz.save();
//             return userQuiz;
//         }else{
//             throw new Error('User not found');
//         }
//     }catch(err){
//         throw new Error(err);
//     }
// }


const updateUserQuiz = async (_id , user , quiz, givenanswer , correctanswer ) => {
    try{
        const updateFields = {};
        if(user){
            updateFields.user = user;
        }
        if(quiz){
            updateFields.quiz = quiz;
        }
        if(givenanswer){
            updateFields.givenanswer = givenanswer;
        }
        if(correctanswer){
            updateFields.correctanswer = correctanswer;
        }
        const updatedUserQuiz = await UserQuiz.findByIdAndUpdate(_id,updateFields);
        return updatedUserQuiz;
    }catch(err){
        throw new Error(err);
    }
}

const deleteUserQuiz = async (id) => {
    try{
        await UserQuiz.findByIdAndDelete(id);
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports={
    getUserQuiz,
    createUserQuiz,
    updateUserQuiz,
    deleteUserQuiz
}