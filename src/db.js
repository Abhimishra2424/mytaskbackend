const { Sequelize } = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
db.note = require("./models/note")(sequelize, Sequelize);


db.employee.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.employee, { foreignKey: "company_id" });


db.sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = db;