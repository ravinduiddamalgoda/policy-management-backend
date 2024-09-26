const MCQService = require('../services/mcq.service');

const UserService = require('../services/user.service');

const getQuiz = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userLevel = user.level;

        let userDepartment = [user.department, "All"];

        if(!user.quizCompleted){
            userDepartment = ["All"];
        }

        let mcqLevel;
        if (userLevel === 'Novice') {
            mcqLevel = ['Novice', 'Intermediate'];
        } else if (userLevel === 'Intermediate') {
            mcqLevel = ['Intermediate', 'Expert'];
        } else if (userLevel === 'Expert') {
            mcqLevel = ['Expert'];
        }

        let quiz = await MCQService.getMCQByLevelAndDepartment(mcqLevel, userDepartment);

        //randomize the quiz
        quiz = quiz.sort(() => Math.random() - 0.5);
        quiz = quiz.slice(0, 10);

        //set correctAnswer to empty string
        let sanatizedQuiz = quiz.map(q => {
            q.correctAnswer = '';
            return q;
        });

        console.log(sanatizedQuiz);

        res.status(200).json(sanatizedQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkQuiz = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const answers = req.body.answers;
        let score = 0;

        const numQuestions = answers.length;

        for(let i = 0; i < numQuestions; i++){
            let answer = answers[i];
            let mcqId = answer.id;
            let userAnswer = answer.answer;

            let mcq = await MCQService.getMCQById(mcqId);
            console.log(mcq.correctAnswer + ' ' + userAnswer);
            if (mcq.correctAnswer == userAnswer) {
                console.log('correct');
                score += 1;
            }
        }

        let newUserLevel = user.level;
        const percentage = (score / numQuestions) * 100;

        if(!user.quizCompleted){
            user.quizCompleted = true;

            if (percentage >= 80) {
                newUserLevel = 'Expert';
            } else if (percentage >= 50) {
                newUserLevel = 'Intermediate';
            } else {
                newUserLevel = 'Novice';
            }
        }else{
            if (percentage >= 80) {
                if(user.level === 'Novice'){
                    newUserLevel = 'Intermediate';
                }else if(user.level === 'Intermediate'){
                    newUserLevel = 'Expert';
                }
            } else if (percentage < 35) {
                if(user.level === 'Expert'){
                    newUserLevel = 'Intermediate';
                }else if(user.level === 'Intermediate'){
                    newUserLevel = 'Novice';
                }
            }
        }

        user.level = newUserLevel;
        await user.save();

        res.status(200).json({ message: 'Quiz Completed', score, total: numQuestions, percentage, level: newUserLevel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuiz,
    checkQuiz
}