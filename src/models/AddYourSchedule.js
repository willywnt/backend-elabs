const pool = require('../connection');

const AddYourScheduleById = (
  day, course, room, time, lecturer, userId, createdAt, updatedAt,
) => new Promise((resolve, reject) => {
  pool.query(`INSERT INTO your_schedule (day, course, room, time, lecturer, user_id, created_at, updated_at) VALUES ('${day}', '${course}', '${room}', '${time}', '${lecturer}', '${userId}', '${createdAt}', '${updatedAt}')`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = AddYourScheduleById;
