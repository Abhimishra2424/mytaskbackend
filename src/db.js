const { Sequelize } = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize("testdb_556z", "admin", "Z8IKhMYBOJJYN7Drg8cpv7TER54EZTYQ", {
  host: "dpg-chr258hmbg5e1f7101u0-a.oregon-postgres.render.com",
  port:5432,
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