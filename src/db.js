const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  "ssl": true,
  "dialectOptions": {
    "ssl": {
      "require": true
    }
  }
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
db.taskHistory = require("./models/taskHistory")(sequelize, Sequelize);


db.employee.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.employee, { foreignKey: "company_id" });


db.sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = db;