'use strict';

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
require("dotenv").config();

const Employee = db.employee;
const Note = db.note;



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

    const { company_id } = req.company ? req.company : req.employee;
     if(req.employee){
         return res.status(400).json({ msg: 'Your Are Not Admin' });
     }
    try {
        let employees = await Employee.findAll({
            where: {
                company_id
            },
            attributes: ['employee_id', 'employeeName', 'employeeCode', 'employeeEmail', 'employeePassword', 'employeeRole', 'company_id', 'companyName',]
        });

        return res.json({ employees });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const employeeLogin = async (req, res) => {

    const { employeeEmail, employeePassword } = req.body;

    try {
        let employee = await Employee.findAll({
            where: {
                employeeEmail
            }
        });

        let matchEmployee = employee.filter(c => c.employeeEmail === employeeEmail);

        if (!matchEmployee) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (employeePassword !== matchEmployee[0].employeePassword) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            employee: {
                employee_id: matchEmployee[0].employee_id,
                employeeName: matchEmployee[0].employeeName,
                employeeCode: matchEmployee[0].employeeCode,
                employeeEmail: matchEmployee[0].employeeEmail,
                employeeRole: matchEmployee[0].employeeRole,
                company_id: matchEmployee[0].company_id,
                companyName: matchEmployee[0].companyName,
            }
        };

        var token = jwt.sign({ payload }, "abhsihekmishraforreactjsdeveloper", {
            expiresIn:  "1d"
        });

        return res.json({
            token: token,
            employee: payload.employee
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const editEmployee = async (req, res) => {
    
        const { employee_id, companyName, employeeName, employeeCode, employeeEmail, employeePassword, employeeRole } = req.body.employee;
        const { company_id  } = req.company ? req.company : req.employee;
         
        try {
        const whereCondition = []
        if (employee_id) {
            whereCondition.push({ employee_id })
        }
        if (company_id) {
            whereCondition.push({ company_id })
        }
        if(companyName){
            whereCondition.push({ companyName })
        }
        if(employeeCode){
            whereCondition.push({ employeeCode })
        }
            let employee = await Employee.findOne({
                where: {
                    [Op.or]: whereCondition
                }
            });
    
            if (!employee) {
                return res.status(400).json({ msg: 'Employee not found' });
            }
            
            const updatedEmployee = await Employee.update({
                employee_id,
                company_id,
                companyName,
                employeeName,
                employeeCode,
                employeeEmail,
                employeeRole,
                employeePassword
            }, {
                where: {
                       employee_id
                    }
            })

           if(updatedEmployee){
              var allUpdatedEmployee = await Employee.findAll({
                where: {
                    company_id
                }
              })
           }
    
            return res.json( allUpdatedEmployee );
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
}

const deleteEmployee = async (req, res) => {
    const { employee_id } = req.body;
    // const { company_id } = req.company ? req.company : req.employee;
    try {
        const employee = await Employee.findOne({
            where: {
                employee_id,
            }
        });

        if (!employee) {
            return res.status(400).json({ msg: 'Employee not found' });
        }

        await Employee.destroy({
            where: {
                employee_id,
            }
        });

        return res.json({ msg: 'Employee deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const employeeNoteCreate = async (req , res) =>{
    const { company_id ,companyName , employeeCode ,  employeeName,  employeeEmail , notes , note_id } = req.body;
    
    try {
        let note = await Note.findAll({
            where : {
                note_id
            }
        });

        if(note.length > 0){
            return res.status(400).json({ msg: 'Note already exists' });
        }


        note = new Note({
            company_id ,companyName ,  employeeCode,  employeeName,  employeeEmail , notes , note_id
        });

        await note.save();

        return res.json({ msg: 'Note Created', note });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllNotesByEmployeeIdandCompanyId = async (req,res) =>{
    const {company_id , employeeCode} = req.employee ? req.employee :  req.body;

    try {
       if(!company_id){
        return res.status(400).send({msg:"plz provide company_id"})
       }
       if(!employeeCode){
        return res.status(400).send({msg:"plz provide employeeCode"})
       }
        var whereCondition = []

        if(company_id){
            whereCondition.push({company_id})
        }
        if(employeeCode){
            whereCondition.push({employeeCode})
        }

        let notes = await Note.findAll({
            where: {
                [Op.and]: whereCondition,
              },
        });

        return res.json(notes);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    createEmployee,
    getAllEmployeeByCompanyId,
    employeeLogin,
    editEmployee,
    deleteEmployee,
    employeeNoteCreate,
    getAllNotesByEmployeeIdandCompanyId

}