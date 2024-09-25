const PolicyService = require('../services/policy.service');
const MCQService = require('../services/mcq.service');

const getMCQ = async (req, res) => {
    try {
        const mcqs = await MCQService.getMCQ();
        res.status(200).json(mcqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getMCQById = async (req, res) => {
    try {
        const mcq = await MCQService.getMCQById(req.params.id);
        res.status(200).json(mcq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createMCQ = async (req, res) => {
    try {
        const policyId = req.body.policy;
        const policy = await PolicyService.getPolicyById(policyId);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }
        const policyLevel = policy.level;
        const policyDepartment = policy.department;
        const mcq = await MCQService.createMCQ(req.body.mcq, req.body.answers, req.body.correctAnswer, policyId, policyLevel, policyDepartment);
        res.status(201).json(mcq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMCQ = async (req, res) => {
    try {
        const policyId = req.body.policy;
        const policy = await PolicyService.getPolicyById(policyId);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        const policyLevel = policy.level;
        const policyDepartment = policy.department;

        const mcq = await MCQService.updateMCQ(req.params.id, req.body.mcq, req.body.answers, req.body.correctAnswer, policyId, policyLevel, policyDepartment);
        res.status(200).json(mcq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteMCQ = async (req, res) => {
    try {
        await MCQService.deleteMCQ(req.params.id);
        res.status(200).json({ message: 'MCQ Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getMCQ,
    getMCQById,
    createMCQ,
    updateMCQ,
    deleteMCQ
}