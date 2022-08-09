'use strict';

const db = require('../db');

const Employee = db.employee;



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

        // const salt = await bcrypt.genSalt(10);

        // employee.employeePassword = await bcrypt.hash(employeePassword, salt);

        await employee.save();

        return res.json({ msg: 'Employee registered', employee });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllEmployeeByCompanyId = async (req, res) => {
    
        const { company_id } = req.company;
    
        try {
            let employees = await Employee.findAll({
                where: {
                    company_id
                },
                attributes: ['employee_id', 'employeeName', 'employeeCode', 'employeeEmail', 'employeePassword', 'employeeRole', 'company_id', 'companyName' ,]
            });

            return res.json({ employees });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
}

module.exports = {
    createEmployee,
    getAllEmployeeByCompanyId
}