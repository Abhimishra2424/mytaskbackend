'use strict';

const db = require('../db');
const Company = db.company;
const Employee = db.employee;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



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


    const { companyEmail, companyPassword } = req.body;

    try {
        let company = await Company.findAll({ companyEmail });

        let matchCompany =  company.filter(c => c.companyEmail === companyEmail);

        console.log(matchCompany);
        console.log("matchCompany.companyPassword",matchCompany[0].companyPassword)

        if (!matchCompany) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(companyPassword, matchCompany[0].companyPassword);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            company: {
                company_id: matchCompany[0].company_id,
                companyName: matchCompany[0].companyName,
                companyEmail: matchCompany[0].companyEmail,
            }
        };

        var token = jwt.sign({ payload }, "abhishekmishra", {
            expiresIn: 86400 // 24 hours
        });

        var companydata = {
            company_id: matchCompany[0].company_id,
            companyName: matchCompany[0].companyName,
            companyEmail: matchCompany[0].companyEmail,
            companyRole: matchCompany[0].companyRole
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

const createEmployee = async (req, res) => {

    const { company_id, companyName, employeeName, employeeCode, employeeEmail, employeePassword, employeeRole } = req.body;

    try {
        let employee = await Employee.findAll({
            where: {
                employeeEmail
            }
        });

        if (employee.employeeEmail === employeeEmail) {
            return res.status(400).json({ msg: 'Employee already exists' });
        }

        employee = new Employee({
            company_id,
            companyName,
            employeeName,
            employeeCode,
            employeeEmail,
            employeeRole,
            employeePassword
        });

        const salt = await bcrypt.genSalt(10);

        employee.employeePassword = await bcrypt.hash(employeePassword, salt);

        await employee.save();

        return res.json({ msg: 'Employee registered', employee });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllEmployeeByCompanyId = async (req, res) => {
    
        const { company_id } = req.body;
    
        try {
            let employees = await Employee.findAll({
                where: {
                    company_id
                },
                attributes: ['employee_id', 'employeeName', 'employeeEmail', 'employeeRole', 'company_id', 'companyName' ,]
            });

            return res.json({ employees });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
}

module.exports = {
    createCompany,
    loginCompany,
    getAllCompanies,
    createEmployee,
    getAllEmployeeByCompanyId
}