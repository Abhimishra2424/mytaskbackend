'use strict';

var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/employee');
const auth = require('../helpers/auth');

router.post("/employee/createemployee", employeeController.createEmployee);
router.post("/employee/getAllEmployeeByCompanyId", auth , employeeController.getAllEmployeeByCompanyId);
router.post('/employee/employeeLogin', employeeController.employeeLogin);
router.post('/employee/editEmployee', auth , employeeController.editEmployee);

module.exports = router;