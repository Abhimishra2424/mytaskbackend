'use strict';

var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/employee');

router.post("/employee/createemployee", employeeController.createEmployee);
router.post("/employee/getAllEmployeeByCompanyId", employeeController.getAllEmployeeByCompanyId);

module.exports = router;