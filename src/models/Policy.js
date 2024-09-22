const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['novice', 'intermediate', 'expert']
    },
    policyContent : {
        type: String,
        required: true
    },
    policyLink: {
        type: String,
        required: true
    },
    policyCreatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;