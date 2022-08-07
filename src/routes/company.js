'use strict';

var express = require('express');
var router = express.Router();

const companyController = require('../controllers/company');

router.post('/company', companyController.createCompany);

module.exports = router;