const PolicyController = require('../controller/policy.ctrl');

const PolicyRouter = require('express').Router();

PolicyRouter.get('/', PolicyController.getPolicies);
PolicyRouter.get('/:id', PolicyController.getPolicyById);
PolicyRouter.post('/', PolicyController.createPolicy);
PolicyRouter.put('/:id', PolicyController.updatePolicy);
PolicyRouter.delete('/:id', PolicyController.deletePolicy);
PolicyRouter.get('/department/:department', PolicyController.getPoliciesByDepartment);


module.exports = PolicyRouter;

