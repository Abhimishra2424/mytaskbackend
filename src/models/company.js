module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('company', {
        company_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        companyEmail: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        companyPassword: Sequelize.STRING,
        companyRole : Sequelize.STRING,

    }, {
        tableName: 'company',
    });

    return Company;
};

