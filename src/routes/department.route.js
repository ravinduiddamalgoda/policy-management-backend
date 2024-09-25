const DepartmentRouter = require('express').Router();

DepartmentRouter.get('/', (req, res) => {
    res.status(200).json(
        ['UI-UX Design Department', 'Brand Identity Department', 'Product Engineering Department', 'Web Development Department']
    );
});

module.exports = DepartmentRouter;