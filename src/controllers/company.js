'use strict';

const db = require('../db');
const Company = db.company;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createCompany = async (req, res) => {

    const { companyName, companyEmail, companyPassword } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });

        if (company) {
            return res.status(400).json({ msg: 'Company already exists' });
        }

        company = new Company({
            companyName,
            companyEmail,
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


    const { companyEmail, companyPassword } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });

        if (!company) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(companyPassword, company.companyPassword);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            company: {
                company_id: company.company_id,
                companyName: company.companyName,
                companyEmail: company.companyEmail
            }
        };

        var token = jwt.sign({ payload }, "abhishekmishra", {
            expiresIn: 86400 // 24 hours
        });

        var companydata = {
            company_id: company.company_id,
            companyName: company.companyName,
            companyEmail: company.companyEmail,
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


module.exports = {
    createCompany,
    loginCompany
}