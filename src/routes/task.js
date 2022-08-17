'use strict';

var express = require('express');
var router = express.Router();

const taskController = require('../controllers/task');
const auth = require('../helpers/auth');
const employeeAuth = require('../helpers/employeeAuth');


router.post("/task/createTask", taskController.createTask);
router.post('/task/getAllTaskByCompanyId', auth, taskController.getAllTaskByCompanyId);
router.post('/task/getAllTaskByEmployeeCode', employeeAuth, taskController.getAllTaskByEmployeeCode);
router.post('/task/getTaskSearchParam', auth, taskController.getTaskSearchParam);
router.post('/task/getTaskHistoryCompanyId/:id', taskController.getTaskHistoryByCompanyId);
router.post('/task/updateTask', taskController.updateTask);

module.exports = router;