const { Sequelize, DataTypes } = require('sequelize');

// in my laptop password is 'root'
// in desktop password is 'postgres'
const sequelize = new Sequelize("task", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
  },
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.company = require("./models/company")(sequelize, Sequelize);
db.employee = require("./models/employee")(sequelize, Sequelize);
db.task = require("./models/task")(sequelize, Sequelize);


db.employee.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.employee, { foreignKey: "company_id" });


db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = db;