'use strict';

var express = require('express');
var router = express.Router();

const taskController = require('../controllers/task');


router.post("/task/createTask", taskController.createTask);
router.post('/task/getAllTaskByCompanyId', taskController.getAllTaskByCompanyId);
router.post('/task/getAllTaskByEmployeeCode', taskController.getAllTaskByEmployeeCode);

module.exports = router;