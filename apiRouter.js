//apiRouter.js

const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');


// Get company with its employees


apiRouter.param('companyId', async (req, res, next, companyId) => {
    try {
        const employees = await db.companyEmployees(companyId);
        req.employees = employees;
        next(); // go to apiRouter.get('/company/:companyId')
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});



apiRouter.get('/company/:companyId', (req, res, next) => {
    res.status(200).json({ employees: req.employees });
});

// Get an employee s company

apiRouter.param('employeeId', async (req, res, next, employeeId) => {
    try {
        const employeeCompany = await db.employeeCompany(employeeId);
        req.employeeCompany = employeeCompany;
        next(); // go to apiRouter.get('/employee/:employeeId')
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});




apiRouter.get('/employee/:employeeId', (req, res, next) => {
    res.status(200).json({ employeeCompany: req.employeeCompany });
});


module.exports = apiRouter;