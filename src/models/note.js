const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note_id:{
            type: DataTypes.STRING,
            allowNull: false
        },
        notes:{
            type : DataTypes.STRING,
            allowNull: false,
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
        tableName: 'Note',
    });

    return Note;
};
