const db = require("../db");
const { Op } = require('sequelize');

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

const getAllTaskByCompanyId = async (req, res) => {
  const { company_id } = req.company;
  const tasks = await Task.findAll({
    where: {
      company_id,
    },
  });
  res.status(200).json(tasks);
}

const getAllTaskByEmployeeCode = async (req, res) => {
  const { employeeCode } = req.body;
  const tasks = await Task.findAll({
    where: {
      employeeCode,
    },
  });
  res.status(200).json(tasks);
}


const getTaskSearchParam = async (req, res) => {
  const { searchParam } = req.body;
  const tasks = await Task.findAll({
    where: {
      [Op.or]: [
        { taskCode: { [Op.like]: `%${searchParam}%` } },
        { title: { [Op.like]: `%${searchParam}%` } },
        { description: { [Op.like]: `%${searchParam}%` } },
        { status: { [Op.like]: `%${searchParam}%` } },
        { employeeName: { [Op.like]: `%${searchParam}%` } },
        { employeeEmail: { [Op.like]: `%${searchParam}%` } },
      ],
    },
  });
  res.status(200).json(tasks);
}

module.exports = {
  createTask,
  getAllTaskByCompanyId,
  getAllTaskByEmployeeCode,
  getTaskSearchParam
};
