const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Employee = sequelize.define('Employee', {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeCode:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        employeePassword: {
            type: DataTypes.STRING,
        },
        employeeRole : {
            type: DataTypes.STRING,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        tableName: 'Employee',
    });

    return Employee;
};
