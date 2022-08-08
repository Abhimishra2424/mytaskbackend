module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('Employee', {
        employee_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        employeeEmail: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        employeePassword: Sequelize.STRING,
        employeeRole : Sequelize.STRING,
        company_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: false,
        }
        
    }, {
        tableName: 'Employee',
    });

    return Employee;
};
