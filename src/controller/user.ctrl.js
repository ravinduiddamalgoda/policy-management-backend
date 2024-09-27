const UserService = require('../services/user.service');

const { generateOTP} = require('../utils/otp.util');
const generatePassword = require('../utils/generatePassword.util');
const email = require('../utils/email.util');
const {createPasswordHash} = require('../services/auth.service');
const {validatePassword} = require('../services/auth.service');
const {signToken} = require('../services/auth.service');

const getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getUserById = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await UserService.getUserById(req.params.id);
        console.log(req.body.id);
        if(user){
            user.password = "";
            res.status(200).json(user);
        }else {
            res.status(404).json({ message: 'User not found' });
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const password = generatePassword();
        const data = req.body;
        const user = await UserService.createUser(data.firstName, data.lastName, data.email, password, 'user', data.department, data.level);

        user.password = ""

        if (user) {
            const res = email.send([user.email], 
                `Welcome to Policy Management System`,
                `<h2>Welcome to Policy Management System</h2>
                <p>You need to try to login with any password you like and then system will send you a system generated password to this email address. You can sign into the system with that password.<p>`,
            );
        }
       

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateUser = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body.policyName, req.body.department, req.body.level, req.body.policyDescription, req.body.policyContent, req.body.policyLink, req.body.policyCreatedDate);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteUser = async (req, res) => {
    try {
        let user = await UserService.deleteUser(req.params.id);

        if(user){
            email.send([res.email], 
                `Account Deleted`,
                `<h2>Your Account has been Deleted</h2>
                <p>Your Account has been Deleted by the Administrator</p>
                <p>Thank You for working with us</p>
                <br/>
                <small>Policy Management System</small>
                <small>if there is any issue with this email, please contact the administrator</small>`,
                `Your Account has been Deleted by the Administrator.
                Thank You for working with us.

                if there is any issue with this email, please contact the administrator`
            );
        }

        res.status(200).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await UserService.getUserByEmail(req.body.email);
        if(!user){
            throw new Error('User not found');
        }
        else{
            if(user.firstLogin){
                const passwordNw = generatePassword();
                user.password = createPasswordHash(passwordNw);
                user.firstLogin = false;
                UserService.updateUser(user._id, user.firstName, user.lastName, user.email, user.password, user.role, user.department, user.level, user.lastLogin, user.firstLogin, user.quizCompleted, user.otp);
                email.send([user.email], 
                    `Welcome to Policy Management System`,
                    `<h2>Welcome to Policy Management System</h2>
                    <p>Your Temporary Password is : <strong> ${passwordNw} </strong><p>`,
                    `Welcome to Policy Management System. Your Temporary Password is : ${passwordNw}`
                );
                return res.status(200).json({ message: 'First login, password sent via email' });
            }else {
                const isPasswordValid = validatePassword(req.body.password, user.password);
                if(!isPasswordValid){
                    throw new Error('Invalid Password');
                }
                console.log('valid password');
                try{
                    const optVal = generateOTP(5);
                    console.log(optVal);
                    user.otp = optVal;
                    user.lastLogin = new Date().toISOString();
                    UserService.updateUser(user._id, user.firstName, user.lastName, user.email, user.password, user.role, user.department, user.level, user.lastLogin, user.firstLogin, user.quizCompleted, user.otp);
                    email.send([user.email], 
                        `OTP for Login`,
                        `<h2>OTP for Login</h2>
                        <p>Your OTP for Login is : <strong> ${optVal} </strong><p>`,
                        `OTP for Login is : ${optVal}`
                    );
                    return res.status(200).json({ message: 'OTP Sent to your Email' });
                }catch(e){
                    return res.status(500).json({ message: 'Error sending OTP' });
                }                
            }
        }
        //const user = await UserService.loginUser(req.body.email, req.body.password);
        //res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const optFunc = async (req,res) => {
    try{
        const user = await UserService.getUserByEmail(req.body.email);
        if(!user){
            throw new Error('User not found');
        }
        if(user.otp === req.body.otp){
            user.otp = "-1";
            UserService.updateUser(user._id, user.firstName, user.lastName, user.email, user.password, user.role, user.department, user.level, user.lastLogin, user.firstLogin, user.quizCompleted, user.otp);
            const token = signToken({email: user.email, role: user.role , userId: user._id});
            console.log(token);
            return res.status(200).json({ token , id: user._id  , role: user.role  , department: user.department , level: user.level });
        }else{
            return res.status(500).json({ message: 'Invalid OTP' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    optFunc
}