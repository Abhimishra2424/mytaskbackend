const db = require("../db");

const Task = db.task;

const createTask = async (req, res) => {
  const {
    taskCode,
    title,
    description,
    status,
    company_id,
    companyName,
    employeeCode,
    employeeName,
    employeeEmail,
  } = req.body;
  const task = await Task.create({
    taskCode,
    title,
    description,
    status,
    company_id,
    companyName,
    employeeCode,
    employeeName,
    employeeEmail,
  });
  res.status(200).json(task);
};

module.exports = {
  createTask,
};
