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

const createPolicy = async (policyName , department , level , policyContent , policyLink , policyCreatedDate) => {
    try {
        const newPolicy = new Policy(policyName , department , level , policyContent , policyLink , policyCreatedDate);
        await newPolicy.save();
        return newPolicy;
    } catch (error) {
        throw new Error(error);
    }
}

const updatePolicy = async (id , policyName , department , level , policyContent , policyLink ) => {
    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(id , policyName , department , level , policyContent , policyLink );
        return updatedPolicy;
    } catch (error) {
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