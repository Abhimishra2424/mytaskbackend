const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taskCode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_id: {
            type: DataTypes.INTEGER,
        },
        companyName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeCode:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeEmail:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'Task',
    });

    return Task;
};
