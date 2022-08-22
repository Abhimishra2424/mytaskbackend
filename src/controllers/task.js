const db = require("../db");
const { Op } = require("sequelize");
const moment = require("moment");

const Task = db.task;
const TaskHistory = db.taskHistory;

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
  const { company_id } = req.company ? req.company : req.employee;
  const tasks = await Task.findAll({
    where: {
      company_id,
    },
  });
  res.status(200).json(tasks);
};

const getAllTaskByEmployeeCode = async (req, res) => {
  const { employeeCode } = req.employee ;
  if (!employeeCode) {
    return res.status(400).json({ msg: "You Are Admin Not A Employee" });
  } else {
    const tasks = await Task.findAll({
      where: {
        employeeCode,
      },
    });
    res.status(200).json(tasks);
  }
};

const getTaskSearchParam = async (req, res) => {
  const { searchParam } = req.body;
  const { company_id } = req.company ? req.company : req.employee;
  const whereCondition = [];

  if (searchParam) {
    whereCondition.push({
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${searchParam}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${searchParam}%`,
          },
        },
        {
          taskCode: {
            [Op.like]: `%${searchParam}%`,
          },
        },
        {
          status: {
            [Op.like]: `%${searchParam}%`,
          },
        },
        {
          employeeName: {
            [Op.like]: `%${searchParam}%`,
          },
        },
        {
          employeeEmail: {
            [Op.like]: `%${searchParam}%`,
          },
        },
      ],
    });
  }
  if (company_id) {
    whereCondition.push({
      company_id,
    });
  }

  const tasks = await Task.findAll({
    where: {
      [Op.and]: whereCondition,
    },
  });
  res.status(200).json(tasks);
};

const updateTask = async (req, res) => {
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
  const whereCondition = [];
  if (taskCode) {
    whereCondition.push({
      taskCode,
    });
  }
  if (company_id) {
    whereCondition.push({
      company_id,
    });
  }
  const task = await Task.update(
    {
      taskCode,
      title,
      description,
      status,
      company_id,
      companyName,
      employeeCode,
      employeeName,
      employeeEmail,
    },
    {
      where: {
        [Op.and]: whereCondition,
      },
      // order: [
      //   ['updatedAt', 'DESC'],
      // ],
    }
  );

  const taskHistory = await TaskHistory.create({
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

const getTaskHistoryByCompanyId = async (req, res) => {
  const taskCode = req.params.id


  const tasks = await TaskHistory.findAll({
    where: {
      taskCode,
    },
    attributes: [
      "taskCode",
      "title",
      "description",
      "status",
      "company_id",
      "companyName",
      "employeeCode",
      "employeeName",
      "employeeEmail",
      "updatedAt",
    ],
    order: [["updatedAt", "DESC"]],
  });

  let formattedTasks = [];
  tasks.forEach((task) => {
    formattedTasks.push({
      taskCode: task.taskCode,
      title: task.title,
      description: task.description,
      status: task.status,
      company_id: task.company_id,
      companyName: task.companyName,
      employeeCode: task.employeeCode,
      employeeName: task.employeeName,
      employeeEmail: task.employeeEmail,
      updatedAt: moment(task.updatedAt).format("DD-MM-YYYY hh:mm:ss"),
    });
  });

  res.status(200).json(formattedTasks);
};

module.exports = {
  createTask,
  getAllTaskByCompanyId,
  getAllTaskByEmployeeCode,
  getTaskSearchParam,
  updateTask,
  getTaskHistoryByCompanyId,
};
