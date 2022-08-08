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


db.sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = db;