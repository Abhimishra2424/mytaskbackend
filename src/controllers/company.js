'use strict';

const db = require('../db');
const Company = db.company;

const createCompany = async (req, res) => {

    const { companyName, companyEmail, companyPassword } = req.body;

    try {

        if (!companyName || !companyEmail || !companyPassword) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check for existing company
        const company = await Company.findOne({ where: { companyEmail } });
        if (company) return res.status(400).json({ message: 'Company already exists' });

        const newCompany = await Company.create({
            companyName,
            companyEmail,
            companyPassword,
        })

        return res.status(201).json({
            message: 'Company created successfully',
            data: newCompany
        });


    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createCompany
}