const {
  UserLoginHandler,
  getAllScheduleHandler,
  getAllComputerHandler,
  getStatusByIdHandler,
  addBorrowHandler,
  getYourScheduleByIdHandler,
  AddYourScheduleByIdHandler,
  DeleteYourScheduleHandler,
  getAllGroupHandler,
  UpdateStatusGroupHandler,
  getNotificationByIdHandler,
  updateReadNotificationHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/login',
    handler: UserLoginHandler,
  },
  {
    method: 'POST',
    path: '/schedule',
    handler: getAllScheduleHandler,
  },
  {
    method: 'POST',
    path: '/computer',
    handler: getAllComputerHandler,
  },
  {
    method: 'GET',
    path: '/status/{id}',
    handler: getStatusByIdHandler,
  },
  {
    method: 'POST',
    path: '/borrow',
    handler: addBorrowHandler,
  },
  {
    method: 'POST',
    path: '/user/schedule/{id}',
    handler: getYourScheduleByIdHandler,
  },
  {
    method: 'POST',
    path: '/user/schedule',
    handler: AddYourScheduleByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/user/schedule/{id}',
    handler: DeleteYourScheduleHandler,
  },
  {
    method: 'GET',
    path: '/chat/group',
    handler: getAllGroupHandler,
  },
  {
    method: 'PUT',
    path: '/chat/group',
    handler: UpdateStatusGroupHandler,
  },
  {
    method: 'GET',
    path: '/notification/{id}',
    handler: getNotificationByIdHandler,
  },
  {
    method: 'POST',
    path: '/notification/read/{id}',
    handler: updateReadNotificationHandler,
  },
];

module.exports = routes;
