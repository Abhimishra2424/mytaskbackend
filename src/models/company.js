const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Company = sequelize.define('company', {
        company_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },
        companyEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        companyPassword: DataTypes.STRING,
        companyRole : DataTypes.STRING,

    }, {
        tableName: 'company',
    });

    return Company;
};

