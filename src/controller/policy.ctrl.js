const PolicyService = require('../services/policy.service');

const getPolicies = async (req, res) => {
    try {
        const policies = await PolicyService.getPolicies();
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getPolicyById = async (req, res) => {
    try {
        const policy = await PolicyService.getPolicyById(req.params.id);
        res.status(200).json(policy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPolicy = async (req, res) => {
    try {
        const policy = await PolicyService.createPolicy(req.body.policyName, req.body.department, req.body.level, req.body.policyDescription, req.body.policyContent, req.body.policyLink);
        res.status(201).json(policy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updatePolicy = async (req, res) => {
    try {
        const policy = await PolicyService.updatePolicy(req.params.id, req.body.policyName, req.body.department, req.body.level, req.body.policyDescription, req.body.policyContent, req.body.policyLink, req.body.policyCreatedDate);
        res.status(200).json(policy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deletePolicy = async (req, res) => {
    try {
        await PolicyService.deletePolicy(req.params.id);
        res.status(200).json({ message: 'Policy Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPoliciesByDepartment = async (req, res) => {
    try {
        const policies = await PolicyService.getPoliciesByDepartment(req.params.department);
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getPolicies,
    getPolicyById,
    createPolicy,
    updatePolicy,
    deletePolicy,
    getPoliciesByDepartment
}