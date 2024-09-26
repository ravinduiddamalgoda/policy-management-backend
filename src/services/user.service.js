const User = require('../models/User');

const getUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(error);
    }
}


const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        throw new Error(error);
    }
}

const createUser = async (firstName, lastName, email, password, role, department) => {
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            department
        });
        await newUser.save();
        newUser.password = "";
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const updateUser = async () => {
    try {
        const updateFields = {};

        console.log(updateFields);

        const updatedUser = await User.findByIdAndUpdate({});
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}


const deleteUser = async (id) => {
    try {
        await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}