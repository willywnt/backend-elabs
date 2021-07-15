const { nanoid } = require('nanoid');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const moment = require('moment');
const getAllUsers = require('./models/User');
const getAllSchedule = require('./models/Schedule');
const getAllComputer = require('./models/Computer');
const getStatusById = require('./models/GetStatusById');
const addBorrow = require('./models/AddBorrow');
const updateCompSelected = require('./models/UpdateComp');
const getYourScheduleById = require('./models/GetYourSchedule');
const addYourScheduleById = require('./models/AddYourSchedule');
const deleteYourScheduleById = require('./models/DeleteYourSchedule');
const getAllGroup = require('./models/GetAllGroup');
const updateStatusGroup = require('./models/UpdateStatusGroup');
const getNotificationById = require('./models/GetNotificationById');
const updateReadNotification = require('./models/UpdateReadNotification');

const userLoginHandler = async (request, h) => {
  const { username, password } = request.payload;

  if (username === '' || password === '') {
    const response = h.response({
      status: 'FAILED',
      message: 'Empty credentials supplied',
    });
    response.code(400);
    return response;
  }
  const User = await getAllUsers();
  const foundUser = _.filter(User, (item) => item.username.toString() === username.toString())[0];

  if (foundUser) {
    const hash = foundUser.password;
    const match = await bcrypt.compare(password, hash);
    if (match) {
      const response = h.response({
        status: 'SUCCESS',
        message: 'Signin successful',
        data: foundUser,
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'FAILED',
      message: 'Invalid password entered!',
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'FAILED',
    message: 'Invalid credentials entered!',
  });
  response.code(400);
  return response;
};

const getAllScheduleHandler = async (request, h) => {
  const { jadwal, hari } = request.payload;

  const day = new Date();
  const weekday = new Array(7);
  weekday[0] = 'Minggu';
  weekday[1] = 'Senin';
  weekday[2] = 'Selasa';
  weekday[3] = 'Rabu';
  weekday[4] = 'Kamis';
  weekday[5] = 'Jumat';
  weekday[6] = 'Sabtu';
  const currentDay = weekday[day.getDay()];

  const schedule = await getAllSchedule(jadwal, hari || currentDay);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get schedule succesful',
    data: schedule,
  });
  response.code(200);
  return response;
};

const getAllComputerHandler = async (request, h) => {
  const { komputer, hari } = request.payload;

  const day = new Date();
  const weekday = new Array(7);
  weekday[0] = 'Minggu';
  weekday[1] = 'Senin';
  weekday[2] = 'Selasa';
  weekday[3] = 'Rabu';
  weekday[4] = 'Kamis';
  weekday[5] = 'Jumat';
  weekday[6] = 'Sabtu';
  const currentDay = weekday[day.getDay()];

  const comp = await getAllComputer(komputer, hari || currentDay);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get data computer succesful',
    data: comp,
  });
  response.code(200);
  return response;
};
const getStatusByIdHandler = async (request, h) => {
  const { id } = request.params;

  const status = await getStatusById(id);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get data status succesful',
    data: status,
  });
  response.code(200);
  return response;
};

const getYourScheduleByIdHandler = async (request, h) => {
  const { id } = request.params;
  const { day } = request.payload;

  const schedule = await getYourScheduleById(id, day);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get data your schedule succesful',
    data: schedule,
  });
  response.code(200);
  return response;
};

const addYourScheduleByIdHandler = async (request, h) => {
  const {
    id, day, course, room, time, lecturer,
  } = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const schedule = await addYourScheduleById(
    day, course, room, time, lecturer, id, createdAt, updatedAt,
  );
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get data your schedule succesful',
    data: schedule,
  });
  response.code(200);
  return response;
};

const deleteYourScheduleHandler = async (request, h) => {
  const { id } = request.params;

  const deleted = await deleteYourScheduleById(id);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Schedule has been deleted',
    data: deleted,
  });
  response.code(200);
  return response;
};

const addBorrowHandler = async (request, h) => {
  const {
    ruangan, compId, jam, sesi, keperluan, userId, id, komputer,
  } = request.payload;
  const createdAt = moment().utcOffset(420).format('YYYY-MM-DD HH:mm');
  const updatedAt = createdAt;

  const today = moment().utcOffset(420).format('ll');

  const day = new Date();
  const weekday = new Array(7);
  weekday[0] = 'Minggu';
  weekday[1] = 'Senin';
  weekday[2] = 'Selasa';
  weekday[3] = 'Rabu';
  weekday[4] = 'Kamis';
  weekday[5] = 'Jumat';
  weekday[6] = 'Sabtu';
  const currentDay = weekday[day.getDay()];

  if (ruangan === '' || compId === '' || jam === '' || sesi === '' || keperluan === '' || userId === '' || id === '') {
    const response = h.response({
      status: 'FAILED',
      message: 'Data do not empty!',
    });
    response.code(400);
    return response;
  }
  const inserted = await addBorrow(
    ruangan, compId, today, currentDay, jam, sesi,
    keperluan, '1', userId, createdAt, updatedAt,
  );
  const updated = await updateCompSelected(komputer, sesi, id);

  if (inserted && updated) {
    const response = h.response({
      status: 'success',
      message: 'List has been added',
      data: { inserted, updated },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllGroupHandler = async (request, h) => {
  const group = await getAllGroup();
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get all group succesful',
    data: group,
  });
  response.code(200);
  return response;
};

const UpdateStatusGroupHandler = async (request, h) => {
  const { lastUser, lastText, group } = request.payload;

  const today = moment().utcOffset(420).format('YYYY-MM-DD HH:mm');

  const lastUpdate = await updateStatusGroup(lastUser, lastText, today, group);
  const response = h.response({
    status: 'SUCCESS',
    message: 'update status group succesful',
    data: lastUpdate,
  });
  response.code(201);
  return response;
};

const getNotificationByIdHandler = async (request, h) => {
  const { id } = request.params;

  const notif = await getNotificationById(id);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Get data notification succesful',
    data: notif,
  });
  response.code(200);
  return response;
};

const updateReadNotificationHandler = async (request, h) => {
  const { id } = request.params;

  const notif = await updateReadNotification(id);
  const response = h.response({
    status: 'SUCCESS',
    message: 'Update data notification read succesful',
    data: notif,
  });
  response.code(200);
  return response;
};

module.exports = {
  userLoginHandler,
  getAllScheduleHandler,
  getAllComputerHandler,
  getStatusByIdHandler,
  addBorrowHandler,
  getYourScheduleByIdHandler,
  addYourScheduleByIdHandler,
  deleteYourScheduleHandler,
  getAllGroupHandler,
  UpdateStatusGroupHandler,
  getNotificationByIdHandler,
  updateReadNotificationHandler,
};
