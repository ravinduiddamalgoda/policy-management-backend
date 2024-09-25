const UserService = require('../services/user.service');

const { generateOTP} = require('../utils/otp.util');
const generatePassword = require('../utils/generatePassword.util');

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
        const user = await UserService.createUser(req.body.policyName, req.body.department, req.body.level, req.body.policyDescription, req.body.policyContent, req.body.policyLink, req.body.policyCreatedDate);
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
        await UserService.deleteUser(req.params.id);
        res.status(200).json({ message: 'Policy Deleted Successfully' });
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