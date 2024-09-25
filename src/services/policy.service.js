const Policy = require('../models/Policy');

const getPolicies = async () => {
    try {
        const policies = await Policy.find({});
        return policies;
    } catch (error) {
        throw new Error(error);
    }
}


const getPolicyById = async (id) => {
    try {
        const policy = await Policy.findById(id);
        return policy;
    }
    catch (error) {
        throw new Error(error);
    }
}

const createPolicy = async (policyName, department, level, policyDescription, policyContent, policyLink, policyCreatedDate) => {
    try {
        const newPolicy = new Policy({ policyName, department, level, policyDescription, policyContent, policyLink, policyCreatedDate });
        await newPolicy.save();
        return newPolicy;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const updatePolicy = async (id, policyName, department, level, policyDescription, policyContent, policyLink, policyCreatedDate) => {
    try {
        const updateFields = {};

        if (policyName) updateFields.policyName = policyName;
        if (department) updateFields.department = department;
        if (level) updateFields.level = level;
        if (policyDescription) updateFields.policyDescription = policyDescription;
        if (policyContent) updateFields.policyContent = policyContent;
        if (policyLink) updateFields.policyLink = policyLink;
        if (policyCreatedDate) updateFields.policyCreatedDate = policyCreatedDate;

        console.log(updateFields);

        const updatedPolicy = await Policy.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        return updatedPolicy;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}


const deletePolicy = async (id) => {
    try {
        await Policy.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getPolicies,
    getPolicyById,
    createPolicy,
    updatePolicy,
    deletePolicy
}