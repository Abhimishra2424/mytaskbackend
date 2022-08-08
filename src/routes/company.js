'use strict';

var express = require('express');
var router = express.Router();

const companyController = require('../controllers/company');

router.post('/company/register', companyController.createCompany);
router.post("/company/login", companyController.loginCompany);
router.get("/company/getallcompanies", companyController.getAllCompanies);

module.exports = router;