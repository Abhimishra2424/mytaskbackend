'use strict';

var express = require('express');
var router = express.Router();

const taskController = require('../controllers/task');


router.post("/task/createTask", taskController.createTask);

module.exports = router;