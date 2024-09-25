const MCQController = require('../controller/mcq.ctrl');

const MCQRouter = require('express').Router();

MCQRouter.get('/', MCQController.getMCQ);
MCQRouter.get('/:id', MCQController.getMCQById);
MCQRouter.post('/', MCQController.createMCQ);
MCQRouter.put('/:id', MCQController.updateMCQ);
MCQRouter.delete('/:id', MCQController.deleteMCQ);


module.exports = MCQRouter;

