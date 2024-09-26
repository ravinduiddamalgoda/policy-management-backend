const UserService = require('../services/user.service');

const { generateOTP} = require('../utils/otp.util');
const generatePassword = require('../utils/generatePassword.util');
const email = require('../utils/email.util');

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
        const user = await UserService.getUserById(req.params.id);
        res.status(200).json(user);
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
                <p>Your Temporary Password is : <strong> ${password} </strong><p>`,
                `Welcome to Policy Management System. Your Temporary Password is : ${password}`
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


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}