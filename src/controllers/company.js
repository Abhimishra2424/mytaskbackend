'use strict';

const db = require('../db');
const Company = db.company;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const createCompany = async (req, res) => {

    const { companyName, companyEmail, companyPassword, companyRole } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });

        if (company && company.companyEmail === companyEmail) {
            return res.status(400).json({ msg: 'Company already exists' });
        }

        company = new Company({
            companyName,
            companyEmail,
            companyRole,
            companyPassword
        });

        const salt = await bcrypt.genSalt(10);

        company.companyPassword = await bcrypt.hash(companyPassword, salt);

        await company.save();


        return res.json({ msg: 'Company registered', company });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


const loginCompany = async (req, res) => {


    var { companyEmail, companyPassword } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });
        console.log("company",company.dataValues.company)

        // let matchCompany =  company.filter(c => c.companyEmail === companyEmail);

        // console.log(matchCompany);
        // console.log("matchCompany.companyPassword", matchCompany.companyPassword)

        if (!company) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

    
        var password =  companyPassword.toString()
        const isMatch = await bcrypt.compare(password, company.dataValues.companyPassword);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            company: {
                company_id:company.dataValues.company_id,
                companyName:company.dataValues.companyName,
                companyEmail:company.dataValues.companyEmail,
            }
        };

        var token = jwt.sign({ payload },  process.env.JWT_SECRET, {
            expiresIn:  process.env.JWT_LIFETIME
        });

        var companydata = {
            company_id: company.dataValues.company_id,
            companyName: company.dataValues.companyName,
            companyEmail: company.dataValues.companyEmail,
            companyRole: company.dataValues.companyRole
        }

        return res.json({
            token: token,
            company: companydata
        });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllCompanies = async (req, res) => {

    try {
        let companies = await Company.findAll({
            attributes: ['company_id', 'companyName', 'companyEmail']
        });

        return res.json({ companies });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


module.exports = {
    createCompany,
    loginCompany,
    getAllCompanies,
}